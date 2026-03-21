export type TeacherSlideType = 'text' | 'bullets' | 'quote' | 'image' | 'question'

export interface TeacherSlide {
  id: string
  type: TeacherSlideType
  // text / bullets / image / question
  title?: string
  body?: string
  // bullets
  bullets?: string[]
  // quote
  quote?: string
  attribution?: string
  // image
  imageUrl?: string
  caption?: string
  createdAt: string
}

export function teacherSlidesKey(presentationRoute: string): string {
  return `adventure-teacher-slides-${presentationRoute.replace(/\//g, '-')}`
}

export function loadTeacherSlides(presentationRoute: string): TeacherSlide[] {
  try {
    return JSON.parse(localStorage.getItem(teacherSlidesKey(presentationRoute)) ?? '[]')
  } catch { return [] }
}

export function saveTeacherSlides(presentationRoute: string, slides: TeacherSlide[]): void {
  localStorage.setItem(teacherSlidesKey(presentationRoute), JSON.stringify(slides))
}

export function hiddenSlidesKey(presentationRoute: string): string {
  return `adventure-teacher-hidden-${presentationRoute.replace(/\//g, '-')}`
}

export function loadHiddenSlides(presentationRoute: string): number[] {
  try {
    return JSON.parse(localStorage.getItem(hiddenSlidesKey(presentationRoute)) ?? '[]')
  } catch { return [] }
}

export function saveHiddenSlides(presentationRoute: string, hidden: number[]): void {
  localStorage.setItem(hiddenSlidesKey(presentationRoute), JSON.stringify(hidden))
}
