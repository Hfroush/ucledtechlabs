import { createServer } from "http";
import { createApp } from "./app";
import { setupVite, serveStatic, log } from "./vite";
import { seedAdminUser } from "./auth";

// Long-lived server entry point — used for local dev and any non-serverless
// deploy. The Vercel deployment uses api/[...path].ts instead and never runs
// this file.
(async () => {
  const app = await createApp();
  const server = createServer(app);

  // In development: Vite dev middleware. In a production monolith deploy:
  // serve the built client. On Vercel the frontend is served statically, so
  // neither path runs there.
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else if (!process.env.BACKEND_ONLY) {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({ port, host: "0.0.0.0", reusePort: true }, () => {
    log(`serving on port ${port}`);
    seedAdminUser().catch((err) => log(`Admin seed error: ${err.message}`));
  });
})();
