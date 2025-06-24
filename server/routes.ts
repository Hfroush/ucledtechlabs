import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertApplicationSchema, insertInterestRegistrationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Application submission endpoint
  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      res.json({ success: true, application });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit application" 
        });
      }
    }
  });

  // Interest registration endpoint
  app.post("/api/interest-registrations", async (req, res) => {
    try {
      const validatedData = insertInterestRegistrationSchema.parse(req.body);
      const registration = await storage.createInterestRegistration(validatedData);
      res.json({ success: true, registration });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to register interest" 
        });
      }
    }
  });

  // Get applications (admin endpoint)
  app.get("/api/applications", async (req, res) => {
    try {
      const applications = await storage.getApplications();
      res.json({ success: true, applications });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch applications" 
      });
    }
  });

  // Get interest registrations (admin endpoint)
  app.get("/api/interest-registrations", async (req, res) => {
    try {
      const registrations = await storage.getInterestRegistrations();
      res.json({ success: true, registrations });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch registrations" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
