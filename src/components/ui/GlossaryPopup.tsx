import { useState, useMemo, useEffect } from 'react'
import { glossary } from '../../data'
import type { GlossaryEntry } from '../../types'

const categoryLabels: Record<string, string> = {
  Markedsfoering: 'Markedsføring',
  Okonomi: 'Økonomi',
  Organisasjon: 'Organisasjon',
  Strategi: 'Strategi',
  Logistikk: 'Logistikk',
  Jus: 'Jus og etikk',
  Salg: 'Salg',
  Kundeservice: 'Kundeservice',
  Risikostyring: 'Risikostyring',
  Baerekraft: 'Bærekraft',
}

export default function GlossaryPopup() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedEntry, setSelectedEntry] = useState<GlossaryEntry | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    function handler(e: Event) {
      const term = (e as CustomEvent<{ term: string }>).detail?.term
      if (!term) return
      setOpen(true)
      setSearch('')
      setSelectedCategory(null)
      const entry = glossary.find((g) => g.term === term)
      if (entry) setSelectedEntry(entry)
    }
    window.addEventListener('openGlossary', handler)
    return () => window.removeEventListener('openGlossary', handler)
  }, [])

  const categories = useMemo(
    () => [...new Set(glossary.map((g) => g.category))],
    [],
  )

  const filtered = useMemo(() => {
    let items = glossary
    if (selectedCategory) {
      items = items.filter((g) => g.category === selectedCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (g) =>
          g.term.toLowerCase().includes(q) ||
          g.definition.toLowerCase().includes(q),
      )
    }
    return items
  }, [search, selectedCategory])

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/30 hover:bg-teal-400 transition-all hover:scale-110"
        title="Spør Espen"
      >
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} />

      {/* Panel */}
      <div className="relative w-full max-w-md max-h-[80vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div>
            <h2 className="font-bold text-white text-lg">Ordliste</h2>
            <p className="text-xs text-slate-400">Søk i {glossary.length} begreper</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-slate-400 hover:text-white p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-700/50">
          <input
            type="text"
            placeholder="Søk etter begrep..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setSelectedEntry(null)
            }}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 p-3 overflow-x-auto border-b border-slate-700/50">
          <button
            onClick={() => { setSelectedCategory(null); setSelectedEntry(null) }}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              !selectedCategory
                ? 'bg-teal-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Alle
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setSelectedEntry(null) }}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {categoryLabels[cat] ?? cat}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedEntry ? (
            <div className="p-4 space-y-4">
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                ← Tilbake til listen
              </button>

              <div>
                <h3 className="text-lg font-bold text-white">{selectedEntry.term}</h3>
                <span className="text-xs text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
                  {categoryLabels[selectedEntry.category] ?? selectedEntry.category}
                </span>
                <span className="text-xs text-slate-500 ml-2">{selectedEntry.level}</span>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Definisjon</h4>
                <p className="text-sm text-slate-300">{selectedEntry.definition}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Eksempel</h4>
                <p className="text-sm text-slate-300 italic">{selectedEntry.example}</p>
              </div>

              {selectedEntry.formula && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Formel</h4>
                  <p className="text-sm text-teal-300 font-mono bg-slate-800 rounded-lg p-3">{selectedEntry.formula}</p>
                </div>
              )}

              {selectedEntry.common_mistake && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-amber-400 mb-1">Vanlig feil</h4>
                  <p className="text-sm text-slate-300">{selectedEntry.common_mistake}</p>
                </div>
              )}

              {selectedEntry.espenTips && (
                <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-3 flex gap-2">
                  <span className="text-lg shrink-0">🧑‍💼</span>
                  <div>
                    <h4 className="text-xs font-semibold text-teal-400 mb-1">Espen sier</h4>
                    <p className="text-sm text-slate-300 italic">{selectedEntry.espenTips}</p>
                  </div>
                </div>
              )}

              {selectedEntry.related_terms.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Relaterte begreper</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.related_terms.map((rt) => {
                      const related = glossary.find((g) => g.term === rt)
                      return (
                        <button
                          key={rt}
                          onClick={() => related && setSelectedEntry(related)}
                          className={`text-xs px-2 py-1 rounded-lg ${
                            related
                              ? 'bg-teal-500/10 text-teal-400 hover:bg-teal-500/20'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {rt}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-700/50">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-sm">
                  Ingen begreper funnet for «{search}»
                </div>
              ) : (
                filtered.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className="w-full p-3 text-left hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="font-medium text-white text-sm">{entry.term}</div>
                    <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {entry.definition}
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
