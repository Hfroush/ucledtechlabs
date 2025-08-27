import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import Apply from "@/pages/apply";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
import Accessibility from "@/pages/accessibility";
import PrivacyCookies from "@/pages/privacy-cookies";
import Disclaimer from "@/pages/disclaimer";
import SlaveryStatement from "@/pages/slavery-statement";
import FreedomOfInformation from "@/pages/freedom-of-information";
import PoliciesGuidance from "@/pages/policies-guidance";
import PastProgramsPartnersPage from "@/pages/past-programs-partners";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/apply" component={Apply} />
        <Route path="/past-programs-partners" component={PastProgramsPartnersPage} />
        <Route path="/admin" component={Admin} />
        <Route path="/accessibility" component={Accessibility} />
        <Route path="/privacy-cookies" component={PrivacyCookies} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/slavery-statement" component={SlaveryStatement} />
        <Route path="/freedom-of-information" component={FreedomOfInformation} />
        <Route path="/policies-guidance" component={PoliciesGuidance} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;