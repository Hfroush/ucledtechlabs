import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import Apply from "@/pages/apply";
import Accessibility from "@/pages/accessibility";
import Disclaimer from "@/pages/disclaimer";
import FreedomOfInformation from "@/pages/freedom-of-information";
import PoliciesGuidance from "@/pages/policies-guidance";
import PrivacyCookies from "@/pages/privacy-cookies";
import SlaveryStatement from "@/pages/slavery-statement";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/apply" component={Apply} />
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/freedom-of-information" component={FreedomOfInformation} />
      <Route path="/policies-guidance" component={PoliciesGuidance} />
      <Route path="/privacy-cookies" component={PrivacyCookies} />
      <Route path="/slavery-statement" component={SlaveryStatement} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
