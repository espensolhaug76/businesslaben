import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import { useThemeEffect } from './components/ui/ThemeToggle'
import LiveBar from './components/ui/LiveBar'

// Layouts
import AppLayout from './components/layout/AppLayout'
import StartupLayout from './components/layout/StartupLayout'
import CityLayout from './components/layout/CityLayout'
import LearningLayout from './components/layout/LearningLayout'

// Landing page
import LandingPage from './screens/LandingPage'

// Startup screens
import StartScreen from './screens/StartScreen'
import IndustryScreen from './screens/IndustryScreen'
import SustainabilityScreen from './screens/SustainabilityScreen'
import TargetAudienceScreen from './screens/TargetAudienceScreen'
import BusinessModelScreen from './screens/BusinessModelScreen'
import MarketResearchScreen from './screens/MarketResearchScreen'
import LocationScreen from './screens/LocationScreen'
import ProductCatalogScreen from './screens/ProductCatalogScreen'
import PriceCalculationScreen from './screens/PriceCalculationScreen'
import BudgetPlanningScreen from './screens/BudgetPlanningScreen'
import FinancingScreen from './screens/FinancingScreen'
import StartingCapitalScreen from './screens/StartingCapitalScreen'

// City & Desktop
import CityScreen from './screens/CityScreen'
import DesktopScreen from './screens/DesktopScreen'

// Teacher dashboard
import TeacherDashboard from './screens/TeacherDashboard'
import StudentQuestionsScreen from './screens/StudentQuestionsScreen'

// Forum
import TeacherForum from './screens/forum/TeacherForum'

// Competition
import CompetitionBuilder from './screens/competition/CompetitionBuilder'
import CompetitionLive from './screens/competition/CompetitionLive'
import CompetitionJoin from './screens/competition/CompetitionJoin'
import Leaderboard from './screens/competition/Leaderboard'

// Exam module
import ExamBuilder from './screens/exam/ExamBuilder'
import ExamSession from './screens/exam/ExamSession'
import ExamResults from './screens/exam/ExamResults'

// Gameplay screens
import DashboardScreen from './screens/DashboardScreen'
import PricingScreen from './screens/PricingScreen'
import DistributionScreen from './screens/DistributionScreen'
import MarketingScreen from './screens/MarketingScreen'
import PersonnelScreen from './screens/PersonnelScreen'
import MonthResultScreen from './screens/MonthResultScreen'
import YearEndScreen from './screens/YearEndScreen'

// AdVenture 3.0
import GamePage from './game/GamePage'


// Guards
import FeatureGuard from './components/guards/FeatureGuard'
import ErrorBoundary from './components/ErrorBoundary'

// Learning hub
import LearningHub from './screens/learninghub/LearningHub'

// ── VG1 MFI standalone modules ────────────────────────────────────────────────
import ProduktBehovModule from './screens/learninghub/mfi/ProduktBehovModule'
import ProduktBehovComplete from './screens/learninghub/mfi/ProduktBehovComplete'
import MalgruppeModule from './screens/learninghub/mfi/MalgruppeModule'
import MalgruppeComplete from './screens/learninghub/mfi/MalgruppeComplete'
import PrisstrategierModule from './screens/learninghub/mfi/PrisstrategierModule'
import PrisstrategierComplete from './screens/learninghub/mfi/PrisstrategierComplete'
import DistribusjonModule from './screens/learninghub/mfi/DistribusjonModule'
import DistribusjonComplete from './screens/learninghub/mfi/DistribusjonComplete'
import KommunikasjonKanalerModule from './screens/learninghub/mfi/KommunikasjonKanalerModule'
import KommunikasjonKanalerComplete from './screens/learninghub/mfi/KommunikasjonKanalerComplete'

// ── VG1 MFI learning modules ──────────────────────────────────────────────────
import SalgsprosessenModule from './screens/learninghub/mfi/SalgsprosessenModule'
import SalgsprosessenComplete from './screens/learninghub/mfi/SalgsprosessenComplete'
import MarkedsforingslovenModule from './screens/learninghub/mfi/MarkedsforingslovenModule'
import MarkedsforingslovenComplete from './screens/learninghub/mfi/MarkedsforingslovenComplete'
import MarkedsplanModule from './screens/learninghub/mfi/MarkedsplanModule'
import MarkedsplanComplete from './screens/learninghub/mfi/MarkedsplanComplete'
import AdministrativeRutinerModule from './screens/learninghub/mfi/AdministrativeRutinerModule'
import AdministrativeRutinerComplete from './screens/learninghub/mfi/AdministrativeRutinerComplete'
import BaerekraftForretningsideeModule from './screens/learninghub/mfi/BaerekraftForretningsideeModule'
import BaerekraftForretningsideeComplete from './screens/learninghub/mfi/BaerekraftForretningsideeComplete'
import TeknologiKiModule from './screens/learninghub/mfi/TeknologiKiModule'
import TeknologiKiComplete from './screens/learninghub/mfi/TeknologiKiComplete'

// ── VG1 Kultur learning modules ───────────────────────────────────────────────
import KommunikasjonModule from './screens/learninghub/kultur/KommunikasjonModule'
import KommunikasjonComplete from './screens/learninghub/kultur/KommunikasjonComplete'
import KlagebehandlingModule from './screens/learninghub/kultur/KlagebehandlingModule'
import KlagebehandlingComplete from './screens/learninghub/kultur/KlagebehandlingComplete'
import KulturforstaelseModule from './screens/learninghub/kultur/KulturforstaelseModule'
import KulturforstaelseComplete from './screens/learninghub/kultur/KulturforstaelseComplete'
import EtikkModule from './screens/learninghub/kultur/EtikkModule'
import EtikkComplete from './screens/learninghub/kultur/EtikkComplete'
import TeamarbeidModule from './screens/learninghub/kultur/TeamarbeidModule'
import TeamarbeidComplete from './screens/learninghub/kultur/TeamarbeidComplete'
import VertskapsrollenModule from './screens/learninghub/kultur/VertskapsrollenModule'
import VertskapsrollenComplete from './screens/learninghub/kultur/VertskapsrollenComplete'
import KonfliktNodModule from './screens/learninghub/kultur/KonfliktNodModule'
import KonfliktNodComplete from './screens/learninghub/kultur/KonfliktNodComplete'

// ── VG2 Økonomi og administrasjon learning modules ────────────────────────────
import ForretningsplanModule from './screens/learninghub/vg2/okonomi/ForretningsplanModule'
import ForretningsplanComplete from './screens/learninghub/vg2/okonomi/ForretningsplanComplete'
import LonnPersonalkostnaderModule from './screens/learninghub/vg2/okonomi/LonnPersonalkostnaderModule'
import LonnPersonalkostnaderComplete from './screens/learninghub/vg2/okonomi/LonnPersonalkostnaderComplete'
import RegnskapsanalyseModule from './screens/learninghub/vg2/okonomi/RegnskapsanalyseModule'
import RegnskapsanalyseComplete from './screens/learninghub/vg2/okonomi/RegnskapsanalyseComplete'
import RisikoanalyseModule from './screens/learninghub/vg2/hms/RisikoanalyseModule'
import RisikoanalyseComplete from './screens/learninghub/vg2/hms/RisikoanalyseComplete'
import SvinnforebyggingModule from './screens/learninghub/vg2/okonomi/SvinnforebyggingModule'
import SvinnforebyggingComplete from './screens/learninghub/vg2/okonomi/SvinnforebyggingComplete'
import ArbeidslivetsSpillereglerModule from './screens/learninghub/vg2/okonomi/ArbeidslivetsSpillereglerModule'
import ArbeidslivetsSpillereglerComplete from './screens/learninghub/vg2/okonomi/ArbeidslivetsSpillereglerComplete'
import TrenderForretningsmodellerModule from './screens/learninghub/vg2/okonomi/TrenderForretningsmodellerModule'
import TrenderForretningsmodellerComplete from './screens/learninghub/vg2/okonomi/TrenderForretningsmodellerComplete'
import PrisOgKalkulasjonModule from './screens/learninghub/vg2/okonomi/PrisOgKalkulasjonModule'
import PrisOgKalkulasjonComplete from './screens/learninghub/vg2/okonomi/PrisOgKalkulasjonComplete'
import RegelverkServicebedrifterModule from './screens/learninghub/vg2/okonomi/RegelverkServicebedrifterModule'
import RegelverkServicebedrifterComplete from './screens/learninghub/vg2/okonomi/RegelverkServicebedrifterComplete'
import DigitaleSystemKundeoppfolgingModule from './screens/learninghub/vg2/okonomi/DigitaleSystemKundeoppfolgingModule'
import DigitaleSystemKundeoppfolgingComplete from './screens/learninghub/vg2/okonomi/DigitaleSystemKundeoppfolgingComplete'
import RekrutteringsprosesserModule from './screens/learninghub/vg2/okonomi/RekrutteringsprosesserModule'
import RekrutteringsprosesserComplete from './screens/learninghub/vg2/okonomi/RekrutteringsprosesserComplete'
import NokkeltallLonnsomhetModule from './screens/learninghub/vg2/okonomi/NokkeltallLonnsomhetModule'
import NokkeltallLonnsomhetComplete from './screens/learninghub/vg2/okonomi/NokkeltallLonnsomhetComplete'
import BaerekraftVerdikjedeModule from './screens/learninghub/vg2/okonomi/BaerekraftVerdikjedeModule'
import BaerekraftVerdikjedeComplete from './screens/learninghub/vg2/okonomi/BaerekraftVerdikjedeComplete'

