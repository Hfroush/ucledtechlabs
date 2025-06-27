import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/past-programs-partners" element={<PastProgramsPartnersPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/privacy-cookies" element={<PrivacyCookies />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/slavery-statement" element={<SlaveryStatement />} />
          <Route path="/freedom-of-information" element={<FreedomOfInformation />} />
          <Route path="/policies-guidance" element={<PoliciesGuidance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;