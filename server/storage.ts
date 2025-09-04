import {
  users,
  applications,
  interestRegistrations,
  type User,
  type InsertUser,
  type Application,
  type InsertApplication,
  type InterestRegistration,
  type InsertInterestRegistration
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  createApplication(application: InsertApplication): Promise<Application>;
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

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
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

  async createApplication(data: InsertApplication): Promise<Application> {
    // Helper function to convert string numbers to decimal or null
    const parseNumericField = (value: any): string | null => {
      if (!value || typeof value !== 'string') return null;
      
      // Handle dropdown string values (like "<25000", "Pre-revenue", etc.)
      if (isNaN(Number(value))) {
        return null; // Store dropdown selections as null since they're categorical
      }
      
      return value;
    };

    // Clean and process the data before insertion
    const processedData = {
      ...data,
      // Ensure array fields are properly handled
      problemCauses: data.problemCauses || [],
      edtechDomains: data.edtechDomains || [],
      keyGroupAffected: data.keyGroupAffected || [],
      customerType: data.customerType || [],
      // Convert string numbers to proper types
      investmentRounds: data.investmentRounds ? Number(data.investmentRounds) : null,
      // Handle decimal fields - convert dropdown strings and empty strings to null
      monthlyRecurringRevenue: parseNumericField(data.monthlyRecurringRevenue),
      companyValuation: parseNumericField(data.companyValuation),
      plannedRaiseAmount: parseNumericField(data.plannedRaiseAmount),
      plannedRaiseValuation: parseNumericField(data.plannedRaiseValuation),
      // Handle date field
      dateOfBirth: data.dateOfBirth || null,
    };

    const [application] = await db.insert(applications).values(processedData).returning();
    return application;
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