// ── VG2 Kommunikasjon og markedsføring learning modules ───────────────────────
import MerkevareModule from './screens/learninghub/vg2/kommunikasjon/MerkevareModule'
import MerkevareComplete from './screens/learninghub/vg2/kommunikasjon/MerkevareComplete'
import MarkedsundersokelseModule from './screens/learninghub/vg2/kommunikasjon/MarkedsundersokelseModule'
import MarkedsundersokelseComplete from './screens/learninghub/vg2/kommunikasjon/MarkedsundersokelseComplete'
import ReiselivsproduktModule from './screens/learninghub/vg2/kommunikasjon/ReiselivsproduktModule'
import ReiselivsproduktComplete from './screens/learninghub/vg2/kommunikasjon/ReiselivsproduktComplete'
import BeredskapModule from './screens/learninghub/vg2/hms/BeredskapModule'
import BeredskapComplete from './screens/learninghub/vg2/hms/BeredskapComplete'
import MarkedsforingstrekantenModule from './screens/learninghub/vg2/kommunikasjon/MarkedsforingstrekantenModule'
import MarkedsforingstrekantenComplete from './screens/learninghub/vg2/kommunikasjon/MarkedsforingstrekantenComplete'
import InnovasjonProduktutviklingModule from './screens/learninghub/vg2/kommunikasjon/InnovasjonProduktutviklingModule'
import InnovasjonProduktutviklingComplete from './screens/learninghub/vg2/kommunikasjon/InnovasjonProduktutviklingComplete'
import MarkedsforingskampanjerModule from './screens/learninghub/vg2/kommunikasjon/MarkedsforingskampanjerModule'
import MarkedsforingskampanjerComplete from './screens/learninghub/vg2/kommunikasjon/MarkedsforingskampanjerComplete'
import SalgsprosessenVg2Module from './screens/learninghub/vg2/kommunikasjon/SalgsprosessenVg2Module'
import SalgsprosessenVg2Complete from './screens/learninghub/vg2/kommunikasjon/SalgsprosessenVg2Complete'
import PosisjoneringModule from './screens/learninghub/vg2/kommunikasjon/PosisjoneringModule'
import PosisjoneringComplete from './screens/learninghub/vg2/kommunikasjon/PosisjoneringComplete'
import ProfesjonellKommunikasjonModule from './screens/learninghub/vg2/kommunikasjon/ProfesjonellKommunikasjonModule'
import ProfesjonellKommunikasjonComplete from './screens/learninghub/vg2/kommunikasjon/ProfesjonellKommunikasjonComplete'
import InternasjonaleMarkederModule from './screens/learninghub/vg2/kommunikasjon/InternasjonaleMarkederModule'
import InternasjonaleMarkederComplete from './screens/learninghub/vg2/kommunikasjon/InternasjonaleMarkederComplete'

// ── VG2 Helse, miljø og sikkerhet learning modules ────────────────────────────
import KonflikthandteringModule from './screens/learninghub/vg2/hms/KonflikthandteringModule'
import KonflikthandteringComplete from './screens/learninghub/vg2/hms/KonflikthandteringComplete'
import EtiskeDilemmaerModule from './screens/learninghub/vg2/hms/EtiskeDilemmaerModule'
import EtiskeDilemmaerComplete from './screens/learninghub/vg2/hms/EtiskeDilemmaerComplete'
import ForstehjelpModule from './screens/learninghub/vg2/hms/ForstehjelpModule'
import ForstehjelpComplete from './screens/learninghub/vg2/hms/ForstehjelpComplete'
import BrannvernModule from './screens/learninghub/vg2/hms/BrannvernModule'
import BrannvernComplete from './screens/learninghub/vg2/hms/BrannvernComplete'
import HmsArbeidRollerModule from './screens/learninghub/vg2/hms/HmsArbeidRollerModule'
import HmsArbeidRollerComplete from './screens/learninghub/vg2/hms/HmsArbeidRollerComplete'
import DigitalSikkerhetPersonvernModule from './screens/learninghub/vg2/hms/DigitalSikkerhetPersonvernModule'
import DigitalSikkerhetPersonvernComplete from './screens/learninghub/vg2/hms/DigitalSikkerhetPersonvernComplete'

// ── ML1 Studiespesialisering modules ─────────────────────────────────────────
import MarkedsforingFagModule from './screens/learninghub/ml1/MarkedsforingFagModule'
import MarkedsforingFagComplete from './screens/learninghub/ml1/MarkedsforingFagComplete'
import SituasjonsanalyseModule from './screens/learninghub/ml1/SituasjonsanalyseModule'
import SituasjonsanalyseComplete from './screens/learninghub/ml1/SituasjonsanalyseComplete'
import ForbrukeratferdModule from './screens/learninghub/ml1/ForbrukeratferdModule'
import ForbrukeratferdComplete from './screens/learninghub/ml1/ForbrukeratferdComplete'
import StpModule from './screens/learninghub/ml1/StpModule'
import StpComplete from './screens/learninghub/ml1/StpComplete'
import ProduktstrategiModule from './screens/learninghub/ml1/ProduktstrategiModule'
import ProduktstrategiComplete from './screens/learninghub/ml1/ProduktstrategiComplete'
import PrisstrategiMl1Module from './screens/learninghub/ml1/PrisstrategiMl1Module'
import PrisstrategiMl1Complete from './screens/learninghub/ml1/PrisstrategiMl1Complete'
import DistribusjonsstrategiModule from './screens/learninghub/ml1/DistribusjonsstrategiModule'
import DistribusjonsstrategiComplete from './screens/learninghub/ml1/DistribusjonsstrategiComplete'
import MarkedskommunikasjonModule from './screens/learninghub/ml1/MarkedskommunikasjonModule'
import MarkedskommunikasjonComplete from './screens/learninghub/ml1/MarkedskommunikasjonComplete'

// ── ML1 nye kapitler (kap 2 og 4) ────────────────────────────────────────────
import MarkederModule from './screens/learninghub/ml1/MarkederModule'
import MarkederComplete from './screens/learninghub/ml1/MarkederComplete'
import ProfesjonelleMarkederModule from './screens/learninghub/ml1/ProfesjonelleMarkederModule'
import ProfesjonelleMarkederComplete from './screens/learninghub/ml1/ProfesjonelleMarkederComplete'

// ── ML1 strukturfiks (master kap 11–15) ──────────────────────────────────────
import SalgPersonligKommunikasjonModule from './screens/learninghub/ml1/SalgPersonligKommunikasjonModule'
import SalgPersonligKommunikasjonComplete from './screens/learninghub/ml1/SalgPersonligKommunikasjonComplete'
import ReklameMedieplanleggingModule from './screens/learninghub/ml1/ReklameMedieplanleggingModule'
import ReklameMedieplanleggingComplete from './screens/learninghub/ml1/ReklameMedieplanleggingComplete'
import DirekteMarkedsforingInternettModule from './screens/learninghub/ml1/DirekteMarkedsforingInternettModule'
import DirekteMarkedsforingInternettComplete from './screens/learninghub/ml1/DirekteMarkedsforingInternettComplete'
import MarkedsforingsLovverkEtikkModule from './screens/learninghub/ml1/MarkedsforingsLovverkEtikkModule'
import MarkedsforingsLovverkEtikkComplete from './screens/learninghub/ml1/MarkedsforingsLovverkEtikkComplete'
import OrganiseringMarkedsforingModule from './screens/learninghub/ml1/OrganiseringMarkedsforingModule'
import OrganiseringMarkedsforingComplete from './screens/learninghub/ml1/OrganiseringMarkedsforingComplete'

// ── ML2 (VG3 Markedsføring og ledelse 2) ─────────────────────────────────────
import StrategiskPlanleggingModule from './screens/learninghub/ml2/StrategiskPlanleggingModule'
import StrategiskPlanleggingComplete from './screens/learninghub/ml2/StrategiskPlanleggingComplete'
import VisjonOgMalModule from './screens/learninghub/ml2/VisjonOgMalModule'
import VisjonOgMalComplete from './screens/learninghub/ml2/VisjonOgMalComplete'
import MarkedsOgBransjeanalyseModule from './screens/learninghub/ml2/MarkedsOgBransjeanalyseModule'
import MarkedsOgBransjeanalyseComplete from './screens/learninghub/ml2/MarkedsOgBransjeanalyseComplete'
import LederensRolleModule from './screens/learninghub/ml2/LederensRolleModule'
import LederensRolleComplete from './screens/learninghub/ml2/LederensRolleComplete'
import SamfunnsansvarBaerekraftOmdommeModule from './screens/learninghub/ml2/SamfunnsansvarBaerekraftOmdommeModule'
import SamfunnsansvarBaerekraftOmdommeComplete from './screens/learninghub/ml2/SamfunnsansvarBaerekraftOmdommeComplete'
import EtikkIMarkedsforingenModule from './screens/learninghub/ml2/EtikkIMarkedsforingenModule'
import EtikkIMarkedsforingenComplete from './screens/learninghub/ml2/EtikkIMarkedsforingenComplete'
import MerkevarestrategiModule from './screens/learninghub/ml2/MerkevarestrategiModule'
import MerkevarestrategiComplete from './screens/learninghub/ml2/MerkevarestrategiComplete'
import ProduktstrategiAvansertModule from './screens/learninghub/ml2/ProduktstrategiAvansertModule'
import ProduktstrategiAvansertComplete from './screens/learninghub/ml2/ProduktstrategiAvansertComplete'
import PrisstrategiAvansertModule from './screens/learninghub/ml2/PrisstrategiAvansertModule'
import PrisstrategiAvansertComplete from './screens/learninghub/ml2/PrisstrategiAvansertComplete'
import DistribusjonsstrategiAvansertModule from './screens/learninghub/ml2/DistribusjonsstrategiAvansertModule'
import DistribusjonsstrategiAvansertComplete from './screens/learninghub/ml2/DistribusjonsstrategiAvansertComplete'
import KommunikasjonsstrategierModule from './screens/learninghub/ml2/KommunikasjonsstrategierModule'
import KommunikasjonsstrategierComplete from './screens/learninghub/ml2/KommunikasjonsstrategierComplete'
import MarkedsmiksOgEffektmalingModule from './screens/learninghub/ml2/MarkedsmiksOgEffektmalingModule'
import MarkedsmiksOgEffektmalingComplete from './screens/learninghub/ml2/MarkedsmiksOgEffektmalingComplete'
import OrganiseringOgLedelseStrategiskModule from './screens/learninghub/ml2/OrganiseringOgLedelseStrategiskModule'
import OrganiseringOgLedelseStrategiskComplete from './screens/learninghub/ml2/OrganiseringOgLedelseStrategiskComplete'
import PersonaladministrasjonHRMModule from './screens/learninghub/ml2/PersonaladministrasjonHRMModule'
import PersonaladministrasjonHRMComplete from './screens/learninghub/ml2/PersonaladministrasjonHRMComplete'
import InternasjonalMarkedsforingModule from './screens/learninghub/ml2/InternasjonalMarkedsforingModule'
import InternasjonalMarkedsforingComplete from './screens/learninghub/ml2/InternasjonalMarkedsforingComplete'
import OkonomistyringKalkulasjonBudsjetteringModule from './screens/learninghub/ml2/OkonomistyringKalkulasjonBudsjetteringModule'
import OkonomistyringKalkulasjonBudsjetteringComplete from './screens/learninghub/ml2/OkonomistyringKalkulasjonBudsjetteringComplete'
import MarkedsplanenModule from './screens/learninghub/ml2/MarkedsplanenModule'
import MarkedsplanenComplete from './screens/learninghub/ml2/MarkedsplanenComplete'

