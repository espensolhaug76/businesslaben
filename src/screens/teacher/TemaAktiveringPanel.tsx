import { useEffect, useState } from 'react'
import { ref, onValue, set, remove } from 'firebase/database'
import { db } from '../../lib/firebase'
import { TEMAER, type TemaAktivering, type TemaNivaa } from '../../game/data/temaer'
import { type FagAktivering, type FagKode, FAG_KODER, FAG_META, FAG_DEFAULT, normaliserFag } from '../../game/data/fag'

// ─── Tema-aktivering (KODEKART steg 1) ───────────────────────────────────────
// Lærer-UI i «Spillet»-fanen: slå temaer av/på PER KLASSE og velg vg1/vg2.
// Skriver til Firebase RTDB: klasser/{klassekode}/temaAktivering/{temaId}
// = { aktiv, nivaa }. Spillklienten (GameContext) abonnerer på samme node.
export default function TemaAktiveringPanel() {
  // Aktiv klasse settes i Klasser-fanen (localStorage). Leses ved (re)mount.
  const [kode] = useState<string>(() => localStorage.getItem('teacher-classroom-code') ?? '')
  const [aktivering, setAktivering] = useState<Record<string, TemaAktivering>>({})
  // DEL 0 — globalt klassenivå (VG1/VG2), søsternode til temaAktivering.
  const [klasseNivaa, setKlasseNivaa] = useState<TemaNivaa>('vg1')
  // Fikserunde 3 — fagaktivering (fd/m/ks). Default alt på (fritt spill).
  const [fag, setFag] = useState<FagAktivering>({ ...FAG_DEFAULT })

  useEffect(() => {
    if (!kode) return
    return onValue(ref(db, `klasser/${kode}/temaAktivering`), snap => {
      setAktivering((snap.val() as Record<string, TemaAktivering> | null) ?? {})
    })
  }, [kode])

  useEffect(() => {
    if (!kode) return
    return onValue(ref(db, `klasser/${kode}/fagAktivering`), snap => {
      setFag(normaliserFag(snap.val()))
    })
  }, [kode])

  useEffect(() => {
    if (!kode) return
    return onValue(ref(db, `klasser/${kode}/klasseNivaa`), snap => {
      setKlasseNivaa(snap.val() === 'vg2' ? 'vg2' : 'vg1')
    })
  }, [kode])

  function skriv(temaId: string, verdi: TemaAktivering | null) {
    if (!kode) return
    const node = ref(db, `klasser/${kode}/temaAktivering/${temaId}`)
    // Skriv til RTDB; lokal state følger via onValue-abonnementet.
    if (verdi) set(node, verdi); else remove(node)
  }

  function skrivNivaa(n: TemaNivaa) {
    if (!kode) return
    set(ref(db, `klasser/${kode}/klasseNivaa`), n)   // lokal state følger via onValue
  }

  function skrivFag(f: FagKode, verdi: boolean) {
    if (!kode) return
    set(ref(db, `klasser/${kode}/fagAktivering/${f}`), verdi)   // lokal state følger via onValue
  }

  if (!kode) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
        Velg eller opprett en klasse i <b>Klasser</b>-fanen først — tema-aktivering
        lagres per klasse.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-gray-900">Temaer</h3>
        <span className="text-[11px] text-gray-400 font-mono">klasse {kode}</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Slå temaer av/på for denne klassen og velg nivå. Endringen ses live i
        spillet for elever med samme klassekode.
      </p>

      {/* FAG — programfag-brytere (fikserunde 3), ØVERST. Fag som er av er HELT
          skjult for eleven: faner, temaer, innboks-tilbud og «Espen spør» for
          faget forsvinner. Default alt på (fritt spill). */}
      <div className="mb-4">
        <div className="font-medium text-gray-900 text-sm mb-1">Fag</div>
        <div className="text-[11px] text-gray-500 mb-2 leading-snug">
          Slå programfag av/på for klassen. <b>Fag som er av, er helt skjult for
          elevene</b> — faner, temaer, innboks-tilbud og «Espen spør»-spørsmål for
          faget forsvinner.
        </div>
        <div className="space-y-2">
          {FAG_KODER.map(f => (
            <div key={f} className="flex items-center justify-between gap-4 p-2.5 rounded-xl border border-gray-200">
              <div className="font-medium text-gray-900 text-sm min-w-0">
                <span className="inline-block w-8 text-[11px] font-mono text-gray-400">{FAG_META[f].kort}</span>
                {FAG_META[f].navn}
              </div>
              <button
                onClick={() => skrivFag(f, !fag[f])}
                role="switch"
                aria-checked={fag[f]}
                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${fag[f] ? 'bg-teal-500' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${fag[f] ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* DEL 0 — GLOBALT klassenivå: gjelder alt spillinnhold utenfor et aktivt
          tema (f.eks. VG2-ekstrafeltene i innboksen). Innenfor et tema styrer
          temaets eget nivå (over). */}
      <div className="flex items-center justify-between gap-4 p-3 mb-4 rounded-xl border border-teal-200 bg-teal-50/50">
        <div className="min-w-0">
          <div className="font-medium text-gray-900 text-sm">Klassens nivå</div>
          <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">
            Gjelder alt utenom aktiverte temaer. VG2 viser ekstra oppgaver (f.eks.
            skriftlig pristilbud og «betalt omtale skal merkes»).
          </div>
        </div>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
          {(['vg1', 'vg2'] as TemaNivaa[]).map(n => (
            <button
              key={n}
              onClick={() => skrivNivaa(n)}
              className={`px-3 py-1 text-xs font-semibold uppercase transition-colors ${
                klasseNivaa === n ? 'bg-teal-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {TEMAER.map(tema => {
          const gjeldende = aktivering[tema.id]
          const aktiv = !!gjeldende?.aktiv
          const nivaa: TemaNivaa = gjeldende?.nivaa ?? tema.nivaaer[0]
          // Faget temaet hører til må være PÅ for at temaet skal kunne vises/velges.
          const fagPaa = fag[tema.fag]
          return (
            <div key={tema.id} className={`flex items-start justify-between gap-4 p-3 rounded-xl border ${fagPaa ? 'border-gray-200' : 'border-gray-100 bg-gray-50 opacity-60'}`}>
              <div className="min-w-0">
                <div className="font-medium text-gray-900 text-sm">
                  {tema.navn}
                  <span className="ml-2 text-[10px] font-mono text-gray-400">{FAG_META[tema.fag].kort}</span>
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                  {fagPaa ? tema.beskrivelse : `Faget «${FAG_META[tema.fag].navn}» er slått av — temaet er skjult for elevene.`}
                </div>
              </div>
              {fagPaa && (
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Nivå-velger (kun nivåene temaet finnes for) */}
                <div className="flex rounded-lg overflow-hidden border border-gray-200">
                  {tema.nivaaer.map(n => (
                    <button
                      key={n}
                      onClick={() => skriv(tema.id, { aktiv, nivaa: n })}
                      className={`px-2.5 py-1 text-xs font-medium uppercase transition-colors ${
                        nivaa === n ? 'bg-teal-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                {/* Av/på-toggle */}
                <button
                  onClick={() => skriv(tema.id, aktiv ? { aktiv: false, nivaa } : { aktiv: true, nivaa })}
                  role="switch"
                  aria-checked={aktiv}
                  className={`relative w-11 h-6 rounded-full transition-colors ${aktiv ? 'bg-teal-500' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${aktiv ? 'translate-x-5' : ''}`} />
                </button>
              </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
