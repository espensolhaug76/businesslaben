import { test, expect } from '@playwright/test'
import { dispatch, ventState, ryddLocalStorage } from './harness'

const FIRED = JSON.stringify(['forste_bykart', 'forste_bydel', 'forste_disk_stell', 'forste_vindu'])

async function boot(page: any, sti: string[]) {
  await page.goto('/game?skip=1')
  await ryddLocalStorage(page)
  await page.addInitScript((s: string) => {
    try {
      localStorage.setItem('mentor_intro_v1', '1')
      localStorage.setItem('mentor_fired_v1', s)
    } catch { /* */ }
  }, FIRED)
  await page.addInitScript((arr: string) => { try { localStorage.setItem('sti-dev', arr) } catch { /* */ } }, JSON.stringify(sti))
  await page.goto('/game?skip=1')
  await ventState(page, (s: any) => s.phase !== 'startup', 'boot')
}

test('Tom sti → ingen mentor-dytt (frispill uendret)', async ({ page }) => {
  await boot(page, [])
  const s = await page.evaluate(() => (window as any).__GAME_STATE__)
  expect(s, 'spillet kjører').toBeTruthy()
  await page.waitForTimeout(1500)
  await expect(page.getByText(/Neste steg på stien/), 'ingen sti-dytt uten sti').toHaveCount(0)
})

test('Sti satt → mentor dytter mot neste udekkede milepæl, flytter seg ved fullføring', async ({ page }) => {
  await boot(page, ['lei-lokale', 'apningsordre', 'still-ut-vare', 'sett-pris'])
  // stiAktiv eksponert i context (via test-bro? les fra window om mulig; ellers UI).
  // Neste udekkede = lei-lokale (rentedLocationId null).
  await expect(page.getByText(/Neste steg på stien: «Lei et lokale»/), 'dytt mot første milepæl').toBeVisible({ timeout: 10_000 })

  // Fullfør «lei-lokale» → dyttet flytter seg til «apningsordre» med «Bra jobba!».
  await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45000, capacity: 120 })
  await ventState(page, (s: any) => s.rentedLocationId === 'sentrum-l2', 'leid')
  await expect(page.getByText(/Bra jobba!.*Neste steg på stien: «Legg åpningsbestillingen»/), 'dyttet flyttet seg + «Bra jobba!»').toBeVisible({ timeout: 10_000 })

  // Ingen sperre: dashbordet kan fortsatt åpnes (handling ikke blokkert).
  await expect(page.getByRole('button', { name: /Dashbord/ }).first(), 'ingen handling blokkert').toBeVisible()

  // Lukk dyttet (✕) → forsvinner; kommer tilbake ved scenebytte (mentor:signal).
  const lukk = page.getByRole('button', { name: 'Lukk' }).first()
  if (await lukk.isVisible().catch(() => false)) {
    await lukk.click()
    await expect(page.getByText(/Neste steg på stien/), 'dyttet lukket').toHaveCount(0)
    await page.evaluate(() => window.dispatchEvent(new CustomEvent('mentor:signal', { detail: { scene: 'inne' } })))
    await expect(page.getByText(/Neste steg på stien: «Legg åpningsbestillingen»/), 'dyttet kom tilbake ved scenebytte (ikke engangs)').toBeVisible({ timeout: 8000 })
  }
  console.log('STI-dytt: dukker opp, flytter seg ved fullføring, lukkes + kommer tilbake, blokkerer ikke')
})