// ── ENT1 (VG2 Entreprenørskap 1) ─────────────────────────────────────────────
import InnovatorenOgEntreprenorenModule from './screens/learninghub/ent1/InnovatorenOgEntreprenorenModule'
import InnovatorenOgEntreprenorenComplete from './screens/learninghub/ent1/InnovatorenOgEntreprenorenComplete'
import KreativitetIdeutviklingModule from './screens/learninghub/ent1/KreativitetIdeutviklingModule'
import KreativitetIdeutviklingComplete from './screens/learninghub/ent1/KreativitetIdeutviklingComplete'
import BehovMarkedSegmenteringModule from './screens/learninghub/ent1/BehovMarkedSegmenteringModule'
import BehovMarkedSegmenteringComplete from './screens/learninghub/ent1/BehovMarkedSegmenteringComplete'
import ForretningsmodellBmcModule from './screens/learninghub/ent1/ForretningsmodellBmcModule'
import ForretningsmodellBmcComplete from './screens/learninghub/ent1/ForretningsmodellBmcComplete'
import EtableringSelskapsformerModule from './screens/learninghub/ent1/EtableringSelskapsformerModule'
import EtableringSelskapsformerComplete from './screens/learninghub/ent1/EtableringSelskapsformerComplete'
import FinansieringTilskuddModule from './screens/learninghub/ent1/FinansieringTilskuddModule'
import FinansieringTilskuddComplete from './screens/learninghub/ent1/FinansieringTilskuddComplete'
import OkonomiskPlanleggingBudsjettModule from './screens/learninghub/ent1/OkonomiskPlanleggingBudsjettModule'
import OkonomiskPlanleggingBudsjettComplete from './screens/learninghub/ent1/OkonomiskPlanleggingBudsjettComplete'
import MarkedsforingSalgNystartedeModule from './screens/learninghub/ent1/MarkedsforingSalgNystartedeModule'
import MarkedsforingSalgNystartedeComplete from './screens/learninghub/ent1/MarkedsforingSalgNystartedeComplete'
import LovverkAvtalerHmsModule from './screens/learninghub/ent1/LovverkAvtalerHmsModule'
import LovverkAvtalerHmsComplete from './screens/learninghub/ent1/LovverkAvtalerHmsComplete'
import SamarbeidTeambyggingModule from './screens/learninghub/ent1/SamarbeidTeambyggingModule'
import SamarbeidTeambyggingComplete from './screens/learninghub/ent1/SamarbeidTeambyggingComplete'

// ── ENT2 (VG3 Entreprenørskap 2) ─────────────────────────────────────────────
import StrategiskPlanleggingVekstModule from './screens/learninghub/ent2/StrategiskPlanleggingVekstModule'
import StrategiskPlanleggingVekstComplete from './screens/learninghub/ent2/StrategiskPlanleggingVekstComplete'
import ForretningsutviklingSkaleringModule from './screens/learninghub/ent2/ForretningsutviklingSkaleringModule'
import ForretningsutviklingSkaleringComplete from './screens/learninghub/ent2/ForretningsutviklingSkaleringComplete'
import MarkedsanalysePosisjoneringModule from './screens/learninghub/ent2/MarkedsanalysePosisjoneringModule'
import MarkedsanalysePosisjoneringComplete from './screens/learninghub/ent2/MarkedsanalysePosisjoneringComplete'
import LedelseOrganisasjonskulturModule from './screens/learninghub/ent2/LedelseOrganisasjonskulturModule'
import LedelseOrganisasjonskulturComplete from './screens/learninghub/ent2/LedelseOrganisasjonskulturComplete'
import PersonaladministrasjonHrmStrategiskModule from './screens/learninghub/ent2/PersonaladministrasjonHrmStrategiskModule'
import PersonaladministrasjonHrmStrategiskComplete from './screens/learninghub/ent2/PersonaladministrasjonHrmStrategiskComplete'
// ENT2 strukturfiks: split + ny markedsplan-modul (master kap 16, 17, 18, 19, 20, 21)
import InvesteringsanalyseModule from './screens/learninghub/ent2/InvesteringsanalyseModule'
import InvesteringsanalyseComplete from './screens/learninghub/ent2/InvesteringsanalyseComplete'
import LikviditetsstyringFinansrisikoModule from './screens/learninghub/ent2/LikviditetsstyringFinansrisikoModule'
import LikviditetsstyringFinansrisikoComplete from './screens/learninghub/ent2/LikviditetsstyringFinansrisikoComplete'
import CsrEtikkModule from './screens/learninghub/ent2/CsrEtikkModule'
import CsrEtikkComplete from './screens/learninghub/ent2/CsrEtikkComplete'
import InternasjonaliseringEksportModule from './screens/learninghub/ent2/InternasjonaliseringEksportModule'
import InternasjonaliseringEksportComplete from './screens/learninghub/ent2/InternasjonaliseringEksportComplete'
import JusTvistelosningModule from './screens/learninghub/ent2/JusTvistelosningModule'
import JusTvistelosningComplete from './screens/learninghub/ent2/JusTvistelosningComplete'
import MarkedsplanenEtablerteBedrifterModule from './screens/learninghub/ent2/MarkedsplanenEtablerteBedrifterModule'
import MarkedsplanenEtablerteBedrifterComplete from './screens/learninghub/ent2/MarkedsplanenEtablerteBedrifterComplete'

// Join live session
import JoinSessionScreen from './screens/JoinSessionScreen'

// Student hub + live session
import StudentHub from './screens/StudentHub'
import LiveSession from './screens/LiveSession'

// ── Presentations ─────────────────────────────────────────────────────────────
import KonkurransemidlenePresentation from './screens/learninghub/presentations/KonkurransemidlenePresentation'
import ReglerLovverkPresentation from './screens/learninghub/presentations/ReglerLovverkPresentation'
import OrganizationPresentation from './screens/learninghub/presentations/OrganizationPresentation'
import VerdikjedenPresentation from './screens/learninghub/presentations/VerdikjedenPresentation'
import PrissettingPresentation from './screens/learninghub/presentations/PrissettingPresentation'
import RegnskapPresentation from './screens/learninghub/presentations/RegnskapPresentation'
import RegelverkMarkedsforingPresentation from './screens/learninghub/presentations/RegelverkMarkedsforingPresentation'
import ForretningsideePresentation from './screens/learninghub/presentations/ForretningsideePresentation'
import ForbrukeratferdPresentation from './screens/learninghub/presentations/ForbrukeratferdPresentation'
import MarkedsplanPresentation from './screens/learninghub/presentations/MarkedsplanPresentation'
import KampanjePresentation from './screens/learninghub/presentations/KampanjePresentation'
import SalgPresentation from './screens/learninghub/presentations/SalgPresentation'
import TeknologiKiPresentation from './screens/learninghub/presentations/TeknologiKiPresentation'
import AdministrativeFunksjonerPresentation from './screens/learninghub/presentations/AdministrativeFunksjonerPresentation'
import ParteneArbeidslivetPresentation from './screens/learninghub/presentations/ParteneArbeidslivetPresentation'
import RelasjonsbyggingPresentation from './screens/learninghub/presentations/RelasjonsbyggingPresentation'
import EtikkBaerekraftPresentation from './screens/learninghub/presentations/EtikkBaerekraftPresentation'
import KommunikasjonPresentation from './screens/learninghub/presentations/KommunikasjonPresentation'
import VertskapsrollenPresentation from './screens/learninghub/presentations/VertskapsrollenPresentation'
import KonfliktNodPresentation from './screens/learninghub/presentations/KonfliktNodPresentation'
import KlagehåndteringPresentation from './screens/learninghub/presentations/KlagehåndteringPresentation'
import RisikovurderingPresentation from './screens/learninghub/presentations/RisikovurderingPresentation'
import BeredskapsplanerPresentation from './screens/learninghub/presentations/BeredskapsplanerPresentation'
import HMSPresentation from './screens/learninghub/presentations/HMSPresentation'
import ML1Presentation from './screens/learninghub/presentations/ML1Presentation'
import ML2Presentation from './screens/learninghub/presentations/ML2Presentation'

