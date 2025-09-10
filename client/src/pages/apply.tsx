import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, Clock, Users, Target, Lightbulb, ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";
import { CityAutocomplete } from "@/components/ui/city-autocomplete";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { validateCity } from "@/lib/cities";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { FieldLabel } from "@/components/ui/field-label";
import { normalizeForSubmit } from "@/lib/submitAdapter";
import { parseMrrLabelToNumber } from "@/lib/mrr";
import { saveDraft, getDraftId, setDraftId, saveLocalSnapshot, fetchDraft, loadLocalSnapshot } from "@/lib/drafts";
import { useLocation } from "wouter";
import { draftApiToForm } from "@/lib/inverseAdapter";

// Single Source of Truth Schema - matches backend exactly with proper coercion
const SubmitSchema = z.object({
  // Personal Information - REQUIRED FIELDS
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  dateOfBirth: z.string().optional(),
  telephoneNumber: z.string().optional(),
  countryOfResidence: z.string().optional(),
  
  // Company Details - REQUIRED FIELDS
  companyName: z.string().trim().min(2, "Company name must be at least 2 characters").max(140, "Company name must be under 140 characters"),
  hqLocation: z.string().trim().min(2, "HQ location must be at least 2 characters").max(120, "HQ location must be under 120 characters").refine(
    (value) => validateCity(value),
    "Please select a valid city from the dropdown"
  ),
  startupStage: z.enum(["Idea", "Prototype/MVP", "Pre-seed", "Seed", "Series A+", "Bootstrapped"], { 
    required_error: "Startup stage is required" 
  }),
  businessModel: z.union([
    z.enum(["B2B", "B2C", "B2E", "B2G", "B2E2C", "B2B2C", "B2G2E"]), // New values
    z.enum(["Marketplace", "SaaS", "Hardware"]) // Legacy values for backwards compatibility
  ]).transform(v => v as any),
  numberOfEmployees: z.string().min(1, "Number of employees is required"),
  monthlyRecurringRevenue: z.preprocess(
    (v) => {
      try {
        return parseMrrLabelToNumber(v);
      } catch {
        return v; // Keep original value for validation error
      }
    },
    z.number().min(0, "Please select a valid MRR option")
  ),
  productName: z.string().optional(),
  coFounders: z.string().optional(),
  investmentRounds: z.number().optional(),
  companyValuation: z.string().optional(),
  plannedRaiseAmount: z.string().optional(),
  plannedRaiseValuation: z.string().optional(),
  
  // Product Information - REQUIRED FIELDS
  problemDescription: z.string().trim().min(20, "Problem statement must be at least 20 characters"),
  problemCauses: z.preprocess(
    v => Array.isArray(v) ? v : (typeof v === "string" && v ? v.split(",").map(s=>s.trim()).filter(Boolean) : []), 
    z.array(z.string().min(1)).min(1, "Select at least one cause")
  ),
  edtechDomains: z.preprocess(
    v => Array.isArray(v) ? v : (typeof v === "string" && v ? v.split(",").map(s=>s.trim()).filter(Boolean) : []),
    z.array(z.string().min(2)).min(1, "Select at least one domain")
  ),
  relevantExperience: z.string().min(1, "Please select your experience level"),
  keyGroupAffected: z.preprocess(
    v => Array.isArray(v) ? v : (typeof v === "string" && v ? v.split(",").map(s=>s.trim()).filter(Boolean) : []),
    z.array(z.string().min(1)).min(1, "Select at least one affected group")
  ),
  problemImpact: z.string().trim().min(20, "Impact description must be at least 20 characters"),
  customerType: z.preprocess(
    v => Array.isArray(v) ? v : (typeof v === "string" && v ? v.split(",").map(s=>s.trim()).filter(Boolean) : []),
    z.array(z.string()).default([])
  ),
  
  // AI Implementation - REQUIRED FIELDS
  aiProblemSolving: z.string().trim().min(20, "AI-specific problem must be at least 20 characters"),
  aiDevelopmentStage: z.enum(["Exploring", "Prototype", "MVP", "In-production", "Scaling"], { 
    required_error: "AI development stage is required" 
  }),
  aiTeamExpertise: z.string().optional(),
  
  // Pitch Deck & Links - REQUIRED FIELDS
  elevatorPitch: z.string().trim().min(20, "Elevator pitch must be at least 20 characters").max(280, "Elevator pitch must be under 280 characters"),
  solutionExplanation: z.string().trim().min(50, "Solution explanation must be at least 50 characters"),
  programGoals: z.string().trim().min(20, "Programme goals must be at least 20 characters"),
  companyWebsite: z.string().optional(),
  pitchDeckLink: z.string().optional(),
  linkedinProfile: z.string().optional(),
  researchEvidence: z.string().optional(),
}).refine(
  // Cross-field validation: Revenue vs Stage
  (data) => {
    try {
      const mrrValue = typeof data.monthlyRecurringRevenue === 'number' 
        ? data.monthlyRecurringRevenue 
        : parseMrrLabelToNumber(data.monthlyRecurringRevenue);
      if (mrrValue > 0) {
        return ["Pre-seed", "Seed", "Series A+", "Bootstrapped"].includes(data.startupStage);
      }
    } catch {
      // If MRR parsing fails, skip this validation
    }
    return true;
  },
  {
    message: "Startups with revenue should be Pre-seed, Seed, Series A+, or Bootstrapped stage",
    path: ["startupStage"]
  }
).refine(
  // Cross-field validation: B2G business model
  (data) => {
    if (data.businessModel === "B2G" && data.keyGroupAffected && data.keyGroupAffected.length > 0) {
      const affectedGroup = Array.isArray(data.keyGroupAffected) 
        ? data.keyGroupAffected.join(" ").toLowerCase()
        : String(data.keyGroupAffected).toLowerCase();
      return affectedGroup.includes("school") || affectedGroup.includes("district") || affectedGroup.includes("ministry") || affectedGroup.includes("government") || affectedGroup.includes("public") || affectedGroup.includes("education") || affectedGroup.includes("university") || affectedGroup.includes("college");
    }
    return true;
  },
  {
    message: "B2G business model should affect educational institutions, schools, districts, or government entities",
    path: ["keyGroupAffected"]
  }
);


