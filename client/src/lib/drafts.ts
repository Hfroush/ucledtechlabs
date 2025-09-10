// Draft service for saving and loading application drafts
import { apiRequest } from "@/lib/queryClient";

export interface DraftResponse {
  success: boolean;
  application: {
    id: number;
    [key: string]: any;
  };
}

export async function saveDraft(payload: any, draftId?: string): Promise<DraftResponse> {
  if (draftId) {
    // Update existing draft
    const response = await apiRequest("PATCH", `/api/applications/draft/${draftId}`, { ...payload, status: "draft" });
    return await response.json() as DraftResponse;
  }
  
  // Create new draft
  const response = await apiRequest("POST", "/api/applications/draft", { ...payload, status: "draft" });
  return await response.json() as DraftResponse;
}

export async function fetchDraft(draftId: string): Promise<any | null> {
  try {
    const response = await apiRequest("GET", `/api/applications/draft/${draftId}`);
    const data = await response.json();
    return data.success ? data.application : null;
  } catch (error) {
    console.warn("Failed to fetch draft from server:", error);
    return null;
  }
}

// Local storage utilities
export function getDraftId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("applicationDraftId");
}

export function setDraftId(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("applicationDraftId", id);
}

export function clearDraftId(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("applicationDraftId");
  localStorage.removeItem("applicationDraftSnapshot");
}

export function saveLocalSnapshot(values: any): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("applicationDraftSnapshot", JSON.stringify(values));
  } catch (error) {
    console.warn("Failed to save local snapshot:", error);
  }
}

export function loadLocalSnapshot(): any | null {
  if (typeof window === "undefined") return null;
  try {
    const snapshot = localStorage.getItem("applicationDraftSnapshot");
    return snapshot ? JSON.parse(snapshot) : null;
  } catch (error) {
    console.warn("Failed to load local snapshot:", error);
    return null;
  }
}