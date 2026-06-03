import {
  users,
  applications,
  interestRegistrations,
  type User,
  type InsertUser,
  type Application,
  type InsertApplicationDraft,
  type InsertApplicationSubmit,
  type InterestRegistration,
  type InsertInterestRegistration
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Legacy method for backwards compatibility
  createApplication(application: InsertApplicationDraft): Promise<Application>;
  // New separate methods for draft and submit
  createApplicationDraft(application: InsertApplicationDraft): Promise<Application>;
  updateApplicationDraft(id: number, application: InsertApplicationDraft): Promise<Application>;
  getApplicationDraft(id: number): Promise<Application | null>;
  submitApplication(application: InsertApplicationSubmit): Promise<Application>;
  getApplications(): Promise<Application[]>;

  createInterestRegistration(registration: InsertInterestRegistration): Promise<InterestRegistration>;
  getInterestRegistrations(): Promise<InterestRegistration[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private applications: Map<number, Application>;
  private interestRegistrations: Map<number, InterestRegistration>;
  private currentUserId: number;
  private currentApplicationId: number;
  private currentInterestId: number;

  constructor() {
    this.users = new Map();
    this.applications = new Map();
    this.interestRegistrations = new Map();
    this.currentUserId = 1;
    this.currentApplicationId = 1;
    this.currentInterestId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createApplication(insertApplication: InsertApplicationDraft): Promise<Application> {
    return this.createApplicationDraft(insertApplication);
  }

  async createApplicationDraft(insertApplication: InsertApplicationDraft): Promise<Application> {
    const id = this.currentApplicationId++;
    const application: Application = {
      ...insertApplication,
      id,
      dateOfBirth: insertApplication.dateOfBirth || null,
      telephoneNumber: insertApplication.telephoneNumber || null,
      countryOfResidence: insertApplication.countryOfResidence || null,
      companyName: insertApplication.companyName || null,
      productName: insertApplication.productName || null,
      hqLocation: insertApplication.hqLocation || null,
      startupStage: insertApplication.startupStage || null,
      businessModel: insertApplication.businessModel || null,
      coFounders: insertApplication.coFounders || null,
      numberOfEmployees: insertApplication.numberOfEmployees || null,
      monthlyRecurringRevenue: insertApplication.monthlyRecurringRevenue || null,
      investmentRounds: insertApplication.investmentRounds || null,
      companyValuation: insertApplication.companyValuation || null,
      plannedRaiseAmount: insertApplication.plannedRaiseAmount || null,
      plannedRaiseValuation: insertApplication.plannedRaiseValuation || null,
      problemDescription: insertApplication.problemDescription || null,
      problemCauses: insertApplication.problemCauses || null,
      edtechDomains: insertApplication.edtechDomains || null,
      relevantExperience: insertApplication.relevantExperience || null,
      keyGroupAffected: insertApplication.keyGroupAffected || null,
      problemImpact: insertApplication.problemImpact || null,
      customerType: insertApplication.customerType || null,
      elevatorPitch: insertApplication.elevatorPitch || null,
      solutionExplanation: insertApplication.solutionExplanation || null,
      programGoals: insertApplication.programGoals || null,
      companyWebsite: insertApplication.companyWebsite || null,
      pitchDeckLink: insertApplication.pitchDeckLink || null,
      linkedinProfile: insertApplication.linkedinProfile || null,
      researchEvidence: insertApplication.researchEvidence || null,
      aiProblemSolving: insertApplication.aiProblemSolving || null,
      aiTeamExpertise: insertApplication.aiTeamExpertise || null,
      aiDevelopmentStage: insertApplication.aiDevelopmentStage || null,
      createdAt: new Date(),
    };
    this.applications.set(id, application);
    return application;
  }

  async updateApplicationDraft(id: number, insertApplication: InsertApplicationDraft): Promise<Application> {
    const existing = this.applications.get(id);
    if (!existing) {
      throw new Error(`Application with ID ${id} not found`);
    }
    
    const application: Application = {
      ...existing,
      ...insertApplication,
      id, // Preserve the original ID
      createdAt: existing.createdAt, // Preserve creation time
    };
    this.applications.set(id, application);
    return application;
  }

  async getApplicationDraft(id: number): Promise<Application | null> {
    return this.applications.get(id) || null;
  }

  async submitApplication(insertApplication: InsertApplicationSubmit): Promise<Application> {
    const id = this.currentApplicationId++;
    const application: Application = {
      ...insertApplication,
      id,
      status: "submitted",
      dateOfBirth: insertApplication.dateOfBirth || null,
      telephoneNumber: insertApplication.telephoneNumber || null,
      countryOfResidence: insertApplication.countryOfResidence || null,
      productName: insertApplication.productName || null,
      investmentRounds: insertApplication.investmentRounds || null,
      // Drizzle decimal columns are typed as string — convert from number
      monthlyRecurringRevenue: insertApplication.monthlyRecurringRevenue != null ? String(insertApplication.monthlyRecurringRevenue) : null,
      companyValuation: insertApplication.companyValuation != null ? String(insertApplication.companyValuation) : null,
      plannedRaiseAmount: insertApplication.plannedRaiseAmount != null ? String(insertApplication.plannedRaiseAmount) : null,
      plannedRaiseValuation: insertApplication.plannedRaiseValuation != null ? String(insertApplication.plannedRaiseValuation) : null,
      businessModel: insertApplication.businessModel ?? null,
      customerType: insertApplication.customerType || [],
      companyWebsite: insertApplication.companyWebsite || null,
      pitchDeckLink: insertApplication.pitchDeckLink || null,
      linkedinProfile: insertApplication.linkedinProfile || null,
      researchEvidence: insertApplication.researchEvidence || null,
      aiTeamExpertise: insertApplication.aiTeamExpertise || null,
      coFounders: insertApplication.coFounders || null,
      createdAt: new Date(),
    };
    this.applications.set(id, application);
    return application;
  }

  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }

  async createInterestRegistration(insertRegistration: InsertInterestRegistration): Promise<InterestRegistration> {
    const id = this.currentInterestId++;
    const registration: InterestRegistration = {
      ...insertRegistration,
      id,
      currentStatus: insertRegistration.currentStatus || null,
      areasOfInterest: insertRegistration.areasOfInterest || null,
      receiveUpdates: insertRegistration.receiveUpdates ?? null,
      companyWebsite: insertRegistration.companyWebsite || null,
      createdAt: new Date(),
    };
    this.interestRegistrations.set(id, registration);
    return registration;
  }

  async getInterestRegistrations(): Promise<InterestRegistration[]> {
    return Array.from(this.interestRegistrations.values());
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createApplication(data: InsertApplicationDraft): Promise<Application> {
    return this.createApplicationDraft(data);
  }

  async createApplicationDraft(data: InsertApplicationDraft): Promise<Application> {
    // Helper function to convert string numbers to decimal or null
    const parseNumericField = (value: any): string | null => {
      console.log('parseNumericField input:', { value, type: typeof value });
      
      // Handle null, undefined, or empty values
      if (!value || value === '' || value === undefined || value === null) {
        console.log('parseNumericField returning null for empty/null value');
        return null;
      }
      
      // Convert to string if not already
      const stringValue = String(value).trim();
      console.log('parseNumericField stringValue:', stringValue);
      
      // Handle dropdown string values (non-numeric categorical values)
      const numericValue = Number(stringValue);
      if (isNaN(numericValue)) {
        console.log('parseNumericField returning null for non-numeric value:', stringValue);
        return null; // Store dropdown selections as null since they're categorical
      }
      
      // Return the string representation for valid numbers
      console.log('parseNumericField returning numeric string:', stringValue);
      return stringValue;
    };

    // Clean and process the data before insertion
    console.log('Original data before processing:', JSON.stringify(data, null, 2));
    
    const processedData = {
      ...data,
      status: "draft" as const, // Ensure drafts have correct status
      // Handle string fields (formerly arrays)
      problemCauses: Array.isArray(data.problemCauses) ? data.problemCauses.join(", ") : (data.problemCauses || null),
      keyGroupAffected: Array.isArray(data.keyGroupAffected) ? data.keyGroupAffected.join(", ") : (data.keyGroupAffected || null),
      // Ensure array fields are properly handled
      edtechDomains: data.edtechDomains || [],
      customerType: data.customerType || [],
      // Convert string numbers to proper types
      numberOfEmployees: data.numberOfEmployees ? Number(data.numberOfEmployees) : null,
      investmentRounds: data.investmentRounds ? Number(data.investmentRounds) : null,
      // Handle decimal fields - convert dropdown strings and empty strings to null
      monthlyRecurringRevenue: parseNumericField(data.monthlyRecurringRevenue),
      companyValuation: parseNumericField(data.companyValuation),
      plannedRaiseAmount: parseNumericField(data.plannedRaiseAmount),
      plannedRaiseValuation: parseNumericField(data.plannedRaiseValuation),
      // Handle date field
      dateOfBirth: data.dateOfBirth || null,
    };

    console.log('Processed data for database insertion:', JSON.stringify(processedData, null, 2));
    console.log('Decimal field values:', {
      monthlyRecurringRevenue: processedData.monthlyRecurringRevenue,
      companyValuation: processedData.companyValuation,
      plannedRaiseAmount: processedData.plannedRaiseAmount,
      plannedRaiseValuation: processedData.plannedRaiseValuation
    });

    try {
      const [application] = await db.insert(applications).values(processedData).returning();
      console.log('Database insertion successful:', application);
      return application;
    } catch (dbError) {
      console.error('Database insertion failed:', dbError);
      throw dbError;
    }
  }

  async updateApplicationDraft(id: number, data: InsertApplicationDraft): Promise<Application> {
    // Helper function to convert string numbers to decimal or null
    const parseNumericField = (value: any): string | null => {
      console.log('parseNumericField input:', { value, type: typeof value });
      
      // Handle null, undefined, or empty values
      if (!value || value === '' || value === undefined || value === null) {
        console.log('parseNumericField returning null for empty/null value');
        return null;
      }
      
      // Convert to string if not already
      const stringValue = String(value).trim();
      console.log('parseNumericField stringValue:', stringValue);
      
      // Handle dropdown string values (non-numeric categorical values)
      const numericValue = Number(stringValue);
      if (isNaN(numericValue)) {
        console.log('parseNumericField returning null for non-numeric value:', stringValue);
        return null; // Store dropdown selections as null since they're categorical
      }
      
      // Return the string representation for valid numbers
      console.log('parseNumericField returning numeric string:', stringValue);
      return stringValue;
    };

    // Clean and process the data before update
    console.log('Original data before processing:', JSON.stringify(data, null, 2));
    
    const processedData = {
      ...data,
      status: "draft" as const, // Ensure drafts have correct status
      // Handle string fields (formerly arrays)
      problemCauses: Array.isArray(data.problemCauses) ? data.problemCauses.join(", ") : (data.problemCauses || null),
      keyGroupAffected: Array.isArray(data.keyGroupAffected) ? data.keyGroupAffected.join(", ") : (data.keyGroupAffected || null),
      // Ensure array fields are properly handled
      edtechDomains: data.edtechDomains || [],
      customerType: data.customerType || [],
      // Convert string numbers to proper types
      numberOfEmployees: data.numberOfEmployees ? Number(data.numberOfEmployees) : null,
      investmentRounds: data.investmentRounds ? Number(data.investmentRounds) : null,
      // Handle decimal fields - convert dropdown strings and empty strings to null
      monthlyRecurringRevenue: parseNumericField(data.monthlyRecurringRevenue),
      companyValuation: parseNumericField(data.companyValuation),
      plannedRaiseAmount: parseNumericField(data.plannedRaiseAmount),
      plannedRaiseValuation: parseNumericField(data.plannedRaiseValuation),
      // Handle date field
      dateOfBirth: data.dateOfBirth || null,
    };
    
    console.log('Processed data for database update:', JSON.stringify(processedData, null, 2));
    
    try {
      const [application] = await db
        .update(applications)
        .set(processedData)
        .where(eq(applications.id, id))
        .returning();
      
      if (!application) {
        throw new Error(`Application with ID ${id} not found`);
      }
      
      console.log('Database update successful:', application);
      return application;
    } catch (dbError) {
      console.error('Database update failed:', dbError);
      throw dbError;
    }
  }

  async getApplicationDraft(id: number): Promise<Application | null> {
    try {
      const [application] = await db
        .select()
        .from(applications)
        .where(eq(applications.id, id))
        .limit(1);
      
      return application || null;
    } catch (dbError) {
      console.error('Database draft fetch failed:', dbError);
      throw dbError;
    }
  }

  async submitApplication(data: InsertApplicationSubmit): Promise<Application> {
    // For submit, we don't need the helper function since all fields are validated
    const processedData = {
      ...data,
      status: "submitted" as const, // Ensure submitted status
      // Handle string fields
      problemCauses: Array.isArray(data.problemCauses) ? data.problemCauses.join(", ") : data.problemCauses,
      keyGroupAffected: Array.isArray(data.keyGroupAffected) ? data.keyGroupAffected.join(", ") : data.keyGroupAffected,
      // Ensure array fields are properly handled
      edtechDomains: data.edtechDomains || [],
      customerType: data.customerType || [],
      // Handle numeric fields
      numberOfEmployees: data.numberOfEmployees,
      investmentRounds: data.investmentRounds || null,
      // Handle decimal fields — Drizzle decimal columns expect string representation
      monthlyRecurringRevenue: data.monthlyRecurringRevenue != null ? String(data.monthlyRecurringRevenue) : null,
      companyValuation: data.companyValuation != null ? String(data.companyValuation) : null,
      plannedRaiseAmount: data.plannedRaiseAmount != null ? String(data.plannedRaiseAmount) : null,
      plannedRaiseValuation: data.plannedRaiseValuation != null ? String(data.plannedRaiseValuation) : null,
      // Handle date field
      dateOfBirth: data.dateOfBirth || null,
    };

    try {
      const [application] = await db.insert(applications).values(processedData).returning();
      console.log('Database submission successful:', application);
      return application;
    } catch (dbError) {
      console.error('Database submission failed:', dbError);
      throw dbError;
    }
  }

  async getApplications(): Promise<Application[]> {
    return await db.select().from(applications);
  }

  async createInterestRegistration(registration: InsertInterestRegistration): Promise<InterestRegistration> {
    const [createdRegistration] = await db
      .insert(interestRegistrations)
      .values(registration)
      .returning();
    return createdRegistration;
  }

  async getInterestRegistrations(): Promise<InterestRegistration[]> {
    return await db.select().from(interestRegistrations);
  }
}

export const storage = new DatabaseStorage();