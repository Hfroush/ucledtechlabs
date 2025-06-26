import { pgTable, text, serial, integer, boolean, timestamp, date, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  // Personal Information
  fullName: text("full_name").notNull(),
  dateOfBirth: date("date_of_birth"),
  email: text("email").notNull(),
  telephoneNumber: text("telephone_number"),
  countryOfResidence: text("country_of_residence"),
  
  // Company Details
  companyName: text("company_name"),
  productName: text("product_name"),
  hqLocation: text("hq_location"),
  startupStage: text("startup_stage", { 
    enum: ["idea", "prototype", "mvp", "go-to-market", "product-market-fit", "investment", "scaling"] 
  }),
  businessModel: text("business_model", { 
    enum: ["b2b", "b2c", "b2e", "b2g", "b2e2c", "b2b2c", "b2g2e"] 
  }),
  coFounders: text("co_founders"),
  numberOfEmployees: integer("number_of_employees"),
  monthlyRecurringRevenue: decimal("monthly_recurring_revenue"),
  investmentRounds: integer("investment_rounds"),
  companyValuation: decimal("company_valuation"),
  plannedRaiseAmount: decimal("planned_raise_amount"),
  plannedRaiseValuation: decimal("planned_raise_valuation"),
  
  // Product Information
  problemDescription: text("problem_description"),
  problemCauses: text("problem_causes").array(),
  edtechDomains: text("edtech_domains").array(),
  relevantExperience: text("relevant_experience"),
  keyGroupAffected: text("key_group_affected").array(),
  problemImpact: text("problem_impact"),
  customerType: text("customer_type").array(),
  elevatorPitch: text("elevator_pitch"),
  solutionExplanation: text("solution_explanation"),
  programGoals: text("program_goals"),
  companyWebsite: text("company_website"),
  pitchDeckLink: text("pitch_deck_link"),
  linkedinProfile: text("linkedin_profile"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
});

export const insertInterestRegistrationSchema = createInsertSchema(interestRegistrations).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

export type InsertInterestRegistration = z.infer<typeof insertInterestRegistrationSchema>;
export type InterestRegistration = typeof interestRegistrations.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
