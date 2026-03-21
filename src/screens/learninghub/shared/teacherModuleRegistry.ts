/**
 * Teacher module registry — maps every learning-hub route to its DrawerPhase data.
 * Used by the teacher dashboard to preview module content.
 */

import type { DrawerPhase } from './DrawerModule'

// ── VG1 Forretningsdrift ──────────────────────────────────────────────────────
import { PHASES as orgPhases }           from '../forretningsdrift/OrganizationModule'
import { phases as pricingCalcPhases }   from '../forretningsdrift/PricingCalculatorModule'
import { phases as budgetingPhases }     from '../forretningsdrift/BudgetingModule'
import { phases as hmsPhases }           from '../forretningsdrift/HMSModule'
import { phases as contingencyPhases }   from '../forretningsdrift/ContingencyModule'
import { phases as verdikjedenPhases }   from '../forretningsdrift/VerdikjedenModule'
import { phases as risikovurderingPhases } from '../forretningsdrift/RisikovurderingModule'
import { phases as reglerLovverkPhases } from '../forretningsdrift/ReglerLovverkModule'

// ── VG1 MFI ──────────────────────────────────────────────────────────────────
import { PHASES as malgruppePhases }            from '../mfi/MalgruppeModule'
import { PHASES as prisstrategierPhases }       from '../mfi/PrisstrategierModule'
import { PHASES as distribusjonPhases }         from '../mfi/DistribusjonModule'
import { PHASES as kommunikasjonKanalerPhases } from '../mfi/KommunikasjonKanalerModule'
import { PHASES as salgsprosessenPhases }       from '../mfi/SalgsprosessenModule'
import { PHASES as markedsforingslovenPhases }  from '../mfi/MarkedsforingslovenModule'
import { PHASES as markedsplanPhases }          from '../mfi/MarkedsplanModule'
import { PHASES as adminRutinerPhases }         from '../mfi/AdministrativeRutinerModule'
import { PHASES as baerekraftPhases }           from '../mfi/BaerekraftForretningsideeModule'
import { phases as teknologiKiPhases }          from '../mfi/TeknologiKiModule'

// ── VG1 Kultur ────────────────────────────────────────────────────────────────
import { PHASES as kommunikasjonPhases }    from '../kultur/KommunikasjonModule'
import { PHASES as klagebehandlingPhases }  from '../kultur/KlagebehandlingModule'
import { PHASES as kulturforstaelsePhases } from '../kultur/KulturforstaelseModule'
import { PHASES as etikkPhases }            from '../kultur/EtikkModule'
import { PHASES as teamarbeidPhases }       from '../kultur/TeamarbeidModule'
import { PHASES as vertskapsrollenPhases }  from '../kultur/VertskapsrollenModule'
import { PHASES as konfliktNodPhases }      from '../kultur/KonfliktNodModule'

// ── VG2 Forretningsdrift ──────────────────────────────────────────────────────
import { PHASES as forretningsplanPhases }  from '../vg2/forretningsdrift/ForretningsplanModule'
import { phases as lonnPhases }             from '../vg2/forretningsdrift/LonnPersonalkostnaderModule'
import { phases as regnskapsanalysePhases } from '../vg2/forretningsdrift/RegnskapsanalyseModule'
import { phases as risikoanalysePhases }    from '../vg2/forretningsdrift/RisikoanalyseModule'
import { phases as svinnPhases }            from '../vg2/forretningsdrift/SvinnforebyggingModule'

// ── VG2 Innovasjon ────────────────────────────────────────────────────────────
import { phases as merkevarePhases }              from '../vg2/innovasjon/MerkevareModule'
import { phases as markedsundersokelsePhases }    from '../vg2/innovasjon/MarkedsundersokelseModule'
import { phases as reiselivsprodukPhases }        from '../vg2/innovasjon/ReiseligsprodukModule'
import { phases as beredskapsledelsePhases }      from '../vg2/innovasjon/BeredskapsledelseModule'
import { phases as posisjoneringPhases }          from '../vg2/innovasjon/PosisjoneringModule'

// ── VG2 Kultur ────────────────────────────────────────────────────────────────
import { phases as profKommPhases }              from '../vg2/kultur/ProfesjonellKommunikasjonModule'
import { phases as konfliktPhases }              from '../vg2/kultur/KonflikthandteringModule'
import { phases as etiskeDilemmaerPhases }       from '../vg2/kultur/EtiskeDilemmaerModule'
import { phases as internasjonaleMarkederPhases } from '../vg2/kultur/InternasjonaleMarkederModule'
import { phases as arbeidslivetsPhases }         from '../vg2/kultur/ArbeidslivetsSpillereglerModule'

// ── ML1 ───────────────────────────────────────────────────────────────────────
import { PHASES as markedsforingFagPhases }     from '../ml1/MarkedsforingFagModule'
import { phases as situasjonsanalysePhases }    from '../ml1/SituasjonsanalyseModule'
import { PHASES as forbrukeratferdPhases }      from '../ml1/ForbrukeratferdModule'
import { phases as stpPhases }                  from '../ml1/StpModule'
import { phases as produktstrategiPhases }      from '../ml1/ProduktstrategiModule'
import { phases as prisstrategiMl1Phases }      from '../ml1/PrisstrategiMl1Module'
import { phases as distribusjonsstrategiPhases } from '../ml1/DistribusjonsstrategiModule'
import { PHASES as markedskommunikasjonPhases } from '../ml1/MarkedskommunikasjonModule'

