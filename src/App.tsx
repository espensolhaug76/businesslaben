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

// ── VG2 Forretningsdrift learning modules ─────────────────────────────────────
import ForretningsplanModule from './screens/learninghub/vg2/forretningsdrift/ForretningsplanModule'
import ForretningsplanComplete from './screens/learninghub/vg2/forretningsdrift/ForretningsplanComplete'
import LonnPersonalkostnaderModule from './screens/learninghub/vg2/forretningsdrift/LonnPersonalkostnaderModule'
import LonnPersonalkostnaderComplete from './screens/learninghub/vg2/forretningsdrift/LonnPersonalkostnaderComplete'
import RegnskapsanalyseModule from './screens/learninghub/vg2/forretningsdrift/RegnskapsanalyseModule'
import RegnskapsanalyseComplete from './screens/learninghub/vg2/forretningsdrift/RegnskapsanalyseComplete'
import RisikoanalyseModule from './screens/learninghub/vg2/forretningsdrift/RisikoanalyseModule'
import RisikoanalyseComplete from './screens/learninghub/vg2/forretningsdrift/RisikoanalyseComplete'
import SvinnforebyggingModule from './screens/learninghub/vg2/forretningsdrift/SvinnforebyggingModule'
import SvinnforebyggingComplete from './screens/learninghub/vg2/forretningsdrift/SvinnforebyggingComplete'

// ── VG2 Innovasjon learning modules ───────────────────────────────────────────
import MerkevareModule from './screens/learninghub/vg2/innovasjon/MerkevareModule'
import MerkevareComplete from './screens/learninghub/vg2/innovasjon/MerkevareComplete'
import MarkedsundersokelseModule from './screens/learninghub/vg2/innovasjon/MarkedsundersokelseModule'
import MarkedsundersokelseComplete from './screens/learninghub/vg2/innovasjon/MarkedsundersokelseComplete'
import ReiseligsprodukModule from './screens/learninghub/vg2/innovasjon/ReiseligsprodukModule'
import ReiselivsproduktComplete from './screens/learninghub/vg2/innovasjon/ReiselivsproduktComplete'
import BeredskapsledelseModule from './screens/learninghub/vg2/innovasjon/BeredskapsledelseModule'
import BeredskapsledelseComplete from './screens/learninghub/vg2/innovasjon/BeredskapsledelseComplete'
import PosisjoneringModule from './screens/learninghub/vg2/innovasjon/PosisjoneringModule'
import PosisjoneringComplete from './screens/learninghub/vg2/innovasjon/PosisjoneringComplete'

// ── VG2 Kultur learning modules ───────────────────────────────────────────────
import ProfesjonellKommunikasjonModule from './screens/learninghub/vg2/kultur/ProfesjonellKommunikasjonModule'
import ProfesjonellKommunikasjonComplete from './screens/learninghub/vg2/kultur/ProfesjonellKommunikasjonComplete'
import KonflikthandteringModule from './screens/learninghub/vg2/kultur/KonflikthandteringModule'
import KonflikthandteringComplete from './screens/learninghub/vg2/kultur/KonflikthandteringComplete'
import EtiskeDilemmaerModule from './screens/learninghub/vg2/kultur/EtiskeDilemmaerModule'
import EtiskeDilemmaerComplete from './screens/learninghub/vg2/kultur/EtiskeDilemmaerComplete'
import InternasjonaleMarkederModule from './screens/learninghub/vg2/kultur/InternasjonaleMarkederModule'
import InternasjonaleMarkederComplete from './screens/learninghub/vg2/kultur/InternasjonaleMarkederComplete'
import ArbeidslivetsSpillereglerModule from './screens/learninghub/vg2/kultur/ArbeidslivetsSpillereglerModule'
import ArbeidslivetsSpillereglerComplete from './screens/learninghub/vg2/kultur/ArbeidslivetsSpillereglerComplete'

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

