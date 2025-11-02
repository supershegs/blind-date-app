import path from "path";
// import { createServer } from "./index";
import { createServer } from "./index.ts";
import * as express from "express";

const app = createServer();
const port = process.env.PORT || 3000;

// In production, serve the built SPA files
// Derive a safe dirname for both ESM and CommonJS. If import.meta is not
// available (older TS module settings), fall back to process.cwd().
function getDistPath() {
  try {
    // prefer ESM-aware filename when available
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { fileURLToPath } = require('url');
    // import.meta may not be available in some TS compile modes, so guard access
    // @ts-ignore - here we access import.meta only when running in ESM runtime
    const metaUrl = (typeof (global as any).importMetaUrl !== 'undefined') ? (global as any).importMetaUrl : (typeof (globalThis as any).importMetaUrl !== 'undefined' ? (globalThis as any).importMetaUrl : undefined);
    if (metaUrl) {
      const filename = fileURLToPath(metaUrl);
      return path.join(path.dirname(filename), '../spa');
    }
  } catch {
    // ignore
  }

  // Fallback to process.cwd() — this is safe for most production builds
  return path.join(process.cwd(), 'dist', 'spa');
}

const distPath = getDistPath();

// Serve static files
app.use(express.static(distPath));

// Handle React Router - serve index.html for all non-API routes
app.get("*", (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