// Keep compatibility with existing code
const applicationSchema = SubmitSchema;

type ApplicationForm = z.infer<typeof applicationSchema>;

// Form field options
// Updated enum values to match backend schema
const STARTUP_STAGES = [
  { value: "Idea", label: "Idea" },
  { value: "Prototype/MVP", label: "Prototype/MVP" },
  { value: "Pre-seed", label: "Pre-seed" },
  { value: "Seed", label: "Seed" },
  { value: "Series A+", label: "Series A+" },
  { value: "Bootstrapped", label: "Bootstrapped" }
];

const BUSINESS_MODELS = [
  { value: "B2B", label: "B2B" },
  { value: "B2C", label: "B2C" },
  { value: "B2E", label: "B2E" },
  { value: "B2G", label: "B2G" },
  { value: "B2E2C", label: "B2E2C" },
  { value: "B2B2C", label: "B2B2C" },
  { value: "B2G2E", label: "B2G2E" }
];

const NUMBER_OF_EMPLOYEES = [
  { value: 1, label: "1" },
  { value: 2, label: "2-3" },
  { value: 4, label: "4-10" },
  { value: 11, label: "11-20" },
  { value: 21, label: "21-50" },
  { value: 51, label: "51-100" },
  { value: 101, label: "100+" }
];

const MRR_RANGES = [
  { value: "0", label: "Pre-revenue" },
  { value: "500", label: "Under £500" },
  { value: "1000", label: "£500 - £1,000" },
  { value: "5000", label: "£1,000 - £5,000" },
  { value: "10000", label: "£5,000 - £10,000" },
  { value: "25000", label: "£10,000 - £25,000" },
  { value: "50000", label: "£25,000+" }
];

const PROBLEM_CAUSES = [
  "Lack of Training/Expertise",
  "Lack of focus and vision by entrepreneurs",
  "Lack of Resources (Human): Professional context",
  "Lack of Resources (Financial)",
  "Lack of Social Network: Community, Family, Peer Support",
  "Lack of Political Will",
  "Lack of Resources (Time)",
  "Lack of a technology",
  "Human Bias/Subjectivity hindering diversity/equity/inclusion/fairness",
  "Lack of awareness",
  "Dichotomy of disciplines",
  "Geographic Limitations",
  "Lack of tools"
];

const EDTECH_DOMAINS = [
  "Education Management - Learning Environment (e.g. LMS/VLE)",
  "Education Management - Platforms",
  "Knowledge and Content - Curriculum",
  "International Education - Language Testing",
  "Knowledge and Content - Educational Resources",
  "New Delivery Models - Proprietary Online",
  "Learning Support - Teacher Resources",
  "New Delivery Models - Apps",
  "International Education - Language Learning",
  "Workforce and Talent - Talent Acquisition",
  "Skills and Jobs - Upskilling",
  "Education Management - Classroom technology",
  "Education Management - Admissions Platforms",
  "Experiencing Learning - AI (Voice, Chat, Wearables)",
  "International Education - International Study",
  "Traditional Models - Vocational",
  "Workforce and Talent - Workforce Planning",
  "Experiencing Learning - Games and Simulations",
  "Education Management - Finance",
  "Learning Support - After School Tutoring",
  "Assessment and Verification - Skills Verification",
  "Assessment and Verification - Assessment",
  "Learning Support - Tutoring",
  "Workforce and Talent - Wellness",
  "International Education - Discovery",
  "Workforce and Talent - Capability Development",
  "Skills and Jobs - Mentoring",
  "Experiencing Learning - STEAM/Coding",
  "Assessment and Verification - Career Planning",
  "Assessment and Verification - Portfolio",
  "Experiencing Learning - XR, AR, VR",
  "Knowledge and Content - Peer-to-Peer Q&A Platform"
];

