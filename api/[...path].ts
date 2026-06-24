import type { IncomingMessage, ServerResponse } from "http";
import { createApp } from "../server/app.js";

// Vercel serverless catch-all for every /api/* route. The whole Express app
// runs inside a single function — Express handles internal routing. The app
// is built once per warm instance and reused across invocations.
//
// Body note: @vercel/node parses req.body lazily, so the raw request stream is
// still intact for express.json() as long as nothing reads req.body first.
let cached: Promise<(req: any, res: any) => void> | null = null;

function getApp() {
  if (!cached) cached = createApp() as unknown as Promise<(req: any, res: any) => void>;
  return cached;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const app = await getApp();
    app(req, res);
  } catch (err: any) {
    console.error("Serverless function init error:", err);
    (res as any).statusCode = 500;
    (res as any).setHeader("Content-Type", "application/json");
    (res as any).end(JSON.stringify({ error: err?.message ?? "Internal server error", stack: err?.stack }));
  }
}
