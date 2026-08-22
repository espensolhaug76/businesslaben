// ─── DASHBORD-TEMA — lys/middels/mørk ─────────────────────────────────────
// Skalerer eksisterende fargespråk (mørk = dagens utseende, uendret) til to
// nye varianter. Persisteres i localStorage, IKKE i spillstate (ren UI-
// preferanse, som mentor_fired_v1/dev_panel_v1).

export type DashTema = 'lys' | 'middels' | 'mork'
const NOKKEL = 'dash_tema_v1'

export function hentDashTema(): DashTema {
  try {
    const v = localStorage.getItem(NOKKEL)
    if (v === 'lys' || v === 'middels' || v === 'mork') return v
  } catch { /* ignorer */ }
  return 'mork'
}
export function lagreDashTema(t: DashTema) {
  try { localStorage.setItem(NOKKEL, t) } catch { /* ignorer */ }
}

export const DASH_TEMA_LABEL: Record<DashTema, string> = {
  lys: '☀️ Lys', middels: '🌤️ Middels', mork: '🌙 Mørk',
}

// Injiseres ÉN gang (i DashboardOverlay) som et <style>-element.
export const DASH_TEMA_CSS = `
[data-dash-tema="mork"] {
  --dash-modal-bg: rgba(10,14,26,0.97);
  --dash-card: rgba(255,255,255,0.03);
  --dash-card-2: rgba(255,255,255,0.04);
  --dash-border: rgba(255,255,255,0.09);
  --dash-text: #f1f5f9;
  --dash-text-sekundaer: #64748b;
  --dash-text-dempet: #94a3b8;
}
[data-dash-tema="middels"] {
  --dash-modal-bg: rgba(30,41,59,0.97);
  --dash-card: rgba(255,255,255,0.05);
  --dash-card-2: rgba(255,255,255,0.07);
  --dash-border: rgba(255,255,255,0.14);
  --dash-text: #f8fafc;
  --dash-text-sekundaer: #94a3b8;
  --dash-text-dempet: #cbd5e1;
}
[data-dash-tema="lys"] {
  --dash-modal-bg: rgba(255,255,255,0.98);
  --dash-card: rgba(15,23,42,0.035);
  --dash-card-2: rgba(15,23,42,0.055);
  --dash-border: rgba(15,23,42,0.12);
  --dash-text: #0f172a;
  --dash-text-sekundaer: #475569;
  --dash-text-dempet: #64748b;
}
`