const RELEVANT_EXPERIENCE = [
  { value: "close-to-affected", label: "Close to someone who has been affected" },
  { value: "worked-3-5-years", label: "Worked directly in the field (3 - 5 years)" },
  { value: "worked-5plus-years", label: "Worked directly in the field (> 5 years)" },
  { value: "experience-as-user", label: "Experience as someone affected/target user" },
  { value: "no-experience", label: "No professional experience in specific field/domain" }
];

const KEY_GROUPS_AFFECTED = [
  "EYFS",
  "Grades K - 6 (4 - 11 years)",
  "Grades 7 - 12 (11 - 18 years)",
  "Students in Further Education (FE) or Vocational Learning (16-24 years)",
  "Students in Higher Education (HE) (18-24 years)",
  "Professional Development and Lifelong Learners (not FE or HE) (18+ years)",
  "Teachers EYFS",
  "Teachers (K - 12)",
  "Teachers (FE)",
  "Teachers/Lecturers (HE)",
  "Parents/Guardians/Carers",
  "Other"
];

const CUSTOMER_TYPES = [
  "Students in Further Education (FE) or Vocational Learning (16-24 years)",
  "Students in Higher Education (HE) (18-24 years)",
  "Teachers (K - 12)",
  "Parents/Guardians/Carers",
  "Teachers (FE)",
  "Lecturers and Researchers (Higher Education and Academic Research)",
  "Businesses (SMEs, Start-ups, Corporations)",
  "Professional Development and Lifelong Learners (not FE or HE) (18+ years)",
  "Governments, NGOs, and Public Policy Makers",
  "Other"
];

const EMPLOYEE_COUNT_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2-3", label: "2-3" },
  { value: "4-10", label: "4-10" },
  { value: "11-20", label: "11-20" },
  { value: ">20", label: ">20" }
];

const MRR_OPTIONS = [
  { value: "pre-revenue", label: "Pre-revenue" },
  { value: "<1000", label: "<£1,000" },
  { value: "<5000", label: "<£5,000" },
  { value: "<10000", label: "<£10,000" },
  { value: "<25000", label: "<£25,000" },
  { value: ">25000", label: ">£25,000" }
];

const AI_DEVELOPMENT_STAGES = [
  { value: "Exploring", label: "Exploring AI opportunities (idea stage, no build yet)" },
  { value: "Prototype", label: "Early prototype using off-the-shelf APIs (e.g. OpenAI, AWS, Hugging Face)" },
  { value: "MVP", label: "Working MVP with custom AI components" },
  { value: "In-production", label: "In production with live users" },
  { value: "Scaling", label: "Scaling product with advanced AI infrastructure" }
];

// Multi-step form configuration
const FORM_STEPS = [
  {
    id: 1,
    title: "Personal Information",
    description: "Tell us about yourself",
    icon: Users,
  },
  {
    id: 2,
    title: "Company Details", 
    description: "Your startup information",
    icon: Target,
  },
  {
    id: 3,
    title: "Product Details",
    description: "What you're building",
    icon: Lightbulb,
  },
  {
    id: 4,
    title: "AI Implementation",
    description: "Your AI expertise and approach",
    icon: HelpCircle,
  },
  {
    id: 5,
    title: "Pitch Deck and Links",
    description: "Finalise your application",
    icon: CheckCircle,
  },
];

