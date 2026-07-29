import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from './firebase'

export interface LiveSyncState {
  isLive: boolean
  isStudentLive: boolean       // true only for students (no ?live-code param)
  liveSlide: number | null     // 0-indexed; null when no live presentation session
  quizActive: boolean
  teacherLiveCode: string | null  // classroom code when teacher opens ?live-code=XXX
}

const EMPTY: LiveSyncState = {
  isLive: false,
  isStudentLive: false,
  liveSlide: null,
  quizActive: false,
  teacherLiveCode: null,
}

export function useLiveSync(): LiveSyncState {
  const urlCode = new URLSearchParams(window.location.search).get('live-code')
  const classCode = urlCode ?? localStorage.getItem('student-classroom-code')
  const isTeacherBigScreen = !!urlCode

  const [state, setState] = useState<LiveSyncState>(EMPTY)

  useEffect(() => {
    if (!classCode) return
    return onValue(ref(db, 'sessions/' + classCode), snap => {
      const val = snap.val()
      if (val?.active && val.mode === 'presentation') {
        const liveSlide = (val.currentSlide ?? 1) - 1
        const quizActive = val.quizActive === true
        const teacherLiveCode = isTeacherBigScreen ? classCode : null

        // Første snapshot ANVENDES også for eleven (spor D, runde 9). Før ble
        // det undertrykt til `liveSlide: null`, så en elev som logget seg på
        // midt i økta ble stående på slide 0 til læreren blad neste gang.
        // Økta er bare «active» mens den faktisk pågår, så det finnes ingen
        // gammel currentSlide å bli kapret av.

        // Only update state when values actually change — prevents render loops
        setState(prev => {
          if (
            prev.isLive &&
            prev.liveSlide === liveSlide &&
            prev.quizActive === quizActive &&
            prev.isStudentLive === !isTeacherBigScreen
          ) return prev
          return { isLive: true, isStudentLive: !isTeacherBigScreen, liveSlide, quizActive, teacherLiveCode }
        })
      } else {
        setState(prev => (prev.isLive ? EMPTY : prev))
      }
    })
  }, [classCode, isTeacherBigScreen])

  return state
}
