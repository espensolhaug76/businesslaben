import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ref, onValue, set } from 'firebase/database'
import { db } from '../../lib/firebase'
import type { TemaNivaa } from '../../game/data/temaer'
import { normalizeSubjectId } from '../../lib/teacherSubjects'

/**
 * Global klassekontekst for lærerdashboardet (spor D, steg 2).
 *
 * Før denne konteksten leste hver fane `localStorage['teacher-classroom-code']`
 * på egen hånd — som regel bare i en `useState`-initializer, altså én gang ved
 * mount. Et klassebytte i Klasser-fanen nådde derfor bare fanene som tilfeldigvis
 * ble remontert etterpå. Nå eier denne konteksten aktiv klasse, klassekoden,
 * elevenes nivå og «Mine fag»-utvalget, og alle faner leser samme tilstand.
 *
 * localStorage-nøklene beholdes som før, slik at komponenter utenfor
 * dashboardet (spillklient, elevruter) fortsatt finner det de forventer.
 */

export interface TeacherClass {
  code: string
  name: string
  subject: string
  schoolName?: string
  teacherName?: string
}

export function generateClassroomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export function loadClasses(): TeacherClass[] {
  try {
    const saved = JSON.parse(localStorage.getItem('teacher-classes') ?? 'null')
    if (Array.isArray(saved) && saved.length > 0) {
      // Normaliser legacy fag-IDer (fd_vg2 → ok_vg2 osv.)
      return saved.map((c: TeacherClass) => ({ ...c, subject: normalizeSubjectId(c.subject) }))
    }
  } catch { /* */ }
  // Migrate legacy single code
  const legacy = localStorage.getItem('teacher-classroom-code')
  const code = legacy ?? generateClassroomCode()
  if (!legacy) localStorage.setItem('teacher-classroom-code', code)
  const classes: TeacherClass[] = [{ code, name: 'Klasse 1', subject: '' }]
  localStorage.setItem('teacher-classes', JSON.stringify(classes))
  return classes
}

export function saveClasses(classes: TeacherClass[]) {
  localStorage.setItem('teacher-classes', JSON.stringify(classes))
  // Keep legacy key in sync with first class as default — caller bør i tillegg
  // kalle setActiveCode() når en spesifikk klasse skal være aktiv.
  if (classes[0]) localStorage.setItem('teacher-classroom-code', classes[0].code)
}

interface TeacherClassCtx {
  classes: TeacherClass[]
  /** Erstatt klasselista (persisteres). */
  replaceClasses: (classes: TeacherClass[]) => void
  activeCode: string
  activeClass: TeacherClass | null
  setActiveCode: (code: string) => void
  /** Elevenes nivå — RTDB `klasser/{kode}/klasseNivaa`. */
  klasseNivaa: TemaNivaa
  setKlasseNivaa: (n: TemaNivaa) => void
  /** «Mine fag» — IDer fra MINE_FAG_OPTIONS. Tom liste = alle fag. */
  mySubjects: string[]
  toggleMySubject: (id: string) => void
  resetMySubjects: () => void
  /** Sann når læreren ikke hadde noen klasser ved innlasting (velkomst-state). */
  ingenKlasserVedStart: boolean
  /** Sann når klassen har en aktiv live økt (RTDB `sessions/{kode}/active`). */
  liveActive: boolean
}

const Ctx = createContext<TeacherClassCtx | null>(null)

export function TeacherClassProvider({ children }: { children: ReactNode }) {
  // Må leses FØR loadClasses(), som oppretter en «Klasse 1» hvis lista er tom.
  const [ingenKlasserVedStart] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem('teacher-classes')
      if (!raw) return true
      const arr = JSON.parse(raw)
      return !Array.isArray(arr) || arr.length === 0
    } catch { return true }
  })
  const [classes, setClasses] = useState<TeacherClass[]>(() => loadClasses())
  const [activeCode, setActiveCodeState] = useState<string>(() => {
    const saved = localStorage.getItem('teacher-classroom-code') ?? ''
    const list = loadClasses()
    if (saved && list.some(c => c.code === saved)) return saved
    const first = list[0]?.code ?? ''
    if (first) localStorage.setItem('teacher-classroom-code', first)
    return first
  })
  const [klasseNivaa, setKlasseNivaaState] = useState<TemaNivaa>('vg1')
  const [liveActive, setLiveActive] = useState(false)
  const [mySubjects, setMySubjects] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('adventure-teacher-subjects')
      const arr: string[] = saved ? JSON.parse(saved) : []
      return arr.map(normalizeSubjectId).filter(Boolean)
    } catch { return [] }
  })

  const setActiveCode = useCallback((code: string) => {
    localStorage.setItem('teacher-classroom-code', code)
    setActiveCodeState(code)
  }, [])

  const replaceClasses = useCallback((next: TeacherClass[]) => {
    saveClasses(next)
    setClasses(next)
  }, [])

  // Elevenes nivå følger aktiv klasse.
  useEffect(() => {
    if (!activeCode) return
    return onValue(ref(db, `klasser/${activeCode}/klasseNivaa`), snap => {
      setKlasseNivaaState(snap.val() === 'vg2' ? 'vg2' : 'vg1')
    })
  }, [activeCode])

  // Live-økt-status for tittelradens pille (steg 6).
  useEffect(() => {
    if (!activeCode) { setLiveActive(false); return }
    return onValue(ref(db, `sessions/${activeCode}/active`), snap => {
      setLiveActive(snap.val() === true)
    })
  }, [activeCode])

  const setKlasseNivaa = useCallback((n: TemaNivaa) => {
    if (!activeCode) return
    setKlasseNivaaState(n)   // optimistisk; onValue bekrefter
    set(ref(db, `klasser/${activeCode}/klasseNivaa`), n)
  }, [activeCode])

  const toggleMySubject = useCallback((id: string) => {
    setMySubjects(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      localStorage.setItem('adventure-teacher-subjects', JSON.stringify(next))
      return next
    })
  }, [])

  const resetMySubjects = useCallback(() => {
    localStorage.removeItem('adventure-teacher-subjects')
    setMySubjects([])
  }, [])

  const activeClass = useMemo(
    () => classes.find(c => c.code === activeCode) ?? classes[0] ?? null,
    [classes, activeCode],
  )

  const value = useMemo<TeacherClassCtx>(() => ({
    classes, replaceClasses, activeCode, activeClass, setActiveCode,
    klasseNivaa, setKlasseNivaa, mySubjects, toggleMySubject, resetMySubjects,
    ingenKlasserVedStart, liveActive,
  }), [classes, replaceClasses, activeCode, activeClass, setActiveCode,
       klasseNivaa, setKlasseNivaa, mySubjects, toggleMySubject, resetMySubjects,
       ingenKlasserVedStart, liveActive])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useTeacherClass(): TeacherClassCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTeacherClass må brukes inne i <TeacherClassProvider>')
  return ctx
}
