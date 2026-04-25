import { useState, useEffect, useRef } from 'react'
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
  const classCode = urlCode ?? sessionStorage.getItem('student-classroom-code')
  const isTeacherBigScreen = !!urlCode

  const [state, setState] = useState<LiveSyncState>(EMPTY)
  // For students: skip the first Firebase snapshot so a stale "currentSlide"
  // from a previous session never hijacks a freshly-opened presentation.
  // Teachers (with ?live-code) always use the initial value so they can resume.
  const isFirstSnapshotRef = useRef(true)

  useEffect(() => {
    if (!classCode) return
    isFirstSnapshotRef.current = true
    return onValue(ref(db, 'sessions/' + classCode), snap => {
      const isFirst = isFirstSnapshotRef.current
      isFirstSnapshotRef.current = false

      const val = snap.val()
      if (val?.active && val.mode === 'presentation') {
        const liveSlide = (val.currentSlide ?? 1) - 1
        const quizActive = val.quizActive === true
        const teacherLiveCode = isTeacherBigScreen ? classCode : null

        // Students: suppress the initial snapshot so the presentation always
        // opens at slide 0. Subsequent updates (teacher moves slide) still sync.
        if (!isTeacherBigScreen && isFirst) {
          setState(prev => {
            if (prev.isStudentLive && prev.liveSlide === null) return prev
            return { isLive: true, isStudentLive: true, liveSlide: null, quizActive, teacherLiveCode: null }
          })
          return
        }

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