// ── ML1 per-kapittel presentasjoner (kap 1–15) ──────────────────────────────
import MarkedsforingFagPresentation from './screens/learninghub/presentations/MarkedsforingFagPresentation'
import MarkederPresentation from './screens/learninghub/presentations/MarkederPresentation'
import ForbrukeratferdMl1Presentation from './screens/learninghub/presentations/ForbrukeratferdMl1Presentation'
import ProfesjonelleMarkederPresentation from './screens/learninghub/presentations/ProfesjonelleMarkederPresentation'
import SituasjonsanalyseMl1Presentation from './screens/learninghub/presentations/SituasjonsanalyseMl1Presentation'
import StpPresentation from './screens/learninghub/presentations/StpPresentation'
import ProduktstrategiPresentation from './screens/learninghub/presentations/ProduktstrategiPresentation'
import PrisstrategiMl1Presentation from './screens/learninghub/presentations/PrisstrategiMl1Presentation'
import DistribusjonsstrategiPresentation from './screens/learninghub/presentations/DistribusjonsstrategiPresentation'
import MarkedskommunikasjonPresentation from './screens/learninghub/presentations/MarkedskommunikasjonPresentation'
import SalgPersonligKommunikasjonPresentation from './screens/learninghub/presentations/SalgPersonligKommunikasjonPresentation'
import ReklameMedieplanleggingPresentation from './screens/learninghub/presentations/ReklameMedieplanleggingPresentation'
import DirekteMarkedsforingInternettPresentation from './screens/learninghub/presentations/DirekteMarkedsforingInternettPresentation'
import MarkedsforingsLovverkEtikkPresentation from './screens/learninghub/presentations/MarkedsforingsLovverkEtikkPresentation'
import OrganiseringMarkedsforingPresentation from './screens/learninghub/presentations/OrganiseringMarkedsforingPresentation'

// ── ML2 per-kapittel presentasjoner (kap 1–17) ──────────────────────────────
import StrategiskPlanleggingPresentation from './screens/learninghub/presentations/StrategiskPlanleggingPresentation'
import VisjonOgMalPresentation from './screens/learninghub/presentations/VisjonOgMalPresentation'
import MarkedsOgBransjeanalysePresentation from './screens/learninghub/presentations/MarkedsOgBransjeanalysePresentation'
import LederensRollePresentation from './screens/learninghub/presentations/LederensRollePresentation'
import SamfunnsansvarBaerekraftOmdommePresentation from './screens/learninghub/presentations/SamfunnsansvarBaerekraftOmdommePresentation'
import EtikkIMarkedsforingenPresentation from './screens/learninghub/presentations/EtikkIMarkedsforingenPresentation'
import MerkevarestrategiPresentation from './screens/learninghub/presentations/MerkevarestrategiPresentation'
import ProduktstrategiAvansertPresentation from './screens/learninghub/presentations/ProduktstrategiAvansertPresentation'
import PrisstrategiAvansertPresentation from './screens/learninghub/presentations/PrisstrategiAvansertPresentation'
import DistribusjonsstrategiAvansertPresentation from './screens/learninghub/presentations/DistribusjonsstrategiAvansertPresentation'
import KommunikasjonsstrategierPresentation from './screens/learninghub/presentations/KommunikasjonsstrategierPresentation'
import MarkedsmiksOgEffektmalingPresentation from './screens/learninghub/presentations/MarkedsmiksOgEffektmalingPresentation'
import OrganiseringOgLedelseStrategiskPresentation from './screens/learninghub/presentations/OrganiseringOgLedelseStrategiskPresentation'
import PersonaladministrasjonHRMPresentation from './screens/learninghub/presentations/PersonaladministrasjonHRMPresentation'
import InternasjonalMarkedsforingPresentation from './screens/learninghub/presentations/InternasjonalMarkedsforingPresentation'
import OkonomistyringKalkulasjonBudsjetteringPresentation from './screens/learninghub/presentations/OkonomistyringKalkulasjonBudsjetteringPresentation'
import MarkedsplanenPresentation from './screens/learninghub/presentations/MarkedsplanenPresentation'
import ENT1Presentation from './screens/learninghub/presentations/ENT1Presentation'
import ENT2Presentation from './screens/learninghub/presentations/ENT2Presentation'

// ── SSR02-01 VG2 Presentations ────────────────────────────────────────────────
import TrenderForretningsmodellerPresentation from './screens/learninghub/presentations/TrenderForretningsmodellerPresentation'
import RekrutteringsprosesserPresentation from './screens/learninghub/presentations/RekrutteringsprosesserPresentation'
import PrisOgKalkulasjonPresentation from './screens/learninghub/presentations/PrisOgKalkulasjonPresentation'
import NokkeltallLonnsomhetPresentation from './screens/learninghub/presentations/NokkeltallLonnsomhetPresentation'
import BaerekraftVerdikjedePresentation from './screens/learninghub/presentations/BaerekraftVerdikjedePresentation'
import RegelverkServicebedrifterPresentation from './screens/learninghub/presentations/RegelverkServicebedrifterPresentation'
import DigitaleSystemKundeoppfolgingPresentation from './screens/learninghub/presentations/DigitaleSystemKundeoppfolgingPresentation'
import ForretningsplanVg2Presentation from './screens/learninghub/presentations/ForretningsplanVg2Presentation'
import MerkevareVg2Presentation from './screens/learninghub/presentations/MerkevareVg2Presentation'
import MarkedsforingstrekantenPresentation from './screens/learninghub/presentations/MarkedsforingstrekantenPresentation'
import InnovasjonProduktutviklingPresentation from './screens/learninghub/presentations/InnovasjonProduktutviklingPresentation'
import MarkedsundersokelseVg2Presentation from './screens/learninghub/presentations/MarkedsundersokelseVg2Presentation'
import MarkedsforingskampanjerPresentation from './screens/learninghub/presentations/MarkedsforingskampanjerPresentation'
import SalgsprosessenVg2Presentation from './screens/learninghub/presentations/SalgsprosessenVg2Presentation'
import ReiselivsproduktVg2Presentation from './screens/learninghub/presentations/ReiselivsproduktVg2Presentation'
import PosisjoneringVg2Presentation from './screens/learninghub/presentations/PosisjoneringVg2Presentation'
import ProfesjonellKommunikasjonVg2Presentation from './screens/learninghub/presentations/ProfesjonellKommunikasjonVg2Presentation'
import InternasjonaleMarkederVg2Presentation from './screens/learninghub/presentations/InternasjonaleMarkederVg2Presentation'
import RisikoanalyseVg2Presentation from './screens/learninghub/presentations/RisikoanalyseVg2Presentation'
import ForstehjelpPresentation from './screens/learninghub/presentations/ForstehjelpPresentation'
import BrannvernPresentation from './screens/learninghub/presentations/BrannvernPresentation'
import HmsArbeidRollerPresentation from './screens/learninghub/presentations/HmsArbeidRollerPresentation'
import BeredskapPresentation from './screens/learninghub/presentations/BeredskapPresentation'
import DigitalSikkerhetPersonvernPresentation from './screens/learninghub/presentations/DigitalSikkerhetPersonvernPresentation'
import LonnPersonalkostnaderPresentation from './screens/learninghub/presentations/LonnPersonalkostnaderPresentation'
import SvinnforebyggingPresentation from './screens/learninghub/presentations/SvinnforebyggingPresentation'
import DistribusjonPresentation from './screens/learninghub/presentations/DistribusjonPresentation'
import ProduktPresentation from './screens/learninghub/presentations/ProduktPresentation'

// ── Forretningsdrift (VG1) learning modules (FD1–FD8) ──────────────────────────────
import OrganizationModule from './screens/learninghub/forretningsdrift/OrganizationModule'
import OrganizationComplete from './screens/learninghub/forretningsdrift/OrganizationComplete'
import PricingCalculatorModule from './screens/learninghub/forretningsdrift/PricingCalculatorModule'
import PricingCalculatorComplete from './screens/learninghub/forretningsdrift/PricingCalculatorComplete'
import BudgetingModule from './screens/learninghub/forretningsdrift/BudgetingModule'
import BudgetingComplete from './screens/learninghub/forretningsdrift/BudgetingComplete'
import HMSModule from './screens/learninghub/forretningsdrift/HMSModule'
import HMSComplete from './screens/learninghub/forretningsdrift/HMSComplete'
import ContingencyModule from './screens/learninghub/forretningsdrift/ContingencyModule'
import ContingencyComplete from './screens/learninghub/forretningsdrift/ContingencyComplete'
import VerdikjedenModule from './screens/learninghub/forretningsdrift/VerdikjedenModule'
import VerdikjedenComplete from './screens/learninghub/forretningsdrift/VerdikjedenComplete'
import RisikovurderingModule from './screens/learninghub/forretningsdrift/RisikovurderingModule'
import RisikovurderingComplete from './screens/learninghub/forretningsdrift/RisikovurderingComplete'
import ReglerLovverkModule from './screens/learninghub/forretningsdrift/ReglerLovverkModule'
import ReglerLovverkComplete from './screens/learninghub/forretningsdrift/ReglerLovverkComplete'

