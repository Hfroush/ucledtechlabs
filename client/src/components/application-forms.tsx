import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CityAutocomplete } from "@/components/ui/city-autocomplete";
import { validateCity } from "@/lib/cities";

const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  program: z.string().min(1, "Please select a program"),
  startupName: z.string().min(1, "Startup name is required"),
  stage: z.string().min(1, "Please select development stage"),
  description: z.string().min(10, "Please provide a detailed description (min 10 characters)"),
  teamSize: z.string().optional(),
});

const interestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  startupName: z.string().min(1, "Startup name is required"),
  hqLocation: z.string().min(1, "HQ location is required").refine(
    (value) => validateCity(value),
    "Please select a valid city from the dropdown"
  ),
  currentStatus: z.string().optional(),
  areasOfInterest: z.string().optional(),
  receiveUpdates: z.boolean().default(false),
});

type ApplicationForm = z.infer<typeof applicationSchema>;
type InterestForm = z.infer<typeof interestSchema>;

export default function ApplicationForms() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const applicationForm = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      program: "",
      startupName: "",
      stage: "",
      description: "",
      teamSize: "",
    },
  });

  const interestForm = useForm<InterestForm>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      startupName: "",
      hqLocation: "",
      currentStatus: "",
      areasOfInterest: "",
      receiveUpdates: false,
    },
  });

  const applicationMutation = useMutation({
    mutationFn: (data: ApplicationForm) => apiRequest("POST", "/api/applications", data),
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your application. We'll be in touch soon.",
      });
      applicationForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Please try again later.",
      });
    },
  });

  const interestMutation = useMutation({
    mutationFn: (data: InterestForm) => apiRequest("POST", "/api/interest-registrations", data),
    onSuccess: () => {
      toast({
        title: "Interest Registered!",
        description: "We'll notify you when applications open for future cohorts.",
      });
      interestForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/interest-registrations"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Please try again later.",
      });
    },
  });

  const onApplicationSubmit = (data: ApplicationForm) => {
    applicationMutation.mutate(data);
  };

  const onInterestSubmit = (data: InterestForm) => {
    interestMutation.mutate(data);
  };

  return (
    <section id="apply" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Register Your Interest</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get notified about upcoming cohorts and be first to apply when applications open. We're looking for passionate founders ready to transform education.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Interest Registration Form */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Register Your Interest</h3>
              <p className="text-gray-600">Get notified about future programs and be first to apply when applications open.</p>
              <div className="flex items-center mt-4">
                <span className="w-3 h-3 bg-accent rounded-full mr-2"></span>
                <Badge className="bg-accent text-gray-900">Applications Opening Soon</Badge>
              </div>
            </div>

            <Form {...interestForm}>
              <form onSubmit={interestForm.handleSubmit(onInterestSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={interestForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={interestForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={interestForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={interestForm.control}
                  name="startupName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Startup Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your startup name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={interestForm.control}
                  name="hqLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HQ Location *</FormLabel>
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
                  control={interestForm.control}
                  name="currentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select current status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="exploring">Exploring Ideas</SelectItem>
                          <SelectItem value="developing">Developing Solution</SelectItem>
                          <SelectItem value="validating">Market Validation</SelectItem>
                          <SelectItem value="launched">Already Launched</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={interestForm.control}
                  name="areasOfInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is the most important challenge your organisation is attempting to solve?</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={3} 
                          placeholder="Describe the key challenge your organization is working to address in education" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={interestForm.control}
                  name="receiveUpdates"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">I'd like to receive updates about UCL Edtech Labs programs, events, and educational resources.</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-accent text-gray-900 py-4 font-bold text-lg hover:bg-yellow-500"
                  disabled={interestMutation.isPending}
                >
                  {interestMutation.isPending ? "Registering..." : "Register Interest"}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  We'll notify you when applications open for future cohorts.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
