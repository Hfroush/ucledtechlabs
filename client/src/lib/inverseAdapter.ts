// Inverse Adapter - Converts API data back to form format
// Reverses the normalization done by submitAdapter for draft restoration

export function splitCsv(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter(Boolean).map(String);
  const s = String(v ?? "").trim();
  return s ? s.split(/\s*,\s*/).filter(Boolean) : [];
}

export function parseEmployeeCountToString(v: unknown): string {
  const num = Number(v);
  if (num === 1) return "1";
  if (num === 2) return "2-3";
  if (num === 4) return "4-10";
  if (num === 11) return "11-20";
  if (num >= 21) return ">20";
  return String(v ?? ""); // fallback to string representation
}

export function parseMrrToString(v: unknown): string {
  const num = Number(v);
  if (num === 0) return "pre-revenue";
  if (num < 1000) return "<1000";
  if (num < 5000) return "<5000";
  if (num < 10000) return "<10000";
  if (num < 25000) return "<25000";
  if (num >= 25000) return ">25000";
  return String(v ?? ""); // fallback
}

export function draftApiToForm(d: any) {
  if (!d) return {};
  
  return {
    ...d,
    // Handle numeric fields that need string conversion for dropdowns
    numberOfEmployees: parseEmployeeCountToString(d?.numberOfEmployees),
    monthlyRecurringRevenue: parseMrrToString(d?.monthlyRecurringRevenue),
    
    // Convert server strings back to arrays for multi-selects
    problemCauses: splitCsv(d?.problemCauses),
    keyGroupAffected: splitCsv(d?.keyGroupAffected),
    
    // Ensure arrays stay arrays
    edtechDomains: Array.isArray(d?.edtechDomains) ? d.edtechDomains : [],
    customerType: Array.isArray(d?.customerType) ? d.customerType : [],
    
    // Handle optional fields with null fallback
    dateOfBirth: d?.dateOfBirth || "",
    telephoneNumber: d?.telephoneNumber || "",
    countryOfResidence: d?.countryOfResidence || "",
    productName: d?.productName || "",
    coFounders: d?.coFounders || "",
    investmentRounds: d?.investmentRounds || 0,
    companyValuation: d?.companyValuation || "",
    plannedRaiseAmount: d?.plannedRaiseAmount || "",
    plannedRaiseValuation: d?.plannedRaiseValuation || "",
    companyWebsite: d?.companyWebsite || "",
    pitchDeckLink: d?.pitchDeckLink || "",
    linkedinProfile: d?.linkedinProfile || "",
    researchEvidence: d?.researchEvidence || "",
    aiTeamExpertise: d?.aiTeamExpertise || "",
  };
}