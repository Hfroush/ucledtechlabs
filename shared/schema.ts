import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  program: text("program").notNull(),
  startupName: text("startup_name").notNull(),
  stage: text("stage").notNull(),
  description: text("description").notNull(),
  teamSize: text("team_size"),
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
