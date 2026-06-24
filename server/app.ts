import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { setupAuth } from "./auth.js";

// Local log helper. Defined here (not imported from ./vite) so this module
// never pulls vite into the serverless bundle.
function log(message: string, source = "express") {
  const t = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${t} [${source}] ${message}`);
}

// Builds the Express app without binding to a port. Shared by the local
// dev server (server/index.ts) and the Vercel serverless function (api/).
// Must NOT import vite's dev middleware or call server.listen — keep it
// runtime-agnostic so it bundles cleanly into a serverless function.
export async function createApp(): Promise<express.Express> {
  const app = express();

  // Trust the platform's reverse proxy so secure cookies work over HTTPS
  app.set("trust proxy", 1);

  // CORS — same-origin on Vercel, but keep this for split or local setups.
  // FRONTEND_URL can be a comma-separated list of origins.
  const allowedOrigins = [
    ...(process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
      : []),
    "http://localhost:5173",
    "http://localhost:3000",
  ].filter(Boolean) as string[];

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && (allowedOrigins.includes(origin) || allowedOrigins.length === 0)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Session + Passport (must be before registerRoutes)
  setupAuth(app);

  // Serve attached_assets when running as a long-lived server. On Vercel
  // these are served statically from the build output instead.
  app.use("/attached_assets", express.static("attached_assets"));

  // Lightweight health check — no DB, for uptime pings / smoke tests
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Request logging for /api routes
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }
        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }
        log(logLine);
      }
    });

    next();
  });

  await registerRoutes(app);

  // Error handler — send the response and stop. Do NOT re-throw here:
  // throwing inside Express error middleware becomes an uncaught exception
  // that crashes the process (and on a host returns 503s until restart).
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    if (!res.headersSent) {
      res.status(status).json({ message });
    }
    console.error("Unhandled route error:", err);
  });

  return app;
}
