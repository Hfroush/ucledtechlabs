// Submit Adapter - Normalizes form data to API-ready payload
// Fixes 422 contract mismatches between client form state and server expectations

import { parseMrrLabelToNumber } from "./mrr";

export function toNumberSafe(v: unknown): number {
  return parseMrrLabelToNumber(v);
}

export function parseEmployeeCount(v: unknown): number {
  const str = String(v ?? "").trim();
  if (str === "1") return 1;
  if (str === "2-3") return 2;
  if (str === "4-10") return 4;
  if (str === "11-20") return 11;
  if (str === ">20") return 21;
  return parseInt(str) || 1; // fallback
}

export function normalizeForSubmit(formData: any) {
  // Helper functions
  const join = (x: any) => Array.isArray(x) ? x.filter(Boolean).join(", ") : String(x ?? "");
  const trim = (s: any) => String(s ?? "").trim();

  // Normalize payload to match server contract
  const payload = {
    ...formData,
    // Status must be literal "submitted" for /submit endpoint
    status: "submitted",
    
    // Convert currency/comma MRR to number >= 0
    monthlyRecurringRevenue: toNumberSafe(formData.monthlyRecurringRevenue),
    
    // Convert employee count strings to integers
    numberOfEmployees: parseEmployeeCount(formData.numberOfEmployees),
    
    // Join multi-select arrays to strings (server expects strings)
    problemCauses: trim(join(formData.problemCauses)),
    keyGroupAffected: trim(join(formData.keyGroupAffected)),
    
    // Ensure required string fields are trimmed
    relevantExperience: trim(formData.relevantExperience),
  };

  // Client-side validation before submission - relevantExperience is a dropdown selection
  if (!payload.relevantExperience || payload.relevantExperience.trim().length === 0) {
    throw new Error("relevantExperience_required");
  }

  if (payload.problemCauses.length < 1) {
    throw new Error("problemCauses_required");
  }

  if (payload.keyGroupAffected.length < 1) {
    throw new Error("keyGroupAffected_required");
  }

  // Development logging for observability
  if (process.env.NODE_ENV === "development") {
    console.debug("Submit adapter normalized payload:", {
      status: typeof payload.status,
      monthlyRecurringRevenue: typeof payload.monthlyRecurringRevenue,
      problemCauses: typeof payload.problemCauses,
      keyGroupAffected: typeof payload.keyGroupAffected,
      relevantExperience: `${typeof payload.relevantExperience} (${payload.relevantExperience.length} chars)`,
    });
  }

  return payload;
}