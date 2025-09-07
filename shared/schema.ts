import { pgTable, text, serial, integer, boolean, timestamp, date, decimal, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  
  // Application Status
  status: text("status", { enum: ["draft", "submitted"] }).default("draft").notNull(),
  
  // Personal Information
  fullName: text("full_name").notNull(),
  dateOfBirth: date("date_of_birth"),
  email: text("email").notNull(),
  telephoneNumber: text("telephone_number"),
  countryOfResidence: text("country_of_residence"),
  
  // Company Details - Updated enums and constraints
  companyName: text("company_name"),
  productName: text("product_name"),
  hqLocation: text("hq_location"),
  startupStage: text("startup_stage", { 
    enum: ["Idea", "Prototype/MVP", "Pre-seed", "Seed", "Series A+", "Bootstrapped"] 
  }),
  businessModel: text("business_model", { 
    enum: ["B2B", "B2C", "B2B2C", "B2G", "Marketplace", "SaaS", "Hardware"] 
  }),
  coFounders: text("co_founders"),
  numberOfEmployees: integer("number_of_employees"), // Changed to integer
  monthlyRecurringRevenue: decimal("monthly_recurring_revenue"), // MRR in GBP
  investmentRounds: integer("investment_rounds"),
  companyValuation: decimal("company_valuation"),
  plannedRaiseAmount: decimal("planned_raise_amount"),
  plannedRaiseValuation: decimal("planned_raise_valuation"),
  
  // Product Information - Updated field mappings
  problemDescription: text("problem_description"), // problemStatement
  problemCauses: text("problem_causes"), // rootCauses (changed from array to text)
  edtechDomains: text("edtech_domains").array(), // domains
  relevantExperience: text("relevant_experience"), // teamExperience
  keyGroupAffected: text("key_group_affected"), // affectedGroup (changed from array to text)
  problemImpact: text("problem_impact"), // impactDescription
  customerType: text("customer_type").array(),
  elevatorPitch: text("elevator_pitch"),
  solutionExplanation: text("solution_explanation"),
  programGoals: text("program_goals"), // programmeGoal
  companyWebsite: text("company_website"),
  pitchDeckLink: text("pitch_deck_link"),
  linkedinProfile: text("linkedin_profile"),
  researchEvidence: text("research_evidence"),
  
  // AI-specific fields - Updated enums
  aiProblemSolving: text("ai_problem_solving"), // aiSpecificProblem
  aiTeamExpertise: text("ai_team_expertise"),
  aiDevelopmentStage: text("ai_development_stage", { 
    enum: ["Exploring", "Prototype", "MVP", "In-production", "Scaling"] // aiDevStage
  }),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    // Conditional constraint - only enforce when status = 'submitted'
    submittedFieldsCheck: check("submitted_fields_check", sql`
      status <> 'submitted' OR (
        company_name IS NOT NULL AND LENGTH(TRIM(company_name)) >= 2 AND LENGTH(TRIM(company_name)) <= 140 AND
        hq_location IS NOT NULL AND LENGTH(TRIM(hq_location)) >= 2 AND LENGTH(TRIM(hq_location)) <= 120 AND
        startup_stage IS NOT NULL AND
        business_model IS NOT NULL AND
        number_of_employees IS NOT NULL AND number_of_employees >= 1 AND number_of_employees <= 5000 AND
        monthly_recurring_revenue IS NOT NULL AND monthly_recurring_revenue >= 0 AND
        problem_description IS NOT NULL AND LENGTH(TRIM(problem_description)) >= 20 AND
        problem_causes IS NOT NULL AND LENGTH(TRIM(problem_causes)) >= 20 AND
        edtech_domains IS NOT NULL AND array_length(edtech_domains, 1) >= 1 AND
        relevant_experience IS NOT NULL AND LENGTH(TRIM(relevant_experience)) >= 20 AND
        key_group_affected IS NOT NULL AND LENGTH(TRIM(key_group_affected)) >= 2 AND LENGTH(TRIM(key_group_affected)) <= 80 AND
        problem_impact IS NOT NULL AND LENGTH(TRIM(problem_impact)) >= 20 AND
        ai_problem_solving IS NOT NULL AND LENGTH(TRIM(ai_problem_solving)) >= 20 AND
        ai_development_stage IS NOT NULL AND
        elevator_pitch IS NOT NULL AND LENGTH(TRIM(elevator_pitch)) >= 20 AND LENGTH(TRIM(elevator_pitch)) <= 280 AND
        solution_explanation IS NOT NULL AND LENGTH(TRIM(solution_explanation)) >= 50 AND
        program_goals IS NOT NULL AND LENGTH(TRIM(program_goals)) >= 20
      )
    `)
  };
});