// ── Forretningsdrift learning modules (FD1–FD8) ──────────────────────────────
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

          {/* ── Forretningsdrift learning modules (standalone) ───────────── */}
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

          {/* ── VG2 Forretningsdrift learning modules ────────────────────── */}
          <Route path="/learning/vg2/forretningsdrift/forretningsplan" element={<ForretningsplanModule />} />
          <Route path="/learning/vg2/forretningsdrift/forretningsplan/complete" element={<ForretningsplanComplete />} />
          <Route path="/learning/vg2/forretningsdrift/lonn-personalkostnader" element={<LonnPersonalkostnaderModule />} />
          <Route path="/learning/vg2/forretningsdrift/lonn-personalkostnader/complete" element={<LonnPersonalkostnaderComplete />} />
          <Route path="/learning/vg2/forretningsdrift/regnskapsanalyse" element={<RegnskapsanalyseModule />} />
          <Route path="/learning/vg2/forretningsdrift/regnskapsanalyse/complete" element={<RegnskapsanalyseComplete />} />
          <Route path="/learning/vg2/forretningsdrift/risikoanalyse" element={<RisikoanalyseModule />} />
          <Route path="/learning/vg2/forretningsdrift/risikoanalyse/complete" element={<RisikoanalyseComplete />} />
          <Route path="/learning/vg2/forretningsdrift/svinnforebygging" element={<SvinnforebyggingModule />} />
          <Route path="/learning/vg2/forretningsdrift/svinnforebygging/complete" element={<SvinnforebyggingComplete />} />

          {/* ── VG2 Innovasjon learning modules ──────────────────────────── */}
          <Route path="/learning/vg2/innovasjon/merkevare" element={<MerkevareModule />} />
          <Route path="/learning/vg2/innovasjon/merkevare/complete" element={<MerkevareComplete />} />
          <Route path="/learning/vg2/innovasjon/markedsundersokelse" element={<MarkedsundersokelseModule />} />
          <Route path="/learning/vg2/innovasjon/markedsundersokelse/complete" element={<MarkedsundersokelseComplete />} />
          <Route path="/learning/vg2/innovasjon/reiselivsprodukt" element={<ReiseligsprodukModule />} />
          <Route path="/learning/vg2/innovasjon/reiselivsprodukt/complete" element={<ReiselivsproduktComplete />} />
          <Route path="/learning/vg2/innovasjon/beredskapsledelse" element={<BeredskapsledelseModule />} />
          <Route path="/learning/vg2/innovasjon/beredskapsledelse/complete" element={<BeredskapsledelseComplete />} />
          <Route path="/learning/vg2/innovasjon/posisjonering" element={<PosisjoneringModule />} />
          <Route path="/learning/vg2/innovasjon/posisjonering/complete" element={<PosisjoneringComplete />} />

          {/* ── VG2 Kultur learning modules ───────────────────────────────── */}
          <Route path="/learning/vg2/kultur/profesjonell-kommunikasjon" element={<ProfesjonellKommunikasjonModule />} />
          <Route path="/learning/vg2/kultur/profesjonell-kommunikasjon/complete" element={<ProfesjonellKommunikasjonComplete />} />
          <Route path="/learning/vg2/kultur/konflikthåndtering" element={<KonflikthandteringModule />} />
          <Route path="/learning/vg2/kultur/konflikthåndtering/complete" element={<KonflikthandteringComplete />} />
          <Route path="/learning/vg2/kultur/etiske-dilemmaer" element={<EtiskeDilemmaerModule />} />
          <Route path="/learning/vg2/kultur/etiske-dilemmaer/complete" element={<EtiskeDilemmaerComplete />} />
          <Route path="/learning/vg2/kultur/internasjonale-markeder" element={<InternasjonaleMarkederModule />} />
          <Route path="/learning/vg2/kultur/internasjonale-markeder/complete" element={<InternasjonaleMarkederComplete />} />
          <Route path="/learning/vg2/kultur/arbeidslivets-spilleregler" element={<ArbeidslivetsSpillereglerModule />} />
          <Route path="/learning/vg2/kultur/arbeidslivets-spilleregler/complete" element={<ArbeidslivetsSpillereglerComplete />} />
          </Route>{/* end LearningLayout */}

        </Routes>
        <LiveBar />
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
