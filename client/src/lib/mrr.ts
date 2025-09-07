// MRR Parser - Convert dropdown labels to numeric values
// Handles currency symbols, commas, k/m suffixes, ranges, and plus signs

export function parseMrrLabelToNumber(v: unknown): number {
  if (typeof v === "number" && v >= 0) return v;
  if (v == null || v === "") throw new Error("mrr_required");

  // Normalize string: remove currency words/symbols, commas
  let s = String(v).toLowerCase()
    .replace(/gbp|£|per\s*month|\/mo|\/month/g, "") // remove currency words/symbols
    .replace(/,/g, "")                               // strip thousands separators
    .trim();

  // Handle special cases
  if (s === "pre-revenue" || s === "0" || s === "none") return 0;

  // Split ranges "a-b", "a–b", "a to b" -> take lower bound
  const firstPart = s.split(/(?:-|–|to)/)[0].trim();

  // Match number with optional decimal and suffix k/m, optional plus
  const m = firstPart.match(/^(\d+(?:\.\d+)?)([km])?\+?$/);
  if (!m) {
    // Try plain integer fallback
    const n = Number(firstPart);
    if (!Number.isNaN(n) && n >= 0) return n;
    throw new Error("mrr_parse");
  }

  let n = parseFloat(m[1]);
  const suffix = m[2];
  
  // Apply multipliers
  if (suffix === "k") n *= 1000;
  if (suffix === "m") n *= 1000000;

  // Floor to integer pounds; ensure non-negative
  n = Math.floor(n);
  if (!(n >= 0)) throw new Error("mrr_parse");
  
  return n;
}

// Test cases for common patterns:
// "£0" → 0
// "Pre-revenue" → 0  
// "£1k–£5k" → 1000
// "1,000 - 5,000" → 1000
// "10k+" → 10000
// "£2.5k" → 2500
// "£1.2m" → 1200000
// "0–999" → 0
// "£25,000+" → 25000