export const interestRegistrations = pgTable("interest_registrations", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  startupName: text("startup_name").notNull(),
  hqLocation: text("hq_location").notNull(),
  companyWebsite: text("company_website"),
  currentStatus: text("current_status"),
  areasOfInterest: text("areas_of_interest"),
  receiveUpdates: boolean("receive_updates").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Base application schema (permissive for drafts)
export const insertApplicationDraftSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
}).extend({
  // Make all fields optional for drafts
  status: z.literal("draft").default("draft"),
  // Arrays default to empty for drafts
  edtechDomains: z.array(z.string()).default([]),
  customerType: z.array(z.string()).default([]),
});

// Strict schema for final submission
export const insertApplicationSubmitSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
}).extend({
  status: z.literal("submitted"),
  
  // Company Details - Required fields with validation
  companyName: z.string().trim().min(2, "Company name must be at least 2 characters").max(140, "Company name must be under 140 characters"),
  hqLocation: z.string().trim().min(2, "HQ location must be at least 2 characters").max(120, "HQ location must be under 120 characters"),
  startupStage: z.enum(["Idea", "Prototype/MVP", "Pre-seed", "Seed", "Series A+", "Bootstrapped"], { 
    required_error: "Startup stage is required" 
  }),
  businessModel: z.enum(["B2B", "B2C", "B2B2C", "B2G", "Marketplace", "SaaS", "Hardware"], { 
    required_error: "Business model is required" 
  }),
  numberOfEmployees: z.number().int().min(1, "Must have at least 1 employee").max(5000, "Number of employees cannot exceed 5000"),
  monthlyRecurringRevenue: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, "Monthly recurring revenue must be a number >= 0"),
  
  // Product Details - Required fields
  problemDescription: z.string().trim().min(20, "Problem statement must be at least 20 characters"),
  problemCauses: z.string().trim().min(20, "Root causes must be at least 20 characters"),
  edtechDomains: z.array(z.string().min(2)).min(1, "Select at least one domain"),
  relevantExperience: z.string().trim().min(20, "Team experience must be at least 20 characters"),
  keyGroupAffected: z.string().trim().min(2, "Affected group must be at least 2 characters").max(80, "Affected group must be under 80 characters"),
  problemImpact: z.string().trim().min(20, "Impact description must be at least 20 characters"),
  
  // AI Implementation - Required fields
  aiProblemSolving: z.string().trim().min(20, "AI-specific problem must be at least 20 characters"),
  aiDevelopmentStage: z.enum(["Exploring", "Prototype", "MVP", "In-production", "Scaling"], { 
    required_error: "AI development stage is required" 
  }),
  
  // Pitch Deck & Links - Required fields
  elevatorPitch: z.string().trim().min(20, "Elevator pitch must be at least 20 characters").max(280, "Elevator pitch must be under 280 characters"),
  solutionExplanation: z.string().trim().min(50, "Solution explanation must be at least 50 characters"),
  programGoals: z.string().trim().min(20, "Programme goals must be at least 20 characters"),
}).refine(
  // Cross-field validation: Revenue vs Stage
  (data) => {
    if (data.monthlyRecurringRevenue && parseFloat(data.monthlyRecurringRevenue) > 0) {
      return ["Pre-seed", "Seed", "Series A+", "Bootstrapped"].includes(data.startupStage);
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
    if (data.businessModel === "B2G") {
      const affectedGroup = data.keyGroupAffected.toLowerCase();
      return affectedGroup.includes("school") || affectedGroup.includes("district") || affectedGroup.includes("ministry") || affectedGroup.includes("government") || affectedGroup.includes("public") || affectedGroup.includes("education") || affectedGroup.includes("university") || affectedGroup.includes("college");
    }
    return true;
  },
  {
    message: "B2G business model should affect educational institutions, schools, districts, or government entities",
    path: ["keyGroupAffected"]
  }
);

export const insertInterestRegistrationSchema = createInsertSchema(interestRegistrations).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types
export type InsertApplicationDraft = z.infer<typeof insertApplicationDraftSchema>;
export type InsertApplicationSubmit = z.infer<typeof insertApplicationSubmitSchema>;
export type Application = typeof applications.$inferSelect;

export type InsertInterestRegistration = z.infer<typeof insertInterestRegistrationSchema>;
export type InterestRegistration = typeof interestRegistrations.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Legacy export for backwards compatibility
export const insertApplicationSchema = insertApplicationDraftSchema;