const SAVE_EXIT_REDIRECT = "/"; // Redirect to homepage after saving

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Draft management state
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState<string | null>(null);
  const [draftId, setDraftIdState] = useState<string | null>(() => getDraftId());

  // Default values - empty strings for required fields so users must fill them out
  const defaultValues: Partial<ApplicationForm> = {
    fullName: "",
    dateOfBirth: "",
    email: "",
    telephoneNumber: "",
    countryOfResidence: "",
    companyName: "",
    productName: "",
    hqLocation: "",
    startupStage: "" as any, // Empty - user must select
    businessModel: "" as any, // Empty - user must select  
    coFounders: "",
    numberOfEmployees: "", // Empty - user must select
    monthlyRecurringRevenue: "pre-revenue" as any, // Default to pre-revenue option
    investmentRounds: 0,
    companyValuation: "",
    plannedRaiseAmount: "",
    plannedRaiseValuation: "",
    problemDescription: "",
    problemCauses: [], // Empty array for multi-select
    edtechDomains: [], // Empty array for multi-select
    relevantExperience: "", // Empty - user must select
    keyGroupAffected: [], // Empty array for multi-select
    problemImpact: "",
    customerType: [], // Empty array for multi-select checkboxes
    aiProblemSolving: "",
    aiTeamExpertise: "",
    aiDevelopmentStage: "" as any, // Empty - user must select
    elevatorPitch: "",
    solutionExplanation: "",
    programGoals: "",
    companyWebsite: "",
    pitchDeckLink: "",
    linkedinProfile: "",
    researchEvidence: "",
  };

  const form = useForm<z.infer<typeof SubmitSchema>>({
    resolver: zodResolver(SubmitSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,             // from draft/server
    shouldUnregister: false,   // keep hidden step values registered
    criteriaMode: "all",
  });

  // Draft restoration effect - loads saved drafts on mount
  React.useEffect(() => {
    let cancelled = false;
    
    (async () => {
      try {
        // 1) Derive draftId from URL params or localStorage
        const params = new URLSearchParams(window.location.search);
        const urlDraftId = params.get("draftId");
        const lsDraftId = getDraftId();
        const draftId = urlDraftId || lsDraftId || undefined;
        
        // Persist draftId to localStorage if found in URL
        if (urlDraftId) {
          setDraftId(urlDraftId);
          setDraftIdState(urlDraftId);
          
          // Clean URL without causing navigation issues
          const url = new URL(window.location.href);
          url.searchParams.delete("draftId");
          url.searchParams.delete("saved");
          window.history.replaceState({}, "", url.toString());
        }

        // 2) Server-first: try to fetch from API
        if (draftId && !cancelled) {
          console.debug("Loading draft from server:", draftId);
          const apiDraft = await fetchDraft(draftId);
          
          if (apiDraft && !cancelled) {
            const formData = draftApiToForm(apiDraft);
            console.debug("Restoring draft data:", formData);
            
            form.reset(formData, { keepDirty: false, keepErrors: false });
            queueMicrotask(() => form.trigger());
            return;
          }
        }

        // 3) Local fallback: load from localStorage snapshot
        if (!cancelled) {
          const snapshot = loadLocalSnapshot();
          if (snapshot) {
            console.debug("Restoring from local snapshot");
            const formData = draftApiToForm(snapshot);
            
            form.reset(formData, { keepDirty: false, keepErrors: false });
            queueMicrotask(() => form.trigger());
          }
        }
        
      } catch (error) {
        // Non-blocking: form stays empty if restoration fails
        if (process.env.NODE_ENV === "development") {
          console.debug("Draft restoration skipped:", error);
        }
      }
    })();
    
    return () => { cancelled = true; };
  }, []); // Only run on mount

  // Simple logic: enable submit button on final step, let form validation handle the rest
  const canSubmit = currentStep === FORM_STEPS.length && !form.formState.isSubmitting;

  // Development diagnostics for form validation debugging
  const errorFields = Object.keys(form.formState.errors || {});
  if (process.env.NODE_ENV === "development" && attempted && !form.formState.isValid) {
    console.debug("Submit disabled; invalid fields:", errorFields);
  }

  const submitMutation = useMutation({
    mutationFn: (data: ApplicationForm) => apiRequest("POST", "/api/applications/submit", data),
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Application Submitted Successfully",
        description: "We'll review your application and get back to you within 5-7 business days.",
      });
    },
    onError: (error: any) => {
      console.error("Submission error:", error);
      
      // Handle validation errors (422)
      if (error.status === 422 && error.issues) {
        const firstError = error.issues[0];
        const fieldName = firstError.path;
        
        // Focus the first invalid field
        const fieldElement = document.querySelector(`[name="${fieldName}"]`) as HTMLElement;
        if (fieldElement) {
          fieldElement.focus();
          fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        toast({
          title: "Validation Failed",
          description: `${firstError.message}. Please check your form and try again.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: error.message || "Please try again or contact support.",
          variant: "destructive",
        });
      }
    },
  });

  // Save & Exit handler - saves current form as draft and navigates away
  const onSaveAndExit = async () => {
    console.debug("Save & Exit clicked");
    setSaveErr(null);
    setSaving(true);
    
    // Use getValues to get current form data without validation
    const values = form.getValues();
    console.debug("Form values to save:", values);
    
    try {
      console.debug("Calling saveDraft with draftId:", draftId);
      const response = await saveDraft(values, draftId ?? undefined);
      console.debug("Draft save response:", response);
      
      const id = response.application?.id;
      
      if (id) {
        console.debug("Saving draft ID to localStorage:", id);
        setDraftId(String(id));
        setDraftIdState(String(id));
        
        toast({
          title: "Draft Saved",
          description: "Your application has been saved as a draft.",
        });
        
        // Navigate away after successful save with URL hand-off
        setLocation(`${SAVE_EXIT_REDIRECT}?saved=1&draftId=${encodeURIComponent(String(id))}`);
      } else {
        console.warn("No ID returned from server, saving locally");
        // Fallback: save local snapshot if server didn't return ID
        saveLocalSnapshot(values);
        
        toast({
          title: "Draft Saved Locally", 
          description: "Saved to your browser - will sync when reconnected.",
        });
        
        setLocation(SAVE_EXIT_REDIRECT);
      }
      
    } catch (error: any) {
      console.error("Draft save error:", error);
      
      // Local fallback: save snapshot even if server failed
      try {
        saveLocalSnapshot(values);
        console.debug("Local snapshot saved successfully");
      } catch (snapError) {
        console.warn("Failed to save local snapshot:", snapError);
      }
      
      setSaveErr("Couldn't sync draft. Saved locally—please reconnect and try again.");
    } finally {
      setSaving(false);
    }
  };

  const onSubmit = async (data: ApplicationForm) => {
    // Block premature submissions - only allow on final step
    if (currentStep !== FORM_STEPS.length) {
      toast({
        title: "Please Complete All Steps",
        description: `You're currently on step ${currentStep} of ${FORM_STEPS.length}. Please complete all steps before submitting.`,
        variant: "destructive",
      });
      return;
    }
    
    // Validate all required fields before submission
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Please Complete Required Fields",
        description: "Some required fields are missing or invalid. Please review the form.",
        variant: "destructive",
      });
      setAttempted(true);
      return;
    }
    
    // Normalize payload using submit adapter before API call
    try {
      const normalizedPayload = normalizeForSubmit(data);
      submitMutation.mutate(normalizedPayload);
    } catch (error: any) {
      // Handle adapter validation errors with specific field targeting
      if (error.message === "mrr_parse" || error.message === "mrr_required") {
        form.setError("monthlyRecurringRevenue", { 
          type: "manual", 
          message: "Select a valid MRR option" 
        });
      } else if (error.message === "relevantExperience_required") {
        form.setError("relevantExperience", { 
          type: "manual", 
          message: "Please select your experience level" 
        });
      } else if (error.message === "problemCauses_required") {
        form.setError("problemCauses", { 
          type: "manual", 
          message: "Please select at least one problem cause" 
        });
      } else if (error.message === "keyGroupAffected_required") {
        form.setError("keyGroupAffected", { 
          type: "manual", 
          message: "Please specify the affected group" 
        });
      } else {
        // Fallback error handling
        toast({
          title: "Submission Error",
          description: "Please check your form data and try again.",
          variant: "destructive",
        });
      }
      setAttempted(true);
    }
  };
  
  // Remove this function - we'll handle it inline

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    const formData = new FormData();
    
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/upload-research', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      if (result.success) {
        const fileNames = result.files.map((f: any) => f.originalName);
        setUploadedFiles(prev => [...prev, ...fileNames]);
        
        // Update form field with uploaded file names
        const currentValue = form.getValues('researchEvidence') || '';
        const newValue = currentValue 
          ? `${currentValue}\n\nUploaded files: ${fileNames.join(', ')}`
          : `Uploaded files: ${fileNames.join(', ')}`;
        form.setValue('researchEvidence', newValue);
        
        toast({
          title: "Files uploaded successfully",
          description: `${fileNames.length} file(s) uploaded`,
        });
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < FORM_STEPS.length) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progressPercentage = (currentStep / FORM_STEPS.length) * 100;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Application Submitted Successfully</CardTitle>
              <CardDescription className="text-lg">
                Thank you for applying to UCL EdTech Labs. We've received your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  <strong>Next Steps:</strong> Our team will review your application within 5-7 business days. 
                  You'll receive an email confirmation shortly and hear back from us by [DATE].
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4 text-left">
                <h3 className="font-semibold text-gray-900">What happens next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="bg-[#e57c00] text-white">1</Badge>
                    <div>
                      <p className="font-medium">Application Review</p>
                      <p className="text-sm text-gray-600">Our academic panel reviews your submission</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="bg-[#e57c00] text-white">2</Badge>
                    <div>
                      <p className="font-medium">Initial Assessment</p>
                      <p className="text-sm text-gray-600">We evaluate fit with our evidence-based methodology</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="bg-[#e57c00] text-white">3</Badge>
                    <div>
                      <p className="font-medium">Interview Invitation</p>
                      <p className="text-sm text-gray-600">Successful candidates invited for virtual interview</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <p className="text-sm text-gray-600 mb-4">
                  Questions about your application? Contact us at{" "}
                  <a href="mailto:info@ucledtechlabs.com" className="text-[#e57c00] hover:underline">
                    info@ucledtechlabs.com
                  </a>
                </p>
                <Button 
                  onClick={() => window.location.href = "/"} 
                  className="bg-[#e57c00] text-white hover:bg-orange-600"
                >
                  Return to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Apply to UCL EdTech Labs
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our evidence-based accelerator program and transform education through rigorous research and academic methodology.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {FORM_STEPS.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {FORM_STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div
                  key={step.id}
                  className={`text-center p-4 rounded-lg border transition-colors ${
                    isActive
                      ? "bg-[#e57c00] text-white border-[#e57c00]"
                      : isCompleted
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <h3 className="font-medium text-sm">{step.title}</h3>
                  <p className="text-xs opacity-75">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {React.createElement(FORM_STEPS[currentStep - 1].icon, { className: "w-5 h-5 text-[#e57c00]" })}
              <span>{FORM_STEPS[currentStep - 1].title}</span>
            </CardTitle>
            <CardDescription>
              {FORM_STEPS[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit, () => setAttempted(true))} 
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && currentStep !== FORM_STEPS.length) {
                    e.preventDefault();
                    toast({
                      title: "Use Continue Button",
                      description: "Press 'Continue' to proceed to the next step.",
                      variant: "default",
                    });
                  }
                }}
                className="space-y-6"
              >
                {/* Required fields legend */}
                <div className="text-sm text-muted-foreground border-l-4 border-red-600 pl-4 py-2 bg-red-50 dark:bg-red-950/20">
                  <span className="font-medium">Fields marked </span>
                  <span aria-hidden="true" className="required-star">*</span>
                  <span className="font-medium"> are required.</span>
                </div>
                
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-1">
                            <span>Full Name</span>
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-1">
                            <span>Email</span>
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="telephoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telephone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+44 20 1234 5678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="countryOfResidence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country of Residence</FormLabel>
                          <FormControl>
                            <CityAutocomplete
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Select your country"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 2: Company Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="companyName" required className="font-medium">
                            Company Name
                          </FieldLabel>
                          <FormControl>
                            <Input id="companyName" placeholder="Your company name" required aria-required="true" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="productName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name (if different from Company name)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your product name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hqLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="hqLocation" required className="font-medium">
                            HQ Location
                          </FieldLabel>
                          <FormControl>
                            <CityAutocomplete
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Select your headquarters location"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startupStage"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="startupStage" required className="font-medium">
                            Startup Stage
                          </FieldLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger id="startupStage" aria-required="true">
                                <SelectValue placeholder="Select your startup stage" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {STARTUP_STAGES.map((stage) => (
                                <SelectItem key={stage.value} value={stage.value}>
                                  {stage.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="businessModel"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="businessModel" required className="font-medium">
                            Business Model
                          </FieldLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger id="businessModel" aria-required="true">
                                <SelectValue placeholder="Select your business model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {BUSINESS_MODELS.map((model) => (
                                <SelectItem key={model.value} value={model.value}>
                                  {model.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="coFounders"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Please list all co-founders and their expertise</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="John Smith - CTO, 10 years software development&#10;Jane Doe - CMO, 5 years EdTech marketing"
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            List each co-founder on a new line with their name, role, and relevant expertise
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="numberOfEmployees"
                        render={({ field }) => (
                          <FormItem>
                            <FieldLabel htmlFor="numberOfEmployees" required className="font-medium">
                              Number of employees
                            </FieldLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger id="numberOfEmployees" aria-required="true">
                                  <SelectValue placeholder="Select employee count" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {EMPLOYEE_COUNT_OPTIONS.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="monthlyRecurringRevenue"
                        render={({ field }) => (
                          <FormItem>
                            <FieldLabel htmlFor="monthlyRecurringRevenue" required className="font-medium">
                              Monthly Recurring Revenue (MRR) - GBP
                            </FieldLabel>
                            <Select onValueChange={(value) => field.onChange(value)} value={String(field.value || "")}>
                              <FormControl>
                                <SelectTrigger id="monthlyRecurringRevenue" aria-required="true">
                                  <SelectValue placeholder="Select MRR range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {MRR_OPTIONS.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="investmentRounds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total number of investment rounds closed</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="2" 
                                {...field}
                                value={field.value || ""}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companyValuation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company valuation at last investment round (GBP)</FormLabel>
                            <FormControl>
                              <Input placeholder="5000000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="plannedRaiseAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>If currently planning on raising, how much?</FormLabel>
                            <FormControl>
                              <Input placeholder="1000000" {...field} />
                            </FormControl>
                            <FormDescription>Amount in GBP</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="plannedRaiseValuation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>At what company valuation?</FormLabel>
                            <FormControl>
                              <Input placeholder="10000000" {...field} />
                            </FormControl>
                            <FormDescription>Valuation in GBP</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Problem & Solution */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="problemDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="problemDescription" required className="font-medium">
                            What is the problem your product/startup is trying to solve?
                          </FieldLabel>
                          <FormControl>
                            <Textarea 
                              id="problemDescription"
                              placeholder="Describe the specific problem you're addressing in education..."
                              className="min-h-[120px]"
                              required
                              aria-required="true"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="problemCauses"
                      render={() => (
                        <FormItem>
                          <FieldLabel htmlFor="problemCauses" required className="font-medium">
                            What are the key causes of the problem you identify above?
                          </FieldLabel>
                          <FormDescription className="mb-4">
                            Select all that apply
                          </FormDescription>
                          <div className="space-y-3 max-h-64 overflow-y-auto border rounded-md p-4">
                            {PROBLEM_CAUSES.map((cause) => (
                              <FormField
                                key={cause}
                                control={form.control}
                                name="problemCauses"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={cause}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(cause)}
                                          onCheckedChange={(checked) => {
                                            const currentValue = Array.isArray(field.value) ? field.value : [];
                                            return checked
                                              ? field.onChange([...currentValue, cause])
                                              : field.onChange(
                                                  currentValue.filter(
                                                    (value) => value !== cause
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal leading-5">
                                        {cause}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="edtechDomains"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="edtechDomains" required className="font-medium">
                            What field(s) or domain(s) is your edtech product in?
                          </FieldLabel>
                          <FormControl>
                            <div>
                              <FormDescription className="mb-4">
                                Please choose as many answers as applicable. For more information on the domains, please see HolonIQ 2021 Global Learning Landscape
                              </FormDescription>
                              <div className="space-y-3 max-h-80 overflow-y-auto border rounded-md p-4">
                                {EDTECH_DOMAINS.map((domain) => (
                                  <div
                                    key={domain}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <Checkbox
                                      checked={field.value?.includes(domain)}
                                      onCheckedChange={(checked) => {
                                        const currentValue = Array.isArray(field.value) ? field.value : [];
                                        return checked
                                          ? field.onChange([...currentValue, domain])
                                          : field.onChange(
                                              currentValue.filter(
                                                (value) => value !== domain
                                              )
                                            )
                                      }}
                                    />
                                    <label className="text-sm font-normal leading-5">
                                      {domain}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="relevantExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="relevantExperience" required className="font-medium">
                            What relevant experience do you and your key colleague(s) have in the field/domain that your edtech product is in?
                          </FieldLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger id="relevantExperience" aria-required="true">
                                <SelectValue placeholder="Select your experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {RELEVANT_EXPERIENCE.map((exp) => (
                                <SelectItem key={exp.value} value={exp.value}>
                                  {exp.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="keyGroupAffected"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="keyGroupAffected" required className="font-medium">
                            Who is the key group affected by the problem you identified above?
                          </FieldLabel>
                          <Select onValueChange={(value) => field.onChange([value])} defaultValue={field.value?.[0]}>
                            <FormControl>
                              <SelectTrigger id="keyGroupAffected" aria-required="true">
                                <SelectValue placeholder="Select the primary group affected" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {KEY_GROUPS_AFFECTED.map((group) => (
                                <SelectItem key={group} value={group}>
                                  {group}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="problemImpact"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="problemImpact" required className="font-medium">
                            How has your identified problem negatively impacted the key group you selected above?
                          </FieldLabel>
                          <FormControl>
                            <Textarea 
                              id="problemImpact"
                              placeholder="Describe the specific negative impacts..."
                              className="min-h-[120px]"
                              required
                              aria-required="true"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customerType"
                      render={() => (
                        <FormItem>
                          <FormLabel>Who is your customer, if different from the end user?</FormLabel>
                          <FormDescription className="mb-4">
                            Select all that apply
                          </FormDescription>
                          <div className="space-y-3 max-h-64 overflow-y-auto border rounded-md p-4">
                            {CUSTOMER_TYPES.map((customer) => (
                              <FormField
                                key={customer}
                                control={form.control}
                                name="customerType"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={customer}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(customer)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, customer])
                                              : field.onChange(
                                                  field.value.filter(
                                                    (value) => value !== customer
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal leading-5">
                                        {customer}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 4: AI Implementation */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="aiProblemSolving"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="aiProblemSolving" required className="font-medium">
                            What specific problem does AI help you solve that couldn't be solved otherwise?
                          </FieldLabel>
                          <FormControl>
                            <Textarea 
                              id="aiProblemSolving"
                              placeholder="Explain the specific educational problem that AI uniquely addresses in your solution..."
                              className="min-h-[150px]"
                              required
                              aria-required="true"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="aiTeamExpertise"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Outline your team's AI expertise (e.g. technical roles, academic/industry background, prior projects)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your team's AI capabilities, relevant education, work experience, and previous AI projects..."
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="aiDevelopmentStage"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="aiDevelopmentStage" required className="font-medium">
                            What best describes your AI development stage?
                          </FieldLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger id="aiDevelopmentStage" aria-required="true">
                                <SelectValue placeholder="Select your current AI development stage" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {AI_DEVELOPMENT_STAGES.map((stage) => (
                                <SelectItem key={stage.value} value={stage.value}>
                                  {stage.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 5: Review & Submit */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="elevatorPitch"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="elevatorPitch" required className="font-medium">
                            What is your elevator pitch?
                          </FieldLabel>
                          <FormControl>
                            <Textarea 
                              id="elevatorPitch"
                              placeholder="In 2-3 sentences, describe your startup and what makes it unique..."
                              className="min-h-[100px]"
                              required
                              aria-required="true"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="solutionExplanation"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="solutionExplanation" required className="font-medium">
                            Explain in detail how your product fixes/solves the problem you identified previously
                          </FieldLabel>
                          <FormControl>
                            <Textarea 
                              id="solutionExplanation"
                              placeholder="Provide a detailed explanation of your solution approach..."
                              className="min-h-[150px]"
                              required
                              aria-required="true"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="programGoals"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel htmlFor="programGoals" required className="font-medium">
                            What would you like to achieve by taking part in this programme?
                          </FieldLabel>
                          <FormControl>
                            <Textarea 
                              id="programGoals"
                              placeholder="Describe your specific goals and what you hope to gain from the program..."
                              className="min-h-[120px]"
                              required
                              aria-required="true"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyWebsite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourcompany.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pitchDeckLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Please link your current pitch deck</FormLabel>
                          <FormControl>
                            <Input placeholder="https://drive.google.com/..." {...field} />
                          </FormControl>
                          <FormDescription>
                            Share a Google Drive, Dropbox, or similar link to your pitch deck
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="linkedinProfile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn profile</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="researchEvidence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Research Evidence</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <Textarea 
                                placeholder="Provide links to research papers or attach evidence that supports your product's educational impact, underlying theories, or problem definition."
                                className="min-h-[100px]"
                                {...field} 
                              />
                              <div 
                                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                                  isUploading 
                                    ? 'border-blue-400 bg-blue-50' 
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const files = e.dataTransfer.files;
                                  if (files.length > 0) {
                                    handleFileUpload(files);
                                  }
                                }}
                                onDragOver={(e) => e.preventDefault()}
                                onDragEnter={(e) => e.preventDefault()}
                              >
                                <input
                                  type="file"
                                  multiple
                                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                                  className="hidden"
                                  id="research-evidence-upload"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                      handleFileUpload(e.target.files);
                                    }
                                  }}
                                  disabled={isUploading}
                                />
                                <label 
                                  htmlFor="research-evidence-upload"
                                  className={`cursor-pointer flex flex-col items-center space-y-2 ${
                                    isUploading ? 'pointer-events-none' : ''
                                  }`}
                                >
                                  {isUploading ? (
                                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                  )}
                                  <span className="text-sm text-gray-600">
                                    {isUploading 
                                      ? 'Uploading files...' 
                                      : 'Click to upload files or drag and drop'
                                    }
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    PDF, DOC, DOCX, TXT, PNG, JPG (Max 10MB each)
                                  </span>
                                </label>
                                
                                {uploadedFiles.length > 0 && (
                                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                                    <p className="text-sm font-medium text-green-800 mb-2">Uploaded files:</p>
                                    <ul className="text-xs text-green-700 space-y-1">
                                      {uploadedFiles.map((fileName, index) => (
                                        <li key={index} className="flex items-center space-x-1">
                                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                          </svg>
                                          <span>{fileName}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Attach or link research papers that evidence your product's potential educational impact, support the theory(ies) that your product is based on or describe the problem you are aiming to solve.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* GDPR Compliance Notice */}
                    <Alert>
                      <HelpCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Data Privacy Notice:</strong> By submitting this application, you consent to UCL EdTech Labs 
                        processing your personal data for the purpose of evaluating your application and communicating with you 
                        about our program. Your data will be stored securely and will not be shared with third parties without 
                        your consent. You have the right to access, modify, or delete your data at any time by contacting us at 
                        privacy@ucledtechlabs.com.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                <Separator />

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2 order-2 sm:order-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Button>

                  <div className="flex flex-col sm:flex-row items-center gap-3 order-1 sm:order-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("Save & Exit button clicked");
                        onSaveAndExit();
                      }}
                      disabled={saving}
                      className="w-full sm:w-auto"
                    >
                      {saving ? "Saving…" : "Save & Exit"}
                    </Button>
                    {saveErr && (
                      <p role="alert" className="text-sm text-red-600 text-center">
                        {saveErr}
                      </p>
                    )}
                    
                    {currentStep < FORM_STEPS.length ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-[#e57c00] text-white hover:bg-orange-600 flex items-center space-x-2 w-full sm:w-auto"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Button
                          type="submit"
                          disabled={!canSubmit}
                          className="bg-[#e57c00] text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                        >
                          {submitMutation.isPending ? "Submitting..." : "Submit Application"}
                        </Button>
                        {attempted && !form.formState.isValid && (
                          <p role="alert" className="text-sm text-red-600 text-center">
                            Please complete all required fields to submit your application.
                          </p>
                        )}

                        {/* Development diagnostic banner */}
                        {process.env.NODE_ENV === "development" && attempted && !form.formState.isValid && errorFields.length > 0 && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <div className="text-xs font-medium text-yellow-800 mb-1">
                              🛠️ Development Diagnostics
                            </div>
                            <div className="text-xs text-yellow-700">
                              <strong>Invalid fields ({errorFields.length}):</strong> {errorFields.join(", ")}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Application Questions</h4>
                <p className="text-gray-600">
                  Questions about the program? Contact{" "}
                  <a href="mailto:info@ucledtechlabs.com" className="text-[#e57c00] hover:underline">
                    info@ucledtechlabs.com
                  </a>
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Save Progress</h4>
                <p className="text-gray-600">
                  Your progress is automatically saved. You can return anytime to complete your application.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}