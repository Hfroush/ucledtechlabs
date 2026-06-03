import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import { storage } from "./storage";
import {
  insertApplicationSchema,
  insertApplicationDraftSchema,
  insertApplicationSubmitSchema,
  insertInterestRegistrationSchema,
  type Application
} from "@shared/schema";
import { sendContactEmail, type ContactEmailData } from "./email";
import { requireAuth } from "./auth";
import { z } from "zod";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";

// Configure Cloudinary — reads CLOUDINARY_URL env var automatically
if (process.env.CLOUDINARY_URL) {
  cloudinary.config(true);
} else {
  console.warn("CLOUDINARY_URL not set — file uploads will not work in production");
}

// Use memory storage: files are held in buffer, then streamed to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|txt|png|jpg|jpeg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only PDF, DOC, DOCX, TXT, PNG, and JPG files are allowed'));
  }
});

// Upload a buffer to Cloudinary and return the result
function uploadToCloudinary(buffer: Buffer, originalName: string): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ucledtechlabs/research",
        resource_type: "auto",
        public_id: `research-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      },
      (error, result) => {
        if (error || !result) reject(error ?? new Error("Cloudinary upload failed"));
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // File upload endpoint for research evidence — streams to Cloudinary
  app.post("/api/upload-research", upload.array('files', 5), async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: "No files uploaded" });
      }

      if (!process.env.CLOUDINARY_URL) {
        return res.status(503).json({ success: false, message: "File upload service not configured" });
      }

      const files = req.files as Express.Multer.File[];
      const results = await Promise.all(
        files.map(file => uploadToCloudinary(file.buffer, file.originalname))
      );

      const fileInfo = results.map((result, i) => ({
        originalName: files[i].originalname,
        size: files[i].size,
        url: result.secure_url,
        publicId: result.public_id,
      }));

      res.json({
        success: true,
        files: fileInfo,
        message: `${files.length} file(s) uploaded successfully`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ success: false, message: "File upload failed" });
    }
  });

  // Application submission endpoint
  app.post("/api/applications", async (req, res) => {
    const requestId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const startTime = Date.now();
    
    console.log(`[${requestId}] POST /api/applications - Starting request`);
    console.log(`[${requestId}] Headers:`, {
      'content-type': req.headers['content-type'],
      'content-length': req.headers['content-length'],
      'user-agent': req.headers['user-agent'],
      'origin': req.headers['origin'],
      'referer': req.headers['referer']
    });
    console.log(`[${requestId}] Body size:`, JSON.stringify(req.body).length, 'bytes');
    
    try {
      // Input validation with timeout
      console.log(`[${requestId}] Validating request data...`);
      const validatedData = insertApplicationSchema.parse(req.body);
      console.log(`[${requestId}] Validation successful`);
      
      // Database operation with timeout  
      console.log(`[${requestId}] Creating application in database...`);
      const application = await Promise.race([
        storage.createApplication(validatedData),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database timeout')), 10000)
        )
      ]) as Application;
      
      const duration = Date.now() - startTime;
      console.log(`[${requestId}] Application created successfully with ID: ${application.id} (${duration}ms)`);
      
      res.json({ success: true, application });
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[${requestId}] Application submission error (${duration}ms):`, error);
      
      if (error instanceof z.ZodError) {
        console.error(`[${requestId}] Validation errors:`, error.errors);
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else if (error instanceof Error) {
        // Map specific database errors to appropriate status codes
        if (error.message.includes('unique constraint') || error.message.includes('duplicate')) {
          console.error(`[${requestId}] Duplicate entry error:`, error.message);
          res.status(409).json({
            success: false,
            message: "Application already exists",
            error: "Duplicate submission detected"
          });
        } else if (error.message.includes('timeout')) {
          console.error(`[${requestId}] Database timeout:`, error.message);
          res.status(503).json({
            success: false,
            message: "Service temporarily unavailable",
            error: "Database connection timeout"
          });
        } else {
          console.error(`[${requestId}] Database error details:`, {
            message: error.message,
            stack: error.stack,
            name: error.name
          });
          
          res.status(500).json({ 
            success: false, 
            message: "Failed to submit application",
            requestId: requestId
          });
        }
      } else {
        console.error(`[${requestId}] Unknown error type:`, error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit application",
          requestId: requestId
        });
      }
    }
  });

  // Application draft endpoint - Permissive validation for saving drafts
  app.post("/api/applications/draft", async (req, res) => {
    const requestId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const startTime = Date.now();
    
    console.log(`[${requestId}] POST /api/applications/draft - Starting request`);
    
    try {
      // Add server-side coercion for drafts too
      const preprocessedData = {
        ...req.body,
        // Ensure arrays are properly handled for drafts
        edtechDomains: Array.isArray(req.body.edtechDomains) ? req.body.edtechDomains : [],
        customerType: Array.isArray(req.body.customerType) ? req.body.customerType : [],
        // Ensure numbers are properly parsed if provided
        numberOfEmployees: req.body.numberOfEmployees 
          ? (typeof req.body.numberOfEmployees === 'string' 
              ? parseInt(req.body.numberOfEmployees, 10) 
              : req.body.numberOfEmployees)
          : undefined,
      };
      
      // Permissive validation for drafts with preprocessed data
      const validatedData = insertApplicationDraftSchema.parse(preprocessedData);
      console.log(`[${requestId}] Draft validation successful`);
      
      const application = await Promise.race([
        storage.createApplicationDraft(validatedData),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database timeout')), 10000)
        )
      ]) as Application;
      
      const duration = Date.now() - startTime;
      console.log(`[${requestId}] Draft saved successfully with ID: ${application.id} (${duration}ms)`);
      
      res.json({ success: true, application });
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[${requestId}] Draft save error (${duration}ms):`, error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Draft validation failed", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to save draft",
          requestId: requestId
        });
      }
    }
  });

  // Application draft update endpoint - Update existing draft by ID
  app.patch("/api/applications/draft/:id", async (req, res) => {
    const requestId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const startTime = Date.now();
    const draftId = parseInt(req.params.id, 10);
    
    console.log(`[${requestId}] PATCH /api/applications/draft/${draftId} - Starting request`);
    
    try {
      // Add server-side coercion for drafts too
      const preprocessedData = {
        ...req.body,
        id: draftId, // Ensure the ID is set for update
        // Ensure arrays are properly handled for drafts
        edtechDomains: Array.isArray(req.body.edtechDomains) ? req.body.edtechDomains : [],
        customerType: Array.isArray(req.body.customerType) ? req.body.customerType : [],
        // Ensure numbers are properly parsed if provided
        numberOfEmployees: req.body.numberOfEmployees 
          ? (typeof req.body.numberOfEmployees === 'string' 
              ? parseInt(req.body.numberOfEmployees, 10) 
              : req.body.numberOfEmployees)
          : undefined,
      };
      
      // Permissive validation for drafts with preprocessed data
      const validatedData = insertApplicationDraftSchema.parse(preprocessedData);
      console.log(`[${requestId}] Draft update validation successful`);
      
      const application = await Promise.race([
        storage.updateApplicationDraft(draftId, validatedData),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database timeout')), 10000)
        )
      ]) as Application;
      
      const duration = Date.now() - startTime;
      console.log(`[${requestId}] Draft updated successfully with ID: ${application.id} (${duration}ms)`);
      
      res.json({ success: true, application });
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[${requestId}] Draft update error (${duration}ms):`, error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Draft validation failed", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to update draft",
          requestId: requestId
        });
      }
    }
  });

  // Application draft get endpoint - Fetch existing draft by ID
  app.get("/api/applications/draft/:id", async (req, res) => {
    const requestId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const startTime = Date.now();
    const draftId = parseInt(req.params.id, 10);
    
    console.log(`[${requestId}] GET /api/applications/draft/${draftId} - Starting request`);
    
    try {
      const application = await Promise.race([
        storage.getApplicationDraft(draftId),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database timeout')), 10000)
        )
      ]) as Application | null;
      
      if (!application) {
        const duration = Date.now() - startTime;
        console.log(`[${requestId}] Draft not found with ID: ${draftId} (${duration}ms)`);
        res.status(404).json({ 
          success: false, 
          message: "Draft not found" 
        });
        return;
      }
      
      const duration = Date.now() - startTime;
      console.log(`[${requestId}] Draft fetched successfully with ID: ${application.id} (${duration}ms)`);
      
      res.json({ success: true, application });
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[${requestId}] Draft fetch error (${duration}ms):`, error);
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch draft",
        requestId: requestId
      });
    }
  });

  // Application submit endpoint - Strict validation for final submission
  app.post("/api/applications/submit", async (req, res) => {
    const requestId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const startTime = Date.now();
    
    console.log(`[${requestId}] POST /api/applications/submit - Starting request`);
    
    try {
      // Add server-side coercion to mirror client schema processing
      const preprocessedData = {
        ...req.body,
        // Set default status if missing (submit adapter should provide this)
        status: req.body.status || "submitted",
        // Ensure arrays are properly handled (mirror client z.preprocess)
        edtechDomains: Array.isArray(req.body.edtechDomains) ? req.body.edtechDomains : [],
        customerType: Array.isArray(req.body.customerType) ? req.body.customerType : [],
        // Ensure numbers are properly parsed
        numberOfEmployees: typeof req.body.numberOfEmployees === 'string' 
          ? parseInt(req.body.numberOfEmployees, 10) 
          : req.body.numberOfEmployees,
        // Ensure string fields for joined arrays
        problemCauses: typeof req.body.problemCauses === 'string' 
          ? req.body.problemCauses 
          : Array.isArray(req.body.problemCauses) 
            ? req.body.problemCauses.join(', ') 
            : '',
        keyGroupAffected: typeof req.body.keyGroupAffected === 'string' 
          ? req.body.keyGroupAffected 
          : Array.isArray(req.body.keyGroupAffected) 
            ? req.body.keyGroupAffected.join(', ') 
            : '',
      };
      
      // Strict validation for submission with preprocessed data
      const validatedData = insertApplicationSubmitSchema.parse(preprocessedData);
      console.log(`[${requestId}] Submit validation successful`);
      
      const application = await Promise.race([
        storage.submitApplication(validatedData),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database timeout')), 10000)
        )
      ]) as Application;
      
      const duration = Date.now() - startTime;
      console.log(`[${requestId}] Application submitted successfully with ID: ${application.id} (${duration}ms)`);
      
      res.status(201).json({ success: true, application });
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[${requestId}] Application submit error (${duration}ms):`, error);
      
      if (error instanceof z.ZodError) {
        // Return 422 for validation failures with precise field-level issues
        const fieldErrors = error.errors.map(err => ({
          path: err.path.join('.'),
          code: err.code,
          message: err.message
        }));
        
        console.error(`[${requestId}] Validation errors:`, fieldErrors);
        res.status(422).json({ 
          success: false, 
          message: "Validation failed", 
          issues: fieldErrors
        });
      } else if (error instanceof Error) {
        // Map specific database errors to appropriate status codes
        if (error.message.includes('unique constraint') || error.message.includes('duplicate')) {
          res.status(409).json({
            success: false,
            message: "Application already exists",
            error: "Duplicate submission detected"
          });
        } else if (error.message.includes('timeout')) {
          res.status(503).json({
            success: false,
            message: "Service temporarily unavailable",
            error: "Database connection timeout"
          });
        } else {
          res.status(500).json({ 
            success: false, 
            message: "Failed to submit application",
            requestId: requestId
          });
        }
      }
    }
  });

  // Interest registration endpoint
  app.post("/api/interest-registrations", async (req, res) => {
    try {
      console.log("POST /api/interest-registrations - Request body:", req.body);
      const validatedData = insertInterestRegistrationSchema.parse(req.body);
      console.log("Validated data:", validatedData);
      const registration = await storage.createInterestRegistration(validatedData);
      console.log("Created registration:", registration);
      res.json({ success: true, registration });
    } catch (error) {
      console.error("Interest registration error:", error);
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

  // Get applications (admin endpoint — protected)
  app.get("/api/applications", requireAuth, async (req, res) => {
    try {
      const applications = await storage.getApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch applications" });
    }
  });

  // Get interest registrations (admin endpoint — protected)
  app.get("/api/interest-registrations", requireAuth, async (req, res) => {
    try {
      const registrations = await storage.getInterestRegistrations();
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch registrations" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactSchema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        message: z.string().min(10, "Message must be at least 10 characters"),
      });

      const validatedData = contactSchema.parse(req.body);
      const emailSent = await sendContactEmail(validatedData);
      
      if (emailSent) {
        res.json({ success: true, message: "Email sent successfully" });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send email" 
        });
      }
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
          message: error instanceof Error ? error.message : "Failed to send contact email" 
        });
      }
    }
  });

  // Auth routes
  const passport = (await import("passport")).default;

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ success: false, message: info?.message ?? "Invalid credentials" });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.json({ success: true, user: { id: user.id, username: user.username } });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ success: true });
    });
  });

  app.get("/api/auth/user", (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      return res.json({ id: user.id, username: user.username });
    }
    res.status(401).json({ message: "Not authenticated" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
