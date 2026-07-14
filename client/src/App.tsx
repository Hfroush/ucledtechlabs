import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { usePageTracking } from "@/lib/analytics";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollReveal from "@/components/scroll-reveal";
import Home from "@/pages/home";
import Apply from "@/pages/apply";
import Admin from "@/pages/admin";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Accessibility from "@/pages/accessibility";
import PrivacyCookies from "@/pages/privacy-cookies";
import Disclaimer from "@/pages/disclaimer";
import SlaveryStatement from "@/pages/slavery-statement";
import FreedomOfInformation from "@/pages/freedom-of-information";
import PoliciesGuidance from "@/pages/policies-guidance";
import PastProgramsPartnersPage from "@/pages/past-programs-partners";
import Autumn2025 from "@/pages/autumn-2025";
import Paris from "@/pages/paris";
import ResourcesIndex from "@/pages/resources/index";
import WhatIsUclEdtechLabs from "@/pages/resources/what-is-ucl-edtech-labs";
import HowTheAcceleratorWorks from "@/pages/resources/how-the-accelerator-works";
import HowToApply from "@/pages/resources/how-to-apply";
import GlobalProgrammes from "@/pages/resources/global-programmes";
import UclEdtechLabsFaq from "@/pages/resources/ucl-edtech-labs-faq";
import EvidenceBasedEdtech from "@/pages/resources/evidence-based-edtech";
import ResearchMethodsForEdtechFounders from "@/pages/resources/research-methods-for-edtech-founders";
import MeasuringLearningOutcomes from "@/pages/resources/measuring-learning-outcomes";
import RunningEdtechPilots from "@/pages/resources/running-edtech-pilots";
import ResponsibleAiInEducation from "@/pages/resources/responsible-ai-in-education";
import AcceleratorOutcomes from "@/pages/resources/accelerator-outcomes";
import PortfolioSuccessStories from "@/pages/resources/portfolio-success-stories";

function App() {
  usePageTracking();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/apply" component={Apply} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/autumn-2025" component={Autumn2025} />
        <Route path="/paris" component={Paris} />
        <Route path="/past-programs-partners" component={PastProgramsPartnersPage} />
        <Route path="/resources" component={ResourcesIndex} />
        <Route path="/resources/what-is-ucl-edtech-labs" component={WhatIsUclEdtechLabs} />
        <Route path="/resources/how-the-accelerator-works" component={HowTheAcceleratorWorks} />
        <Route path="/resources/how-to-apply" component={HowToApply} />
        <Route path="/resources/global-programmes" component={GlobalProgrammes} />
        <Route path="/resources/ucl-edtech-labs-faq" component={UclEdtechLabsFaq} />
        <Route path="/resources/evidence-based-edtech" component={EvidenceBasedEdtech} />
        <Route path="/resources/research-methods-for-edtech-founders" component={ResearchMethodsForEdtechFounders} />
        <Route path="/resources/measuring-learning-outcomes" component={MeasuringLearningOutcomes} />
        <Route path="/resources/running-edtech-pilots" component={RunningEdtechPilots} />
        <Route path="/resources/responsible-ai-in-education" component={ResponsibleAiInEducation} />
        <Route path="/resources/accelerator-outcomes" component={AcceleratorOutcomes} />
        <Route path="/resources/portfolio-success-stories" component={PortfolioSuccessStories} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/accessibility" component={Accessibility} />
        <Route path="/privacy-cookies" component={PrivacyCookies} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/slavery-statement" component={SlaveryStatement} />
        <Route path="/freedom-of-information" component={FreedomOfInformation} />
        <Route path="/policies-guidance" component={PoliciesGuidance} />
        <Route component={NotFound} />
      </Switch>
      <ScrollReveal />
      <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
