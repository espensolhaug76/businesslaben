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

// ── VG2 Økonomi og administrasjon (SSR02-01) ──────────────────────────────────
import { PHASES as forretningsplanPhases }  from '../vg2/okonomi/ForretningsplanModule'
import { phases as lonnPhases }             from '../vg2/okonomi/LonnPersonalkostnaderModule'
import { phases as regnskapsanalysePhases } from '../vg2/okonomi/RegnskapsanalyseModule'
import { phases as risikoanalysePhases }    from '../vg2/hms/RisikoanalyseModule'
import { phases as svinnPhases }            from '../vg2/okonomi/SvinnforebyggingModule'
import { phases as arbeidslivetsPhases }    from '../vg2/okonomi/ArbeidslivetsSpillereglerModule'
import { phases as trenderForretningsmodellerPhases } from '../vg2/okonomi/TrenderForretningsmodellerModule'
import { phases as prisOgKalkulasjonPhases }          from '../vg2/okonomi/PrisOgKalkulasjonModule'
import { phases as regelverkServicebedrifterPhases }   from '../vg2/okonomi/RegelverkServicebedrifterModule'
import { phases as digitaleSystemPhases }              from '../vg2/okonomi/DigitaleSystemKundeoppfolgingModule'
import { phases as rekrutteringPhases }                from '../vg2/okonomi/RekrutteringsprosesserModule'
import { phases as nokkeltallPhases }                  from '../vg2/okonomi/NokkeltallLonnsomhetModule'
import { phases as baerekraftVerdikjedePhases }        from '../vg2/okonomi/BaerekraftVerdikjedeModule'

// ── VG2 Kommunikasjon og markedsføring (SSR02-01) ─────────────────────────────
import { phases as merkevarePhases }              from '../vg2/kommunikasjon/MerkevareModule'
import { phases as markedsundersokelsePhases }    from '../vg2/kommunikasjon/MarkedsundersokelseModule'
import { phases as reiselivsproduktPhases }       from '../vg2/kommunikasjon/ReiselivsproduktModule'
import { phases as beredskapPhases }               from '../vg2/hms/BeredskapModule'
import { phases as markedsforingstrekantenPhases }  from '../vg2/kommunikasjon/MarkedsforingstrekantenModule'
import { phases as innovasjonProduktutviklingPhases } from '../vg2/kommunikasjon/InnovasjonProduktutviklingModule'
import { phases as markedsforingskampanjerPhases }  from '../vg2/kommunikasjon/MarkedsforingskampanjerModule'
import { phases as salgsprosessenVg2Phases }        from '../vg2/kommunikasjon/SalgsprosessenVg2Module'
import { phases as posisjoneringPhases }          from '../vg2/kommunikasjon/PosisjoneringModule'
import { phases as profKommPhases }               from '../vg2/kommunikasjon/ProfesjonellKommunikasjonModule'
import { phases as internasjonaleMarkederPhases } from '../vg2/kommunikasjon/InternasjonaleMarkederModule'

// ── VG2 Helse, miljø og sikkerhet (SSR02-01) ──────────────────────────────────
import { phases as konfliktPhases }              from '../vg2/hms/KonflikthandteringModule'
import { phases as etiskeDilemmaerPhases }       from '../vg2/hms/EtiskeDilemmaerModule'
import { phases as forstehjelpPhases }           from '../vg2/hms/ForstehjelpModule'
import { phases as brannvernPhases }             from '../vg2/hms/BrannvernModule'
import { phases as hmsArbeidRollerPhases }       from '../vg2/hms/HmsArbeidRollerModule'
import { phases as digitalSikkerhetPhases }      from '../vg2/hms/DigitalSikkerhetPersonvernModule'

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

  // VG2 Økonomi og administrasjon
  '/learning/vg2/okonomi/forretningsplan':        forretningsplanPhases as DrawerPhase[],
  '/learning/vg2/okonomi/lonn-personalkostnader': lonnPhases as DrawerPhase[],
  '/learning/vg2/okonomi/regnskapsanalyse':       regnskapsanalysePhases as DrawerPhase[],
  '/learning/vg2/hms/risikoanalyse':              risikoanalysePhases as DrawerPhase[],
  '/learning/vg2/okonomi/svinnforebygging':       svinnPhases as DrawerPhase[],
  '/learning/vg2/okonomi/arbeidslivets-spilleregler':      arbeidslivetsPhases as DrawerPhase[],
  '/learning/vg2/okonomi/trender-forretningsmodeller':     trenderForretningsmodellerPhases as DrawerPhase[],
  '/learning/vg2/okonomi/pris-og-kalkulasjon':             prisOgKalkulasjonPhases as DrawerPhase[],
  '/learning/vg2/okonomi/regelverk-servicebedrifter':       regelverkServicebedrifterPhases as DrawerPhase[],
  '/learning/vg2/okonomi/digitale-system-kundeoppfolging': digitaleSystemPhases as DrawerPhase[],
  '/learning/vg2/okonomi/rekrutteringsprosesser':          rekrutteringPhases as DrawerPhase[],
  '/learning/vg2/okonomi/nokkeltall-lonnsomhet':           nokkeltallPhases as DrawerPhase[],
  '/learning/vg2/okonomi/baerekraft-verdikjede':           baerekraftVerdikjedePhases as DrawerPhase[],

  // VG2 Kommunikasjon og markedsføring
  '/learning/vg2/kommunikasjon/merkevare':            merkevarePhases as DrawerPhase[],
  '/learning/vg2/kommunikasjon/markedsundersokelse':  markedsundersokelsePhases as DrawerPhase[],
  '/learning/vg2/kommunikasjon/reiselivsprodukt':     reiselivsproduktPhases as DrawerPhase[],
  '/learning/vg2/hms/beredskap':                        beredskapPhases as DrawerPhase[],
  '/learning/vg2/kommunikasjon/markedsforingstrekan':   markedsforingstrekantenPhases as DrawerPhase[],
  '/learning/vg2/kommunikasjon/innovasjon-produktutvikling': innovasjonProduktutviklingPhases as DrawerPhase[],
  '/learning/vg2/kommunikasjon/markedsforingskampanjer': markedsforingskampanjerPhases as DrawerPhase[],
  '/learning/vg2/kommunikasjon/salgsprosessen-vg2':     salgsprosessenVg2Phases as DrawerPhase[],
  '/learning/vg2/kommunikasjon/posisjonering':        posisjoneringPhases as DrawerPhase[],
  '/learning/vg2/kommunikasjon/profesjonell-kommunikasjon': profKommPhases as DrawerPhase[],
  '/learning/vg2/kommunikasjon/internasjonale-markeder':    internasjonaleMarkederPhases as DrawerPhase[],

  // VG2 Helse, miljø og sikkerhet
  '/learning/vg2/hms/konflikthåndtering':           konfliktPhases as DrawerPhase[],
  '/learning/vg2/hms/etiske-dilemmaer':             etiskeDilemmaerPhases as DrawerPhase[],
  '/learning/vg2/hms/risikoanalyse':                risikoanalysePhases as DrawerPhase[],
  '/learning/vg2/hms/forstehjelp':                    forstehjelpPhases as DrawerPhase[],
  '/learning/vg2/hms/brannvern':                      brannvernPhases as DrawerPhase[],
  '/learning/vg2/hms/hms-arbeid-roller':              hmsArbeidRollerPhases as DrawerPhase[],
  '/learning/vg2/hms/digital-sikkerhet-personvern':   digitalSikkerhetPhases as DrawerPhase[],

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