function App() {
  useThemeEffect()
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>

          {/* ── Landing page ─────────────────────────────────────────────── */}
          <Route path="/" element={<LandingPage />} />

          {/* ── AdVenture 3.0 Business Simulator ─────────────────────────── */}
          <Route path="/game" element={<GamePage />} />


          {/* ── Startup flow ─────────────────────────────────────────────── */}
          <Route element={<StartupLayout />}>
            <Route path="/start" element={<StartScreen />} />
            <Route path="/industry" element={<IndustryScreen />} />
            <Route path="/sustainability" element={<FeatureGuard featureId="sustainability_screen" redirectTo="/industry"><SustainabilityScreen /></FeatureGuard>} />
            <Route path="/target-audience" element={<FeatureGuard featureId="target_audience_screen" redirectTo="/industry"><TargetAudienceScreen /></FeatureGuard>} />
            <Route path="/business-model" element={<FeatureGuard featureId="business_model_screen" redirectTo="/industry"><BusinessModelScreen /></FeatureGuard>} />
            <Route path="/market-research" element={<MarketResearchScreen />} />
            <Route path="/location" element={<LocationScreen />} />
            <Route path="/products" element={<ProductCatalogScreen />} />
            <Route path="/price-calculation" element={<PriceCalculationScreen />} />
            <Route path="/budget-planning" element={<BudgetPlanningScreen />} />
            <Route path="/financing" element={<FinancingScreen />} />
            <Route path="/starting-capital" element={<StartingCapitalScreen />} />
          </Route>

          {/* ── City & Desktop ───────────────────────────────────────────── */}
          <Route element={<CityLayout />}>
            <Route path="/city" element={<CityScreen />} />
            <Route path="/desktop" element={<DesktopScreen />} />
          </Route>

          {/* ── Join live session ────────────────────────────────────────── */}
          <Route path="/join" element={<JoinSessionScreen />} />

          {/* ── Student hub + live session ───────────────────────────────── */}
          <Route path="/student" element={<StudentHub />} />
          <Route path="/live-session" element={<LiveSession />} />

          {/* ── Teacher dashboard ────────────────────────────────────────── */}
          <Route path="/teacher" element={<ErrorBoundary><TeacherDashboard /></ErrorBoundary>} />
          <Route path="/student-questions" element={<StudentQuestionsScreen />} />

          {/* ── Forum ────────────────────────────────────────────────────── */}
          <Route path="/forum" element={<TeacherForum />} />

          {/* ── Competition ──────────────────────────────────────────────── */}
          <Route path="/competition/build" element={<CompetitionBuilder />} />
          <Route path="/competition/live/:code" element={<CompetitionLive />} />
          <Route path="/competition/leaderboard/:code" element={<Leaderboard />} />
          <Route path="/competition/:code" element={<CompetitionJoin />} />

          {/* ── Exam module ───────────────────────────────────────────────── */}
          <Route path="/exam/build" element={<ExamBuilder />} />
          <Route path="/exam/results/:examId" element={<ExamResults />} />
          <Route path="/exam/:examCode" element={<ExamSession />} />

          {/* ── Gameplay (AppLayout) ─────────────────────────────────────── */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardScreen />} />
            <Route path="/pricing" element={<FeatureGuard featureId="pricing_screen"><PricingScreen /></FeatureGuard>} />
            <Route path="/distribution" element={<FeatureGuard featureId="distribution_screen"><DistributionScreen /></FeatureGuard>} />
            <Route path="/marketing" element={<FeatureGuard featureId="marketing"><MarketingScreen /></FeatureGuard>} />
            <Route path="/personnel" element={<FeatureGuard featureId="personnel"><PersonnelScreen /></FeatureGuard>} />
            <Route path="/monthly-report" element={<MonthResultScreen />} />
            <Route path="/year-end" element={<YearEndScreen />} />
          </Route>

          {/* ── Presentations (full-screen, no layout wrapper) ───────────── */}
          <Route path="/learning/presentations/konkurransemidlene" element={<KonkurransemidlenePresentation />} />
          <Route path="/learning/presentations/regler-lovverk" element={<ReglerLovverkPresentation />} />
          <Route path="/learning/presentations/organisasjon" element={<OrganizationPresentation />} />
          <Route path="/learning/presentations/verdikjeden" element={<VerdikjedenPresentation />} />
          <Route path="/learning/presentations/prissetting" element={<PrissettingPresentation />} />
          <Route path="/learning/presentations/regnskap" element={<RegnskapPresentation />} />
          <Route path="/learning/presentations/regelverk-markedsforing" element={<RegelverkMarkedsforingPresentation />} />
          <Route path="/learning/presentations/forretningsidee" element={<ForretningsideePresentation />} />
          <Route path="/learning/presentations/forbrukeratferd" element={<ForbrukeratferdPresentation />} />
          <Route path="/learning/presentations/markedsplan" element={<MarkedsplanPresentation />} />
          <Route path="/learning/presentations/kampanje" element={<KampanjePresentation />} />
          <Route path="/learning/presentations/salg" element={<SalgPresentation />} />
          <Route path="/learning/presentations/teknologi-ki" element={<TeknologiKiPresentation />} />
          <Route path="/learning/presentations/administrative-funksjoner" element={<AdministrativeFunksjonerPresentation />} />
          <Route path="/learning/presentations/partene-arbeidslivet" element={<ParteneArbeidslivetPresentation />} />
          <Route path="/learning/presentations/relasjonsbygging" element={<RelasjonsbyggingPresentation />} />
          <Route path="/learning/presentations/etikk-baerekraft" element={<EtikkBaerekraftPresentation />} />
          <Route path="/learning/presentations/kommunikasjon" element={<KommunikasjonPresentation />} />
          <Route path="/learning/presentations/vertskapsrollen" element={<VertskapsrollenPresentation />} />
          <Route path="/learning/presentations/konflikt-nod" element={<KonfliktNodPresentation />} />
          <Route path="/learning/presentations/klaghandtering" element={<KlagehåndteringPresentation />} />
          <Route path="/learning/presentations/risikovurdering" element={<RisikovurderingPresentation />} />
          <Route path="/learning/presentations/beredskapsplaner" element={<BeredskapsplanerPresentation />} />
          <Route path="/learning/presentations/hms" element={<HMSPresentation />} />
          <Route path="/learning/presentations/ml1" element={<ML1Presentation />} />
          <Route path="/learning/presentations/ml2" element={<ML2Presentation />} />

          {/* ── ML1 per-kapittel presentasjoner (kap 1–15) ─────────────── */}
          <Route path="/learning/presentations/ml1/markedsforing-fag" element={<MarkedsforingFagPresentation />} />
          <Route path="/learning/presentations/ml1/markeder" element={<MarkederPresentation />} />
          <Route path="/learning/presentations/ml1/forbrukeratferd" element={<ForbrukeratferdMl1Presentation />} />
          <Route path="/learning/presentations/ml1/profesjonelle-markeder" element={<ProfesjonelleMarkederPresentation />} />
          <Route path="/learning/presentations/ml1/situasjonsanalyse" element={<SituasjonsanalyseMl1Presentation />} />
          <Route path="/learning/presentations/ml1/stp" element={<StpPresentation />} />
          <Route path="/learning/presentations/ml1/produktstrategi" element={<ProduktstrategiPresentation />} />
          <Route path="/learning/presentations/ml1/prisstrategi" element={<PrisstrategiMl1Presentation />} />
          <Route path="/learning/presentations/ml1/distribusjonsstrategi" element={<DistribusjonsstrategiPresentation />} />
          <Route path="/learning/presentations/ml1/markedskommunikasjon" element={<MarkedskommunikasjonPresentation />} />
          <Route path="/learning/presentations/ml1/salg-personlig-kommunikasjon" element={<SalgPersonligKommunikasjonPresentation />} />
          <Route path="/learning/presentations/ml1/reklame-medieplanlegging" element={<ReklameMedieplanleggingPresentation />} />
          <Route path="/learning/presentations/ml1/direkte-markedsforing-internett" element={<DirekteMarkedsforingInternettPresentation />} />
          <Route path="/learning/presentations/ml1/markedsforings-lovverk-etikk" element={<MarkedsforingsLovverkEtikkPresentation />} />
          <Route path="/learning/presentations/ml1/organisering-markedsforing" element={<OrganiseringMarkedsforingPresentation />} />

          {/* ── ML2 per-kapittel presentasjoner (kap 1–17) ─────────────── */}
          <Route path="/learning/presentations/ml2/strategisk-planlegging" element={<StrategiskPlanleggingPresentation />} />
          <Route path="/learning/presentations/ml2/visjon-og-mal" element={<VisjonOgMalPresentation />} />
          <Route path="/learning/presentations/ml2/markeds-og-bransjeanalyse" element={<MarkedsOgBransjeanalysePresentation />} />
          <Route path="/learning/presentations/ml2/lederens-rolle" element={<LederensRollePresentation />} />
          <Route path="/learning/presentations/ml2/samfunnsansvar-baerekraft-omdomme" element={<SamfunnsansvarBaerekraftOmdommePresentation />} />
          <Route path="/learning/presentations/ml2/etikk-i-markedsforingen" element={<EtikkIMarkedsforingenPresentation />} />
          <Route path="/learning/presentations/ml2/merkevarestrategi" element={<MerkevarestrategiPresentation />} />
          <Route path="/learning/presentations/ml2/produktstrategi-avansert" element={<ProduktstrategiAvansertPresentation />} />
          <Route path="/learning/presentations/ml2/prisstrategi-avansert" element={<PrisstrategiAvansertPresentation />} />
          <Route path="/learning/presentations/ml2/distribusjonsstrategi-avansert" element={<DistribusjonsstrategiAvansertPresentation />} />
          <Route path="/learning/presentations/ml2/kommunikasjonsstrategier" element={<KommunikasjonsstrategierPresentation />} />
          <Route path="/learning/presentations/ml2/markedsmiks-og-effektmaling" element={<MarkedsmiksOgEffektmalingPresentation />} />
          <Route path="/learning/presentations/ml2/organisering-og-ledelse-strategisk" element={<OrganiseringOgLedelseStrategiskPresentation />} />
          <Route path="/learning/presentations/ml2/personaladministrasjon-hrm" element={<PersonaladministrasjonHRMPresentation />} />
          <Route path="/learning/presentations/ml2/internasjonal-markedsforing" element={<InternasjonalMarkedsforingPresentation />} />
          <Route path="/learning/presentations/ml2/okonomistyring-kalkulasjon-budsjettering" element={<OkonomistyringKalkulasjonBudsjetteringPresentation />} />
          <Route path="/learning/presentations/ml2/markedsplanen" element={<MarkedsplanenPresentation />} />
          <Route path="/learning/presentations/ent1" element={<ENT1Presentation />} />
          <Route path="/learning/presentations/ent2" element={<ENT2Presentation />} />

          {/* ── SSR02-01 VG2 Presentations ──────────────────────────────── */}
          <Route path="/learning/presentations/trender-forretningsmodeller" element={<TrenderForretningsmodellerPresentation />} />
          <Route path="/learning/presentations/rekrutteringsprosesser" element={<RekrutteringsprosesserPresentation />} />
          <Route path="/learning/presentations/pris-og-kalkulasjon" element={<PrisOgKalkulasjonPresentation />} />
          <Route path="/learning/presentations/nokkeltall-lonnsomhet" element={<NokkeltallLonnsomhetPresentation />} />
          <Route path="/learning/presentations/baerekraft-verdikjede" element={<BaerekraftVerdikjedePresentation />} />
          <Route path="/learning/presentations/regelverk-servicebedrifter" element={<RegelverkServicebedrifterPresentation />} />
          <Route path="/learning/presentations/digitale-system-kundeoppfolging" element={<DigitaleSystemKundeoppfolgingPresentation />} />
          <Route path="/learning/presentations/forretningsplan-vg2" element={<ForretningsplanVg2Presentation />} />
          <Route path="/learning/presentations/merkevare-vg2" element={<MerkevareVg2Presentation />} />
          <Route path="/learning/presentations/markedsforingstrekanten" element={<MarkedsforingstrekantenPresentation />} />
          <Route path="/learning/presentations/innovasjon-produktutvikling" element={<InnovasjonProduktutviklingPresentation />} />
          <Route path="/learning/presentations/markedsundersokelse-vg2" element={<MarkedsundersokelseVg2Presentation />} />
          <Route path="/learning/presentations/markedsforingskampanjer" element={<MarkedsforingskampanjerPresentation />} />
          <Route path="/learning/presentations/salgsprosessen-vg2" element={<SalgsprosessenVg2Presentation />} />
          <Route path="/learning/presentations/reiselivsprodukt-vg2" element={<ReiselivsproduktVg2Presentation />} />
          <Route path="/learning/presentations/posisjonering-vg2" element={<PosisjoneringVg2Presentation />} />
          <Route path="/learning/presentations/profesjonell-kommunikasjon-vg2" element={<ProfesjonellKommunikasjonVg2Presentation />} />
          <Route path="/learning/presentations/internasjonale-markeder-vg2" element={<InternasjonaleMarkederVg2Presentation />} />
          <Route path="/learning/presentations/risikoanalyse-vg2" element={<RisikoanalyseVg2Presentation />} />
          <Route path="/learning/presentations/forstehjelp" element={<ForstehjelpPresentation />} />
          <Route path="/learning/presentations/brannvern" element={<BrannvernPresentation />} />
          <Route path="/learning/presentations/hms-arbeid-roller" element={<HmsArbeidRollerPresentation />} />
          <Route path="/learning/presentations/beredskap" element={<BeredskapPresentation />} />
          <Route path="/learning/presentations/digital-sikkerhet-personvern" element={<DigitalSikkerhetPersonvernPresentation />} />
          <Route path="/learning/presentations/lonn-personalkostnader" element={<LonnPersonalkostnaderPresentation />} />
          <Route path="/learning/presentations/svinnforebygging" element={<SvinnforebyggingPresentation />} />
          <Route path="/learning/presentations/distribusjon" element={<DistribusjonPresentation />} />
          <Route path="/learning/presentations/produkt" element={<ProduktPresentation />} />

          {/* ── Learning (all /learning/* routes share LearningLayout) ─── */}
          <Route element={<LearningLayout />}>
          <Route path="/learning" element={<LearningHub />} />

          {/* ── ML1 Studiespesialisering modules ─────────────────────────── */}
          <Route path="/learning/ml1/markedsforingfag" element={<MarkedsforingFagModule />} />
          <Route path="/learning/ml1/markedsforingfag/complete" element={<MarkedsforingFagComplete />} />
          <Route path="/learning/ml1/situasjonsanalyse" element={<SituasjonsanalyseModule />} />
          <Route path="/learning/ml1/situasjonsanalyse/complete" element={<SituasjonsanalyseComplete />} />
          <Route path="/learning/ml1/forbrukeratferd" element={<ForbrukeratferdModule />} />
          <Route path="/learning/ml1/forbrukeratferd/complete" element={<ForbrukeratferdComplete />} />
          <Route path="/learning/ml1/stp" element={<StpModule />} />
          <Route path="/learning/ml1/stp/complete" element={<StpComplete />} />
          <Route path="/learning/ml1/produktstrategi" element={<ProduktstrategiModule />} />
          <Route path="/learning/ml1/produktstrategi/complete" element={<ProduktstrategiComplete />} />
          <Route path="/learning/ml1/prisstrategi" element={<PrisstrategiMl1Module />} />
          <Route path="/learning/ml1/prisstrategi/complete" element={<PrisstrategiMl1Complete />} />
          <Route path="/learning/ml1/distribusjonsstrategi" element={<DistribusjonsstrategiModule />} />
          <Route path="/learning/ml1/distribusjonsstrategi/complete" element={<DistribusjonsstrategiComplete />} />
          <Route path="/learning/ml1/markedskommunikasjon" element={<MarkedskommunikasjonModule />} />
          <Route path="/learning/ml1/markedskommunikasjon/complete" element={<MarkedskommunikasjonComplete />} />

          {/* ── ML1 nye kapitler ──────────────────────────────────────────── */}
          <Route path="/learning/ml1/markeder" element={<MarkederModule />} />
          <Route path="/learning/ml1/markeder/complete" element={<MarkederComplete />} />
          <Route path="/learning/ml1/profesjonelle-markeder" element={<ProfesjonelleMarkederModule />} />
          <Route path="/learning/ml1/profesjonelle-markeder/complete" element={<ProfesjonelleMarkederComplete />} />

          {/* ── ML1 strukturfiks (master kap 11–15) ─────────────────────── */}
          <Route path="/learning/ml1/salg-personlig-kommunikasjon" element={<SalgPersonligKommunikasjonModule />} />
          <Route path="/learning/ml1/salg-personlig-kommunikasjon/complete" element={<SalgPersonligKommunikasjonComplete />} />
          <Route path="/learning/ml1/reklame-medieplanlegging" element={<ReklameMedieplanleggingModule />} />
          <Route path="/learning/ml1/reklame-medieplanlegging/complete" element={<ReklameMedieplanleggingComplete />} />
          <Route path="/learning/ml1/direkte-markedsforing-internett" element={<DirekteMarkedsforingInternettModule />} />
          <Route path="/learning/ml1/direkte-markedsforing-internett/complete" element={<DirekteMarkedsforingInternettComplete />} />
          <Route path="/learning/ml1/markedsforings-lovverk-etikk" element={<MarkedsforingsLovverkEtikkModule />} />
          <Route path="/learning/ml1/markedsforings-lovverk-etikk/complete" element={<MarkedsforingsLovverkEtikkComplete />} />
          <Route path="/learning/ml1/organisering-markedsforing" element={<OrganiseringMarkedsforingModule />} />
          <Route path="/learning/ml1/organisering-markedsforing/complete" element={<OrganiseringMarkedsforingComplete />} />

          {/* ── ML2 (VG3 Markedsføring og ledelse 2) ──────────────────────── */}
          <Route path="/learning/ml2/strategisk-planlegging" element={<StrategiskPlanleggingModule />} />
          <Route path="/learning/ml2/strategisk-planlegging/complete" element={<StrategiskPlanleggingComplete />} />
          <Route path="/learning/ml2/visjon-og-mal" element={<VisjonOgMalModule />} />
          <Route path="/learning/ml2/visjon-og-mal/complete" element={<VisjonOgMalComplete />} />
          <Route path="/learning/ml2/markeds-og-bransjeanalyse" element={<MarkedsOgBransjeanalyseModule />} />
          <Route path="/learning/ml2/markeds-og-bransjeanalyse/complete" element={<MarkedsOgBransjeanalyseComplete />} />
          <Route path="/learning/ml2/lederens-rolle" element={<LederensRolleModule />} />
          <Route path="/learning/ml2/lederens-rolle/complete" element={<LederensRolleComplete />} />
          <Route path="/learning/ml2/samfunnsansvar-baerekraft-omdomme" element={<SamfunnsansvarBaerekraftOmdommeModule />} />
          <Route path="/learning/ml2/samfunnsansvar-baerekraft-omdomme/complete" element={<SamfunnsansvarBaerekraftOmdommeComplete />} />
          <Route path="/learning/ml2/etikk-i-markedsforingen" element={<EtikkIMarkedsforingenModule />} />
          <Route path="/learning/ml2/etikk-i-markedsforingen/complete" element={<EtikkIMarkedsforingenComplete />} />
          <Route path="/learning/ml2/merkevarestrategi" element={<MerkevarestrategiModule />} />
          <Route path="/learning/ml2/merkevarestrategi/complete" element={<MerkevarestrategiComplete />} />
          <Route path="/learning/ml2/produktstrategi-avansert" element={<ProduktstrategiAvansertModule />} />
          <Route path="/learning/ml2/produktstrategi-avansert/complete" element={<ProduktstrategiAvansertComplete />} />
          <Route path="/learning/ml2/prisstrategi-avansert" element={<PrisstrategiAvansertModule />} />
          <Route path="/learning/ml2/prisstrategi-avansert/complete" element={<PrisstrategiAvansertComplete />} />
          <Route path="/learning/ml2/distribusjonsstrategi-avansert" element={<DistribusjonsstrategiAvansertModule />} />
          <Route path="/learning/ml2/distribusjonsstrategi-avansert/complete" element={<DistribusjonsstrategiAvansertComplete />} />
          <Route path="/learning/ml2/kommunikasjonsstrategier" element={<KommunikasjonsstrategierModule />} />
          <Route path="/learning/ml2/kommunikasjonsstrategier/complete" element={<KommunikasjonsstrategierComplete />} />
          <Route path="/learning/ml2/markedsmiks-og-effektmaling" element={<MarkedsmiksOgEffektmalingModule />} />
          <Route path="/learning/ml2/markedsmiks-og-effektmaling/complete" element={<MarkedsmiksOgEffektmalingComplete />} />
          <Route path="/learning/ml2/organisering-og-ledelse-strategisk" element={<OrganiseringOgLedelseStrategiskModule />} />
          <Route path="/learning/ml2/organisering-og-ledelse-strategisk/complete" element={<OrganiseringOgLedelseStrategiskComplete />} />
          <Route path="/learning/ml2/personaladministrasjon-hrm" element={<PersonaladministrasjonHRMModule />} />
          <Route path="/learning/ml2/personaladministrasjon-hrm/complete" element={<PersonaladministrasjonHRMComplete />} />
          <Route path="/learning/ml2/internasjonal-markedsforing" element={<InternasjonalMarkedsforingModule />} />
          <Route path="/learning/ml2/internasjonal-markedsforing/complete" element={<InternasjonalMarkedsforingComplete />} />
          <Route path="/learning/ml2/okonomistyring-kalkulasjon-budsjettering" element={<OkonomistyringKalkulasjonBudsjetteringModule />} />
          <Route path="/learning/ml2/okonomistyring-kalkulasjon-budsjettering/complete" element={<OkonomistyringKalkulasjonBudsjetteringComplete />} />
          <Route path="/learning/ml2/markedsplanen" element={<MarkedsplanenModule />} />
          <Route path="/learning/ml2/markedsplanen/complete" element={<MarkedsplanenComplete />} />

          {/* ── ENT1 (VG2 Entreprenørskap 1) ──────────────────────────────── */}
          <Route path="/learning/ent1/innovatoren-og-entreprenoren" element={<InnovatorenOgEntreprenorenModule />} />
          <Route path="/learning/ent1/innovatoren-og-entreprenoren/complete" element={<InnovatorenOgEntreprenorenComplete />} />
          <Route path="/learning/ent1/kreativitet-ideutvikling" element={<KreativitetIdeutviklingModule />} />
          <Route path="/learning/ent1/kreativitet-ideutvikling/complete" element={<KreativitetIdeutviklingComplete />} />
          <Route path="/learning/ent1/behov-marked-segmentering" element={<BehovMarkedSegmenteringModule />} />
          <Route path="/learning/ent1/behov-marked-segmentering/complete" element={<BehovMarkedSegmenteringComplete />} />
          <Route path="/learning/ent1/forretningsmodell-bmc" element={<ForretningsmodellBmcModule />} />
          <Route path="/learning/ent1/forretningsmodell-bmc/complete" element={<ForretningsmodellBmcComplete />} />
          <Route path="/learning/ent1/etablering-selskapsformer" element={<EtableringSelskapsformerModule />} />
          <Route path="/learning/ent1/etablering-selskapsformer/complete" element={<EtableringSelskapsformerComplete />} />
          <Route path="/learning/ent1/finansiering-tilskudd" element={<FinansieringTilskuddModule />} />
          <Route path="/learning/ent1/finansiering-tilskudd/complete" element={<FinansieringTilskuddComplete />} />
          <Route path="/learning/ent1/okonomisk-planlegging-budsjett" element={<OkonomiskPlanleggingBudsjettModule />} />
          <Route path="/learning/ent1/okonomisk-planlegging-budsjett/complete" element={<OkonomiskPlanleggingBudsjettComplete />} />
          <Route path="/learning/ent1/markedsforing-salg-nystartede" element={<MarkedsforingSalgNystartedeModule />} />
          <Route path="/learning/ent1/markedsforing-salg-nystartede/complete" element={<MarkedsforingSalgNystartedeComplete />} />
          <Route path="/learning/ent1/lovverk-avtaler-hms" element={<LovverkAvtalerHmsModule />} />
          <Route path="/learning/ent1/lovverk-avtaler-hms/complete" element={<LovverkAvtalerHmsComplete />} />
          <Route path="/learning/ent1/samarbeid-teambygging" element={<SamarbeidTeambyggingModule />} />
          <Route path="/learning/ent1/samarbeid-teambygging/complete" element={<SamarbeidTeambyggingComplete />} />

          {/* ── ENT2 (VG3 Entreprenørskap 2) ──────────────────────────────── */}
          <Route path="/learning/ent2/strategisk-planlegging-vekst" element={<StrategiskPlanleggingVekstModule />} />
          <Route path="/learning/ent2/strategisk-planlegging-vekst/complete" element={<StrategiskPlanleggingVekstComplete />} />
          <Route path="/learning/ent2/forretningsutvikling-skalering" element={<ForretningsutviklingSkaleringModule />} />
          <Route path="/learning/ent2/forretningsutvikling-skalering/complete" element={<ForretningsutviklingSkaleringComplete />} />
          <Route path="/learning/ent2/markedsanalyse-posisjonering" element={<MarkedsanalysePosisjoneringModule />} />
          <Route path="/learning/ent2/markedsanalyse-posisjonering/complete" element={<MarkedsanalysePosisjoneringComplete />} />
          <Route path="/learning/ent2/ledelse-organisasjonskultur" element={<LedelseOrganisasjonskulturModule />} />
          <Route path="/learning/ent2/ledelse-organisasjonskultur/complete" element={<LedelseOrganisasjonskulturComplete />} />
          <Route path="/learning/ent2/personaladministrasjon-hrm-strategisk" element={<PersonaladministrasjonHrmStrategiskModule />} />
          <Route path="/learning/ent2/personaladministrasjon-hrm-strategisk/complete" element={<PersonaladministrasjonHrmStrategiskComplete />} />
          {/* ── ENT2 strukturfiks (master kap 16, 17, 18, 19, 20, 21) ──────── */}
          <Route path="/learning/ent2/investeringsanalyse" element={<InvesteringsanalyseModule />} />
          <Route path="/learning/ent2/investeringsanalyse/complete" element={<InvesteringsanalyseComplete />} />
          <Route path="/learning/ent2/likviditetsstyring-finansrisiko" element={<LikviditetsstyringFinansrisikoModule />} />
          <Route path="/learning/ent2/likviditetsstyring-finansrisiko/complete" element={<LikviditetsstyringFinansrisikoComplete />} />
          <Route path="/learning/ent2/csr-etikk" element={<CsrEtikkModule />} />
          <Route path="/learning/ent2/csr-etikk/complete" element={<CsrEtikkComplete />} />
          <Route path="/learning/ent2/internasjonalisering-eksport" element={<InternasjonaliseringEksportModule />} />
          <Route path="/learning/ent2/internasjonalisering-eksport/complete" element={<InternasjonaliseringEksportComplete />} />
          <Route path="/learning/ent2/jus-tvistelosning" element={<JusTvistelosningModule />} />
          <Route path="/learning/ent2/jus-tvistelosning/complete" element={<JusTvistelosningComplete />} />
          <Route path="/learning/ent2/markedsplanen-etablerte-bedrifter" element={<MarkedsplanenEtablerteBedrifterModule />} />
          <Route path="/learning/ent2/markedsplanen-etablerte-bedrifter/complete" element={<MarkedsplanenEtablerteBedrifterComplete />} />

          {/* ── Forretningsdrift (VG1) learning modules (standalone) ───────────── */}
          <Route path="/learning/forretningsdrift/organization" element={<OrganizationModule />} />
          <Route path="/learning/forretningsdrift/organization/complete" element={<OrganizationComplete />} />
          <Route path="/learning/forretningsdrift/pricing-calculator" element={<PricingCalculatorModule />} />
          <Route path="/learning/forretningsdrift/pricing-calculator/complete" element={<PricingCalculatorComplete />} />
          <Route path="/learning/forretningsdrift/budgeting" element={<BudgetingModule />} />
          <Route path="/learning/forretningsdrift/budgeting/complete" element={<BudgetingComplete />} />
          <Route path="/learning/forretningsdrift/hms" element={<HMSModule />} />
          <Route path="/learning/forretningsdrift/hms/complete" element={<HMSComplete />} />
          <Route path="/learning/forretningsdrift/contingency" element={<ContingencyModule />} />
          <Route path="/learning/forretningsdrift/contingency/complete" element={<ContingencyComplete />} />
          <Route path="/learning/forretningsdrift/verdikjeden" element={<VerdikjedenModule />} />
          <Route path="/learning/forretningsdrift/verdikjeden/complete" element={<VerdikjedenComplete />} />
          <Route path="/learning/forretningsdrift/risikovurdering" element={<RisikovurderingModule />} />
          <Route path="/learning/forretningsdrift/risikovurdering/complete" element={<RisikovurderingComplete />} />
          <Route path="/learning/forretningsdrift/regler-lovverk" element={<ReglerLovverkModule />} />
          <Route path="/learning/forretningsdrift/regler-lovverk/complete" element={<ReglerLovverkComplete />} />

          {/* ── VG1 MFI standalone modules ───────────────────────────────── */}
          <Route path="/learning/mfi/produkt-behov" element={<ProduktBehovModule />} />
          <Route path="/learning/mfi/produkt-behov/complete" element={<ProduktBehovComplete />} />
          <Route path="/learning/mfi/malgruppe" element={<MalgruppeModule />} />
          <Route path="/learning/mfi/malgruppe/complete" element={<MalgruppeComplete />} />
          <Route path="/learning/mfi/prisstrategier" element={<PrisstrategierModule />} />
          <Route path="/learning/mfi/prisstrategier/complete" element={<PrisstrategierComplete />} />
          <Route path="/learning/mfi/distribusjon" element={<DistribusjonModule />} />
          <Route path="/learning/mfi/distribusjon/complete" element={<DistribusjonComplete />} />
          <Route path="/learning/mfi/kommunikasjon-kanaler" element={<KommunikasjonKanalerModule />} />
          <Route path="/learning/mfi/kommunikasjon-kanaler/complete" element={<KommunikasjonKanalerComplete />} />

          {/* ── VG1 MFI learning modules ─────────────────────────────────── */}
          <Route path="/learning/mfi/salgsprosessen" element={<SalgsprosessenModule />} />
          <Route path="/learning/mfi/salgsprosessen/complete" element={<SalgsprosessenComplete />} />
          <Route path="/learning/mfi/markedsforingsloven" element={<MarkedsforingslovenModule />} />
          <Route path="/learning/mfi/markedsforingsloven/complete" element={<MarkedsforingslovenComplete />} />
          <Route path="/learning/mfi/markedsplan" element={<MarkedsplanModule />} />
          <Route path="/learning/mfi/markedsplan/complete" element={<MarkedsplanComplete />} />
          <Route path="/learning/mfi/administrative-rutiner" element={<AdministrativeRutinerModule />} />
          <Route path="/learning/mfi/administrative-rutiner/complete" element={<AdministrativeRutinerComplete />} />
          <Route path="/learning/mfi/baerekraft-forretningsidee" element={<BaerekraftForretningsideeModule />} />
          <Route path="/learning/mfi/baerekraft-forretningsidee/complete" element={<BaerekraftForretningsideeComplete />} />
          <Route path="/learning/mfi/teknologi-ki" element={<TeknologiKiModule />} />
          <Route path="/learning/mfi/teknologi-ki/complete" element={<TeknologiKiComplete />} />

          {/* ── VG1 Kultur learning modules ──────────────────────────────── */}
          <Route path="/learning/kultur/kommunikasjon" element={<KommunikasjonModule />} />
          <Route path="/learning/kultur/kommunikasjon/complete" element={<KommunikasjonComplete />} />
          <Route path="/learning/kultur/klagebehandling" element={<KlagebehandlingModule />} />
          <Route path="/learning/kultur/klagebehandling/complete" element={<KlagebehandlingComplete />} />
          <Route path="/learning/kultur/kulturforstaelse" element={<KulturforstaelseModule />} />
          <Route path="/learning/kultur/kulturforstaelse/complete" element={<KulturforstaelseComplete />} />
          <Route path="/learning/kultur/etikk" element={<EtikkModule />} />
          <Route path="/learning/kultur/etikk/complete" element={<EtikkComplete />} />
          <Route path="/learning/kultur/teamarbeid" element={<TeamarbeidModule />} />
          <Route path="/learning/kultur/teamarbeid/complete" element={<TeamarbeidComplete />} />
          <Route path="/learning/kultur/vertskapsrollen" element={<VertskapsrollenModule />} />
          <Route path="/learning/kultur/vertskapsrollen/complete" element={<VertskapsrollenComplete />} />
          <Route path="/learning/kultur/konflikt-nodssituasjon" element={<KonfliktNodModule />} />
          <Route path="/learning/kultur/konflikt-nodssituasjon/complete" element={<KonfliktNodComplete />} />

          {/* ── VG2 Økonomi og administrasjon learning modules ───────────── */}
          <Route path="/learning/vg2/okonomi/forretningsplan" element={<ForretningsplanModule />} />
          <Route path="/learning/vg2/okonomi/forretningsplan/complete" element={<ForretningsplanComplete />} />
          <Route path="/learning/vg2/okonomi/lonn-personalkostnader" element={<LonnPersonalkostnaderModule />} />
          <Route path="/learning/vg2/okonomi/lonn-personalkostnader/complete" element={<LonnPersonalkostnaderComplete />} />
          <Route path="/learning/vg2/okonomi/regnskapsanalyse" element={<RegnskapsanalyseModule />} />
          <Route path="/learning/vg2/okonomi/regnskapsanalyse/complete" element={<RegnskapsanalyseComplete />} />
          <Route path="/learning/vg2/hms/risikoanalyse" element={<RisikoanalyseModule />} />
          <Route path="/learning/vg2/hms/risikoanalyse/complete" element={<RisikoanalyseComplete />} />
          <Route path="/learning/vg2/okonomi/svinnforebygging" element={<SvinnforebyggingModule />} />
          <Route path="/learning/vg2/okonomi/svinnforebygging/complete" element={<SvinnforebyggingComplete />} />
          <Route path="/learning/vg2/okonomi/arbeidslivets-spilleregler" element={<ArbeidslivetsSpillereglerModule />} />
          <Route path="/learning/vg2/okonomi/arbeidslivets-spilleregler/complete" element={<ArbeidslivetsSpillereglerComplete />} />
          <Route path="/learning/vg2/okonomi/trender-forretningsmodeller" element={<TrenderForretningsmodellerModule />} />
          <Route path="/learning/vg2/okonomi/trender-forretningsmodeller/complete" element={<TrenderForretningsmodellerComplete />} />
          <Route path="/learning/vg2/okonomi/pris-og-kalkulasjon" element={<PrisOgKalkulasjonModule />} />
          <Route path="/learning/vg2/okonomi/pris-og-kalkulasjon/complete" element={<PrisOgKalkulasjonComplete />} />
          <Route path="/learning/vg2/okonomi/regelverk-servicebedrifter" element={<RegelverkServicebedrifterModule />} />
          <Route path="/learning/vg2/okonomi/regelverk-servicebedrifter/complete" element={<RegelverkServicebedrifterComplete />} />
          <Route path="/learning/vg2/okonomi/digitale-system-kundeoppfolging" element={<DigitaleSystemKundeoppfolgingModule />} />
          <Route path="/learning/vg2/okonomi/digitale-system-kundeoppfolging/complete" element={<DigitaleSystemKundeoppfolgingComplete />} />
          <Route path="/learning/vg2/okonomi/rekrutteringsprosesser" element={<RekrutteringsprosesserModule />} />
          <Route path="/learning/vg2/okonomi/rekrutteringsprosesser/complete" element={<RekrutteringsprosesserComplete />} />
          <Route path="/learning/vg2/okonomi/nokkeltall-lonnsomhet" element={<NokkeltallLonnsomhetModule />} />
          <Route path="/learning/vg2/okonomi/nokkeltall-lonnsomhet/complete" element={<NokkeltallLonnsomhetComplete />} />
          <Route path="/learning/vg2/okonomi/baerekraft-verdikjede" element={<BaerekraftVerdikjedeModule />} />
          <Route path="/learning/vg2/okonomi/baerekraft-verdikjede/complete" element={<BaerekraftVerdikjedeComplete />} />

          {/* ── VG2 Kommunikasjon og markedsføring learning modules ──────── */}
          <Route path="/learning/vg2/kommunikasjon/merkevare" element={<MerkevareModule />} />
          <Route path="/learning/vg2/kommunikasjon/merkevare/complete" element={<MerkevareComplete />} />
          <Route path="/learning/vg2/kommunikasjon/markedsundersokelse" element={<MarkedsundersokelseModule />} />
          <Route path="/learning/vg2/kommunikasjon/markedsundersokelse/complete" element={<MarkedsundersokelseComplete />} />
          <Route path="/learning/vg2/kommunikasjon/reiselivsprodukt" element={<ReiselivsproduktModule />} />
          <Route path="/learning/vg2/kommunikasjon/reiselivsprodukt/complete" element={<ReiselivsproduktComplete />} />
          <Route path="/learning/vg2/hms/beredskap" element={<BeredskapModule />} />
          <Route path="/learning/vg2/hms/beredskap/complete" element={<BeredskapComplete />} />
          <Route path="/learning/vg2/kommunikasjon/markedsforingstrekan" element={<MarkedsforingstrekantenModule />} />
          <Route path="/learning/vg2/kommunikasjon/markedsforingstrekan/complete" element={<MarkedsforingstrekantenComplete />} />
          <Route path="/learning/vg2/kommunikasjon/innovasjon-produktutvikling" element={<InnovasjonProduktutviklingModule />} />
          <Route path="/learning/vg2/kommunikasjon/innovasjon-produktutvikling/complete" element={<InnovasjonProduktutviklingComplete />} />
          <Route path="/learning/vg2/kommunikasjon/markedsforingskampanjer" element={<MarkedsforingskampanjerModule />} />
          <Route path="/learning/vg2/kommunikasjon/markedsforingskampanjer/complete" element={<MarkedsforingskampanjerComplete />} />
          <Route path="/learning/vg2/kommunikasjon/salgsprosessen-vg2" element={<SalgsprosessenVg2Module />} />
          <Route path="/learning/vg2/kommunikasjon/salgsprosessen-vg2/complete" element={<SalgsprosessenVg2Complete />} />
          <Route path="/learning/vg2/kommunikasjon/posisjonering" element={<PosisjoneringModule />} />
          <Route path="/learning/vg2/kommunikasjon/posisjonering/complete" element={<PosisjoneringComplete />} />
          <Route path="/learning/vg2/kommunikasjon/profesjonell-kommunikasjon" element={<ProfesjonellKommunikasjonModule />} />
          <Route path="/learning/vg2/kommunikasjon/profesjonell-kommunikasjon/complete" element={<ProfesjonellKommunikasjonComplete />} />
          <Route path="/learning/vg2/kommunikasjon/internasjonale-markeder" element={<InternasjonaleMarkederModule />} />
          <Route path="/learning/vg2/kommunikasjon/internasjonale-markeder/complete" element={<InternasjonaleMarkederComplete />} />

          {/* ── VG2 Helse, miljø og sikkerhet learning modules ───────────── */}
          <Route path="/learning/vg2/hms/konflikthandtering" element={<KonflikthandteringModule />} />
          <Route path="/learning/vg2/hms/konflikthandtering/complete" element={<KonflikthandteringComplete />} />
          <Route path="/learning/vg2/hms/etiske-dilemmaer" element={<EtiskeDilemmaerModule />} />
          <Route path="/learning/vg2/hms/etiske-dilemmaer/complete" element={<EtiskeDilemmaerComplete />} />
          <Route path="/learning/vg2/hms/forstehjelp" element={<ForstehjelpModule />} />
          <Route path="/learning/vg2/hms/forstehjelp/complete" element={<ForstehjelpComplete />} />
          <Route path="/learning/vg2/hms/brannvern" element={<BrannvernModule />} />
          <Route path="/learning/vg2/hms/brannvern/complete" element={<BrannvernComplete />} />
          <Route path="/learning/vg2/hms/hms-arbeid-roller" element={<HmsArbeidRollerModule />} />
          <Route path="/learning/vg2/hms/hms-arbeid-roller/complete" element={<HmsArbeidRollerComplete />} />
          <Route path="/learning/vg2/hms/digital-sikkerhet-personvern" element={<DigitalSikkerhetPersonvernModule />} />
          <Route path="/learning/vg2/hms/digital-sikkerhet-personvern/complete" element={<DigitalSikkerhetPersonvernComplete />} />
          </Route>{/* end LearningLayout */}

        </Routes>
        <LiveBar />
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
