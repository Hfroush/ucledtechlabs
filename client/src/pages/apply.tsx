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

// Comprehensive application schema with all required fields
const applicationSchema = z.object({
  // Personal Information
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  telephoneNumber: z.string().optional(),
  countryOfResidence: z.string().optional(),
  
  // Company Details
  companyName: z.string().optional(),
  productName: z.string().optional(),
  hqLocation: z.string().optional().refine(
    (value) => !value || validateCity(value),
    "Please select a valid city from the dropdown"
  ),
  startupStage: z.enum(["idea", "prototype", "mvp", "go-to-market", "product-market-fit", "investment", "scaling"]).optional(),
  businessModel: z.enum(["b2b", "b2c", "b2e", "b2g", "b2e2c", "b2b2c", "b2g2e"]).optional(),
  coFounders: z.string().optional(),
  numberOfEmployees: z.string().optional(),
  monthlyRecurringRevenue: z.string().optional(),
  investmentRounds: z.number().optional(),
  companyValuation: z.string().optional(),
  plannedRaiseAmount: z.string().optional(),
  plannedRaiseValuation: z.string().optional(),
  
  // Product Information
  problemDescription: z.string().optional(),
  problemCauses: z.array(z.string()).default([]),
  edtechDomains: z.array(z.string()).default([]),
  relevantExperience: z.string().optional(),
  keyGroupAffected: z.array(z.string()).default([]),
  problemImpact: z.string().optional(),
  customerType: z.array(z.string()).default([]),
  elevatorPitch: z.string().optional(),
  solutionExplanation: z.string().optional(),
  programGoals: z.string().optional(),
  companyWebsite: z.string().optional(),
  pitchDeckLink: z.string().optional(),
  linkedinProfile: z.string().optional(),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

// Form field options
const STARTUP_STAGES = [
  { value: "idea", label: "Idea" },
  { value: "prototype", label: "Prototype" },
  { value: "mvp", label: "MVP" },
  { value: "go-to-market", label: "Go-to-market" },
  { value: "product-market-fit", label: "Product-market fit" },
  { value: "investment", label: "Investment" },
  { value: "scaling", label: "Scaling" }
];

const BUSINESS_MODELS = [
  { value: "b2b", label: "B2B" },
  { value: "b2c", label: "B2C" },
  { value: "b2e", label: "B2E" },
  { value: "b2g", label: "B2G" },
  { value: "b2e2c", label: "B2E2C" },
  { value: "b2b2c", label: "B2B2C" },
  { value: "b2g2e", label: "B2G2E" }
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
    title: "Problem & Solution",
    description: "What you're building",
    icon: Lightbulb,
  },
  {
    id: 4,
    title: "Review & Submit",
    description: "Confirm your application",
    icon: CheckCircle,
  },
];

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      email: "",
      telephoneNumber: "",
      countryOfResidence: "",
      companyName: "",
      productName: "",
      hqLocation: "",
      coFounders: "",
      numberOfEmployees: "",
      monthlyRecurringRevenue: "",
      investmentRounds: 0,
      companyValuation: "",
      plannedRaiseAmount: "",
      plannedRaiseValuation: "",
      problemDescription: "",
      problemCauses: [],
      edtechDomains: [],
      keyGroupAffected: [],
      problemImpact: "",
      customerType: [],
      elevatorPitch: "",
      solutionExplanation: "",
      programGoals: "",
      companyWebsite: "",
      pitchDeckLink: "",
      linkedinProfile: "",
    },
    mode: "onChange",
  });

  const submitMutation = useMutation({
    mutationFn: (data: ApplicationForm) => apiRequest("POST", "/api/applications", data),
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Application Submitted Successfully",
        description: "We'll review your application and get back to you within 5-7 business days.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ApplicationForm) => {
    submitMutation.mutate(data);
  };

  const nextStep = () => {
    if (currentStep < FORM_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
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
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
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
                          <FormLabel>HQ Location</FormLabel>
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
                          <FormLabel>Startup Stage</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
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
                          <FormLabel>Business Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
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
                            <FormLabel>Number of employees</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
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
                            <FormLabel>Monthly Recurring Revenue (MRR) - GBP</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
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
                          <FormLabel>What is the problem your product/startup is trying to solve?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the specific problem you're addressing in education..."
                              className="min-h-[120px]"
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
                          <FormLabel>What are the key causes of the problem you identify above?</FormLabel>
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
                                            return checked
                                              ? field.onChange([...field.value, cause])
                                              : field.onChange(
                                                  field.value.filter(
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
                      render={() => (
                        <FormItem>
                          <FormLabel>What field(s) or domain(s) is your edtech product in?</FormLabel>
                          <FormDescription className="mb-4">
                            Please choose as many answers as applicable. For more information on the domains, please see HolonIQ 2021 Global Learning Landscape
                          </FormDescription>
                          <div className="space-y-3 max-h-80 overflow-y-auto border rounded-md p-4">
                            {EDTECH_DOMAINS.map((domain) => (
                              <FormField
                                key={domain}
                                control={form.control}
                                name="edtechDomains"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={domain}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(domain)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, domain])
                                              : field.onChange(
                                                  field.value.filter(
                                                    (value) => value !== domain
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal leading-5">
                                        {domain}
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
                      name="relevantExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            What relevant experience do you and your key colleague(s) have in the field/domain that your edtech product is in?
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
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
                      render={() => (
                        <FormItem>
                          <FormLabel>Who is the key group affected by the problem you identified above?</FormLabel>
                          <FormDescription className="mb-4">
                            Select all that apply
                          </FormDescription>
                          <div className="space-y-3 max-h-64 overflow-y-auto border rounded-md p-4">
                            {KEY_GROUPS_AFFECTED.map((group) => (
                              <FormField
                                key={group}
                                control={form.control}
                                name="keyGroupAffected"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={group}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(group)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, group])
                                              : field.onChange(
                                                  field.value.filter(
                                                    (value) => value !== group
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal leading-5">
                                        {group}
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
                      name="problemImpact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How has your identified problem negatively impacted the key group you selected above?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the specific negative impacts..."
                              className="min-h-[120px]"
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

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="elevatorPitch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What is your elevator pitch?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="In 2-3 sentences, describe your startup and what makes it unique..."
                              className="min-h-[100px]"
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
                          <FormLabel>Explain in detail how your product fixes/solves the problem you identified above</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide a detailed explanation of your solution approach..."
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
                      name="programGoals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What would you like to achieve by taking part in this programme?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your specific goals and what you hope to gain from the program..."
                              className="min-h-[120px]"
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
                <div className="flex justify-between items-center pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Button>

                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.location.href = "/"}
                    >
                      Save & Exit
                    </Button>
                    
                    {currentStep < FORM_STEPS.length ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-[#e57c00] text-white hover:bg-orange-600 flex items-center space-x-2"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={submitMutation.isPending}
                        className="bg-[#e57c00] text-white hover:bg-orange-600"
                      >
                        {submitMutation.isPending ? "Submitting..." : "Submit Application"}
                      </Button>
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
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Technical Support</h4>
                <p className="text-gray-600">
                  Having trouble with the form? Email us at{" "}
                  <a href="mailto:tech@ucledtechlabs.com" className="text-[#e57c00] hover:underline">
                    tech@ucledtechlabs.com
                  </a>
                </p>
              </div>
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