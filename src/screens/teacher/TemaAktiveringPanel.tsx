import { useEffect, useState } from 'react'
import { ref, onValue, set, remove } from 'firebase/database'
import { db } from '../../lib/firebase'
import { TEMAER, type TemaAktivering, type TemaNivaa } from '../../game/data/temaer'
import { type FagAktivering, type FagKode, FAG_KODER, FAG_META, FAG_DEFAULT, normaliserFag } from '../../game/data/fag'
import { type EspenSporStyring, ESPEN_STYRING_DEFAULT, normaliserEspenStyring } from '../../game/data/espenSporsmal'
import { useTeacherClass } from './TeacherClassContext'

// ─── Tema-aktivering (KODEKART steg 1) ───────────────────────────────────────
// Lærer-UI i «Spillstyring»-fanen: slå fag og temaer av/på PER KLASSE.
// Skriver til Firebase RTDB: klasser/{klassekode}/temaAktivering/{temaId}
// = { aktiv, nivaa, folgerKlassen? }. Spillklienten (GameContext) abonnerer på
// samme node. Klassekoden og «Elevenes nivå» kommer fra den globale klasselinja.
export default function TemaAktiveringPanel() {
  const { activeCode: kode, klasseNivaa } = useTeacherClass()
  const [aktivering, setAktivering] = useState<Record<string, TemaAktivering>>({})
  // Fikserunde 3 — fagaktivering (fd/m/ks). Default alt på (fritt spill).
  const [fag, setFag] = useState<FagAktivering>({ ...FAG_DEFAULT })
  // Fikserunde 3 — «Espen spør»-styring. Default AV; læreren skrur den på.
  const [espen, setEspen] = useState<EspenSporStyring>({ ...ESPEN_STYRING_DEFAULT, fag: { ...ESPEN_STYRING_DEFAULT.fag } })

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
    return onValue(ref(db, `klasser/${kode}/espenSpor`), snap => {
      setEspen(normaliserEspenStyring(snap.val()))
    })
  }, [kode])

  /** Nivået et «følger klassen»-tema faktisk får: klassens nivå hvis temaet
   *  finnes for det, ellers temaets eneste/første nivå. */
  function klassensNivaaFor(nivaaer: TemaNivaa[]): TemaNivaa {
    return nivaaer.includes(klasseNivaa) ? klasseNivaa : nivaaer[0]
  }

  // Holder `nivaa` i takt med klasselinja for temaene som følger klassen, slik
  // at spillklienten aldri trenger å kjenne til folgerKlassen-flagget.
  useEffect(() => {
    if (!kode) return
    for (const tema of TEMAER) {
      const gjeldende = aktivering[tema.id]
      if (!gjeldende?.folgerKlassen) continue
      const onsket = klassensNivaaFor(tema.nivaaer)
      if (gjeldende.nivaa !== onsket) {
        set(ref(db, `klasser/${kode}/temaAktivering/${tema.id}`), { ...gjeldende, nivaa: onsket })
      }
    }
  }, [kode, klasseNivaa, aktivering])   // eslint-disable-line react-hooks/exhaustive-deps

  function skriv(temaId: string, verdi: TemaAktivering | null) {
    if (!kode) return
    const node = ref(db, `klasser/${kode}/temaAktivering/${temaId}`)
    // Skriv til RTDB; lokal state følger via onValue-abonnementet.
    if (verdi) set(node, verdi); else remove(node)
  }

  function skrivFag(f: FagKode, verdi: boolean) {
    if (!kode) return
    set(ref(db, `klasser/${kode}/fagAktivering/${f}`), verdi)   // lokal state følger via onValue
  }

  function skrivEspenAktiv(verdi: boolean) {
    if (!kode) return
    set(ref(db, `klasser/${kode}/espenSpor/aktiv`), verdi)
  }
  function skrivEspenFag(f: FagKode, verdi: boolean) {
    if (!kode) return
    set(ref(db, `klasser/${kode}/espenSpor/fag/${f}`), verdi)
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
    <div className="space-y-6">
      {/* ── SEKSJON 1: Fag elevene ser ──────────────────────────────────── */}
      <section className="bg-white rounded-2xl p-5 border border-gray-200" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Fag elevene ser</h3>
        <p className="text-xs text-gray-500 mb-4 leading-snug">
          Slå programfag av/på for klassen. <b>Fag som er av, er helt skjult for
          elevene</b> — faner, temaer, innboks-tilbud og «Espen spør»-spørsmål for
          faget forsvinner.
        </p>

        <div className="space-y-2">
          {FAG_KODER.map(f => (
            <div key={f} className="p-2.5 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between gap-4">
                <div className="font-medium text-gray-900 text-sm min-w-0">
                  <span className="inline-block w-8 text-[11px] font-mono text-gray-400">{FAG_META[f].kort}</span>
                  {FAG_META[f].navn}
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <span className={`text-xs font-semibold w-6 text-right ${fag[f] ? 'text-teal-600' : 'text-gray-400'}`}>
                    {fag[f] ? 'På' : 'Av'}
                  </span>
                  <button
                    onClick={() => skrivFag(f, !fag[f])}
                    role="switch"
                    aria-checked={fag[f]}
                    aria-label={`${FAG_META[f].navn} — ${fag[f] ? 'på' : 'av'}`}
                    className={`relative w-11 h-6 rounded-full transition-colors ${fag[f] ? 'bg-teal-500' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${fag[f] ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
              </div>
              {f === 'ks' && (
                <div className="text-[11px] text-gray-500 mt-1.5 leading-snug">
                  Kultur og samhandling ligger i kundemøtene, som alltid er på. Denne
                  bryteren styrer KS-spørsmål fra Espen og KS-temaer.
                </div>
              )}
            </div>
          ))}
        </div>

      </section>


      {/* «Espen spør» er ikke et fag — egen rad med skillelinje over, slik at
          den ikke leses som en fjerde fag-bryter (spor D, jobb 5). */}
      <section
        className="bg-white rounded-2xl px-5 py-4 border border-gray-200"
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderTop: '3px solid #e5e7eb' }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="font-medium text-gray-900 text-sm">Espen spør</div>
            <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">
              Mentor-Espen stiller korte fagspørsmål i spillet. Av som standard —
              skru på og velg fag.
            </div>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <span className={`text-xs font-semibold w-6 text-right ${espen.aktiv ? 'text-teal-600' : 'text-gray-400'}`}>
              {espen.aktiv ? 'På' : 'Av'}
            </span>
            <button
              onClick={() => skrivEspenAktiv(!espen.aktiv)}
              role="switch"
              aria-checked={espen.aktiv}
              aria-label={`Espen spør — ${espen.aktiv ? 'på' : 'av'}`}
              className={`relative w-11 h-6 rounded-full transition-colors ${espen.aktiv ? 'bg-teal-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${espen.aktiv ? 'translate-x-5' : ''}`} />
            </button>
          </div>
        </div>
        {espen.aktiv && (
          <div className="mt-2 flex flex-wrap gap-2">
            {FAG_KODER.map(f => {
              const globaltAv = !fag[f]
              const valgt = espen.fag[f] && !globaltAv
              return (
                <button
                  key={f}
                  disabled={globaltAv}
                  onClick={() => skrivEspenFag(f, !espen.fag[f])}
                  title={globaltAv ? `Faget «${FAG_META[f].navn}» er slått av` : FAG_META[f].navn}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                    globaltAv ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                      : valgt ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {valgt ? '✓ ' : ''}{FAG_META[f].kort}{globaltAv ? ' (av)' : ''}
                </button>
              )
            })}
          </div>
        )}
      </section>

      {/* ── SEKSJON 2: Temaer ───────────────────────────────────────────── */}
      <section className="bg-white rounded-2xl p-5 border border-gray-200" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Temaer</h3>
        <p className="text-xs text-gray-500 mb-4">
          Slå temaer av/på for denne klassen og velg nivå. Endringen ses live i
          spillet for elever med samme klassekode.
        </p>

        <div className="space-y-3">
          {TEMAER.map(tema => {
            const gjeldende = aktivering[tema.id]
            const aktiv = !!gjeldende?.aktiv
            // Uten lagret verdi følger temaet klassen; lagrede temaer med et
            // fast nivå beholder det.
            const folgerKlassen = gjeldende ? gjeldende.folgerKlassen === true : true
            const nivaa: TemaNivaa = folgerKlassen
              ? klassensNivaaFor(tema.nivaaer)
              : gjeldende?.nivaa ?? tema.nivaaer[0]
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
                  {/* Nivå-velger — vises kun når temaet er PÅ, så avslåtte temaer
                      ikke ser ut til å ha et aktivt nivåvalg. */}
                  {aktiv && (
                    <div className="flex rounded-lg overflow-hidden border border-gray-200">
                      <button
                        onClick={() => skriv(tema.id, { aktiv, nivaa: klassensNivaaFor(tema.nivaaer), folgerKlassen: true })}
                        title={`Følger «Elevenes nivå» i klasselinja (${klassensNivaaFor(tema.nivaaer).toUpperCase()})`}
                        className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                          folgerKlassen ? 'bg-teal-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        Følger klassen
                      </button>
                      {tema.nivaaer.map(n => (
                        <button
                          key={n}
                          onClick={() => skriv(tema.id, { aktiv, nivaa: n, folgerKlassen: false })}
                          className={`px-2.5 py-1 text-xs font-medium uppercase transition-colors border-l border-gray-200 ${
                            !folgerKlassen && nivaa === n ? 'bg-teal-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Av/på — tekst i tillegg til farge */}
                  <span className={`text-xs font-semibold w-6 text-right ${aktiv ? 'text-teal-600' : 'text-gray-400'}`}>
                    {aktiv ? 'På' : 'Av'}
                  </span>
                  <button
                    onClick={() => skriv(tema.id, { aktiv: !aktiv, nivaa, folgerKlassen })}
                    role="switch"
                    aria-checked={aktiv}
                    aria-label={`${tema.navn} — ${aktiv ? 'på' : 'av'}`}
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
      </section>
    </div>
  )
}
