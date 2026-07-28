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

/**
 * Leser lærerens klasser. Oppretter ALDRI en klasse på egen hånd — en fersk
 * lærer skal møte velkomst-tomtilstanden og opprette sin første klasse selv.
 * (Tidligere genererte denne en «Klasse 1» med tilfeldig kode ved mount.)
 *
 * Eneste unntak er migrering: har læreren den gamle enkeltnøkkelen
 * `teacher-classroom-code` uten klasseliste, er det en reell klasse som skal
 * bevares.
 */
export function loadClasses(): TeacherClass[] {
  try {
    const saved = JSON.parse(localStorage.getItem('teacher-classes') ?? 'null')
    if (Array.isArray(saved) && saved.length > 0) {
      // Normaliser legacy fag-IDer (fd_vg2 → ok_vg2 osv.)
      return saved.map((c: TeacherClass) => ({ ...c, subject: normalizeSubjectId(c.subject) }))
    }
  } catch { /* */ }
  const legacy = localStorage.getItem('teacher-classroom-code')
  if (!legacy) return []
  const classes: TeacherClass[] = [{ code: legacy, name: 'Klasse 1', subject: '' }]
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
  /** Sann når læreren ikke har noen klasser ennå (velkomst-tomtilstand). */
  ingenKlasser: boolean
  /** Sann når klassen har en aktiv live økt (RTDB `sessions/{kode}/active`). */
  liveActive: boolean
}

const Ctx = createContext<TeacherClassCtx | null>(null)

export function TeacherClassProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<TeacherClass[]>(() => loadClasses())
  const [activeCode, setActiveCodeState] = useState<string>(() => {
    const saved = localStorage.getItem('teacher-classroom-code') ?? ''
    const list = loadClasses()
    if (saved && list.some(c => c.code === saved)) return saved
    const first = list[0]?.code ?? ''
    if (first) localStorage.setItem('teacher-classroom-code', first)
    else localStorage.removeItem('teacher-classroom-code')
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
    ingenKlasser: classes.length === 0, liveActive,
  }), [classes, replaceClasses, activeCode, activeClass, setActiveCode,
       klasseNivaa, setKlasseNivaa, mySubjects, toggleMySubject, resetMySubjects,
       liveActive])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useTeacherClass(): TeacherClassCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTeacherClass må brukes inne i <TeacherClassProvider>')
  return ctx
}
