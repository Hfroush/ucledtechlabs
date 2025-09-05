import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import { storage } from "./storage";
import { insertApplicationSchema, insertInterestRegistrationSchema } from "@shared/schema";
import { sendContactEmail, type ContactEmailData } from "./email";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage_multer = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `research-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage_multer,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|txt|png|jpg|jpeg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, TXT, PNG, and JPG files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // File upload endpoint for research evidence
  app.post("/api/upload-research", upload.array('files', 5), (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded"
        });
      }
      
      const files = req.files as Express.Multer.File[];
      const fileInfo = files.map(file => ({
        originalName: file.originalname,
        filename: file.filename,
        size: file.size,
        path: `/uploads/${file.filename}`
      }));
      
      res.json({
        success: true,
        files: fileInfo,
        message: `${files.length} file(s) uploaded successfully`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "File upload failed"
      });
    }
  });

  // Serve uploaded files
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

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

  // Get applications (admin endpoint)
  app.get("/api/applications", async (req, res) => {
    try {
      const applications = await storage.getApplications();
      res.json(applications);
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
      console.log("GET /api/interest-registrations - Fetching registrations...");
      const registrations = await storage.getInterestRegistrations();
      console.log("Retrieved registrations:", registrations);
      console.log("Number of registrations:", registrations.length);
      res.json(registrations);
    } catch (error) {
      console.error("Failed to fetch registrations:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch registrations" 
      });
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

  const httpServer = createServer(app);
  return httpServer;
}