// ── Registry ──────────────────────────────────────────────────────────────────

export const TEACHER_MODULE_PHASES: Record<string, DrawerPhase[]> = {
  // VG1 Forretningsdrift
  '/learning/forretningsdrift/organization':       orgPhases as DrawerPhase[],
  '/learning/forretningsdrift/pricing-calculator': pricingCalcPhases as DrawerPhase[],
  '/learning/forretningsdrift/budgeting':          budgetingPhases as DrawerPhase[],
  '/learning/forretningsdrift/hms':                hmsPhases as DrawerPhase[],
  '/learning/forretningsdrift/contingency':        contingencyPhases as DrawerPhase[],
  '/learning/forretningsdrift/verdikjeden':        verdikjedenPhases as DrawerPhase[],
  '/learning/forretningsdrift/risikovurdering':    risikovurderingPhases as DrawerPhase[],
  '/learning/forretningsdrift/regler-lovverk':     reglerLovverkPhases as DrawerPhase[],

  // VG1 MFI
  '/learning/mfi/malgruppe':                  malgruppePhases as DrawerPhase[],
  '/learning/mfi/produkt-behov':              malgruppePhases as DrawerPhase[],
  '/learning/mfi/prisstrategier':             prisstrategierPhases as DrawerPhase[],
  '/learning/mfi/distribusjon':               distribusjonPhases as DrawerPhase[],
  '/learning/mfi/kommunikasjon-kanaler':      kommunikasjonKanalerPhases as DrawerPhase[],
  '/learning/mfi/salgsprosessen':             salgsprosessenPhases as DrawerPhase[],
  '/learning/mfi/markedsforingsloven':        markedsforingslovenPhases as DrawerPhase[],
  '/learning/mfi/markedsplan':                markedsplanPhases as DrawerPhase[],
  '/learning/mfi/administrative-rutiner':     adminRutinerPhases as DrawerPhase[],
  '/learning/mfi/baerekraft-forretningsidee': baerekraftPhases as DrawerPhase[],
  '/learning/mfi/teknologi-ki':               teknologiKiPhases as DrawerPhase[],

  // VG1 Kultur
  '/learning/kultur/kommunikasjon':   kommunikasjonPhases as DrawerPhase[],
  '/learning/kultur/klagebehandling': klagebehandlingPhases as DrawerPhase[],
  '/learning/kultur/kulturforstaelse': kulturforstaelsePhases as DrawerPhase[],
  '/learning/kultur/etikk':           etikkPhases as DrawerPhase[],
  '/learning/kultur/teamarbeid':            teamarbeidPhases as DrawerPhase[],
  '/learning/kultur/vertskapsrollen':       vertskapsrollenPhases as DrawerPhase[],
  '/learning/kultur/konflikt-nodssituasjon': konfliktNodPhases as DrawerPhase[],

  // VG2 Forretningsdrift
  '/learning/vg2/forretningsdrift/forretningsplan':        forretningsplanPhases as DrawerPhase[],
  '/learning/vg2/forretningsdrift/lonn-personalkostnader': lonnPhases as DrawerPhase[],
  '/learning/vg2/forretningsdrift/regnskapsanalyse':       regnskapsanalysePhases as DrawerPhase[],
  '/learning/vg2/forretningsdrift/risikoanalyse':          risikoanalysePhases as DrawerPhase[],
  '/learning/vg2/forretningsdrift/svinnforebygging':       svinnPhases as DrawerPhase[],

  // VG2 Innovasjon
  '/learning/vg2/innovasjon/merkevare':            merkevarePhases as DrawerPhase[],
  '/learning/vg2/innovasjon/markedsundersokelse':  markedsundersokelsePhases as DrawerPhase[],
  '/learning/vg2/innovasjon/reiselivsprodukt':     reiselivsprodukPhases as DrawerPhase[],
  '/learning/vg2/innovasjon/beredskapsledelse':    beredskapsledelsePhases as DrawerPhase[],
  '/learning/vg2/innovasjon/posisjonering':        posisjoneringPhases as DrawerPhase[],

  // VG2 Kultur
  '/learning/vg2/kultur/profesjonell-kommunikasjon': profKommPhases as DrawerPhase[],
  '/learning/vg2/kultur/konflikthåndtering':          konfliktPhases as DrawerPhase[],
  '/learning/vg2/kultur/etiske-dilemmaer':            etiskeDilemmaerPhases as DrawerPhase[],
  '/learning/vg2/kultur/internasjonale-markeder':     internasjonaleMarkederPhases as DrawerPhase[],
  '/learning/vg2/kultur/arbeidslivets-spilleregler':  arbeidslivetsPhases as DrawerPhase[],

  // ML1
  '/learning/ml1/markedsforingfag':       markedsforingFagPhases as DrawerPhase[],
  '/learning/ml1/situasjonsanalyse':      situasjonsanalysePhases as DrawerPhase[],
  '/learning/ml1/forbrukeratferd':        forbrukeratferdPhases as DrawerPhase[],
  '/learning/ml1/stp':                    stpPhases as DrawerPhase[],
  '/learning/ml1/produktstrategi':        produktstrategiPhases as DrawerPhase[],
  '/learning/ml1/prisstrategi':           prisstrategiMl1Phases as DrawerPhase[],
  '/learning/ml1/distribusjonsstrategi':  distribusjonsstrategiPhases as DrawerPhase[],
  '/learning/ml1/markedskommunikasjon':   markedskommunikasjonPhases as DrawerPhase[],
}
