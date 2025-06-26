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
import { CheckCircle, Clock, Users, Target, Lightbulb, ArrowLeft, ArrowRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// Application schema will be defined here
const applicationSchema = z.object({
  // Basic fields for now - we'll add the detailed fields next
  email: z.string().email("Please enter a valid email address"),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

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
      email: "",
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Placeholder for form fields - we'll add these next */}
              <div className="text-center py-16 text-gray-500">
                <p>Form fields for {FORM_STEPS[currentStep - 1].title} will be added here</p>
                <p className="text-sm mt-2">Step {currentStep} content coming next</p>
              </div>

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