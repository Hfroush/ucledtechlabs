import type { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
// bcryptjs (pure JS) instead of bcrypt — no native binding to compile, which
// keeps the serverless bundle clean. Hashes are wire-compatible with bcrypt,
// so existing admin password hashes verify unchanged.
import bcrypt from "bcryptjs";
import { pool } from "./db.js";
import { storage } from "./storage.js";
import type { User } from "../shared/schema.js";

const PgSession = connectPgSimple(session);

export function setupAuth(app: Express) {
  // Session middleware — uses PostgreSQL session store
  app.use(
    session({
      store: new PgSession({
        pool,
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET ?? "dev-secret-please-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // Frontend and API are same-origin on Vercel, so lax is correct and
        // avoids third-party-cookie blocking that SameSite=none can trigger.
        sameSite: "lax",
      },
    })
  );

  // Passport initialisation
  app.use(passport.initialize());
  app.use(passport.session());

  // Local strategy — check username + bcrypt password
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Invalid username or password" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Invalid username or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Serialize: store only the user ID in the session
  passport.serializeUser((user, done) => {
    done(null, (user as User).id);
  });

  // Deserialize: load full user from DB on each request
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user ?? false);
    } catch (err) {
      done(err);
    }
  });
}

// Middleware to protect admin routes
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Authentication required" });
}

// Seed the admin user on first start if they don't exist
export async function seedAdminUser() {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.warn(
      "ADMIN_PASSWORD env var not set — admin user will not be created. " +
      "Set ADMIN_USERNAME and ADMIN_PASSWORD on Render before deploying."
    );
    return;
  }

  try {
    const existing = await storage.getUserByUsername(username);
    if (existing) {
      return; // Admin already exists, nothing to do
    }

    const hashed = await bcrypt.hash(password, 12);
    await storage.createUser({ username, password: hashed });
    console.log(`Admin user '${username}' created.`);
  } catch (err) {
    console.error("Failed to seed admin user:", err);
  }
}
