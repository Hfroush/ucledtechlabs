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
      teamSize: insertApplication.teamSize || null,
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
      receiveUpdates: insertRegistration.receiveUpdates || null,
      createdAt: new Date(),
    };
    this.interestRegistrations.set(id, registration);
    return registration;
  }

  async getInterestRegistrations(): Promise<InterestRegistration[]> {
    return Array.from(this.interestRegistrations.values());
  }
}

export const storage = new MemStorage();
