import express from "express";
import type { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import multer from 'multer';

import { authenticateToken } from "./middleware/auth.ts";
import { requireAdminOnly } from "./middleware/userRoleCheck.ts";
import { handleDemo } from "./routes/demo.ts";
import { handleUserRegistration } from "./routes/user_registration.ts";
import { handleUserProfileRegistration } from "./routes/userprofile_registration.ts";
import { handleLogin } from "./routes/login.ts";
import { handleViewUserProfile } from "./routes/view_userprofile.ts";
import { handleEditUserProfile } from "./routes/edit_userprofile.ts";
import { handleViewAllUserProfiles } from "./routes/view_all_userprofiles.ts";

export function createServer(): Express {
  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://yourdomain.com'] 
      : ['http://localhost:8080', 'http://localhost:3000'],
    credentials: true
  }));


  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
  });

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
  });
  app.use(limiter);

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health check 
  app.get("/health", (_req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
  });

  // and Test route for debugging
  app.post("/api/test", (req, res) => {
    console.log("=== TEST ENDPOINT HIT ===");
    console.log("Body:", req.body);
    console.log("Headers:", req.headers);
    res.json({ 
      status: "OK",
      timestamp: new Date().toISOString(),
      message: "Test endpoint working", body: req.body });
  });

  // API Routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "pong";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/login", handleLogin);
  app.post("/api/register", handleUserRegistration);
  app.get("/api/user/profiles", authenticateToken, requireAdminOnly,handleViewAllUserProfiles);
  app.post("/api/user/:userId/profile", authenticateToken ,upload.single('imageUpload'), handleUserProfileRegistration);
  app.get("/api/user/:userId/profile", authenticateToken ,handleViewUserProfile);
  app.put("/api/user/:userId/profile", authenticateToken, upload.single('imageUpload'), handleEditUserProfile);






  return app;
}

// Start the server
const app = createServer();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
  console.log(`🔍 Debug: Server started at ${new Date().toISOString()}`);
});
