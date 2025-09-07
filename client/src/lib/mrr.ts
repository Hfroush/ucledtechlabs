// MRR Parser - Convert dropdown labels to numeric values
// Handles currency symbols, commas, k/m suffixes, ranges, and plus signs

export function parseMrrLabelToNumber(v: unknown): number {
  if (typeof v === "number" && v >= 0) return v;
  if (v == null || v === "") throw new Error("mrr_required");

  const s = String(v).toLowerCase().trim();

  // Handle our specific MRR dropdown values
  if (s === "pre-revenue") return 0;
  if (s === "<1000") return 0;          // Less than £1,000
  if (s === "<5000") return 1000;       // £1,000-£4,999 range
  if (s === "<10000") return 5000;      // £5,000-£9,999 range  
  if (s === "<25000") return 10000;     // £10,000-£24,999 range
  if (s === ">25000") return 25000;     // £25,000+ range

  // Handle comparison operators with numbers
  const lessThanMatch = s.match(/^<(\d+)$/);
  if (lessThanMatch) {
    const threshold = parseInt(lessThanMatch[1], 10);
    // Return a safe lower bound based on common thresholds
    if (threshold <= 1000) return 0;
    if (threshold <= 5000) return 1000;
    if (threshold <= 10000) return 5000;
    if (threshold <= 25000) return 10000;
    return Math.max(0, threshold - 5000); // Generic fallback
  }

  const greaterThanMatch = s.match(/^>(\d+)$/);
  if (greaterThanMatch) {
    return parseInt(greaterThanMatch[1], 10);
  }

  // Fallback: parse general currency labels
  let normalized = s
    .replace(/gbp|£|per\s*month|\/mo|\/month/g, "") // remove currency words/symbols
    .replace(/,/g, "")                               // strip thousands separators
    .trim();

  // Handle special cases
  if (normalized === "0" || normalized === "none") return 0;

  // Split ranges "a-b", "a–b", "a to b" -> take lower bound
  const firstPart = normalized.split(/(?:-|–|to)/)[0].trim();

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