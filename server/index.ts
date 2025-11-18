import express from "express";
import type { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import multer from 'multer';

// Fail fast if important env vars are missing in non-production. Set
// FAIL_ON_MISSING_ENVS=1 to make missing envs fatal (useful for CI).
const requiredEnvs = ['JWT_SECRET', 'DATABASE_URL'];
if (process.env.NODE_ENV !== 'production') {
  const missing = requiredEnvs.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    const msg = `⚠️  Missing env vars: ${missing.join(', ')}. Some features may not work until these are set.`;
    if (process.env.FAIL_ON_MISSING_ENVS === '1') {
      console.error(msg);
      process.exit(1);
    } else {
      console.warn(msg);
    }
  }
}

import { authenticateToken } from "./middleware/auth.ts";
import { requireAdminOnly } from "./middleware/userRoleCheck.ts";
import { handleDemo } from "./routes/demo.ts";
import { handleUserRegistration } from "./routes/user_registration.ts";
import { handleUserProfileRegistration } from "./routes/userprofile_registration.ts";
import { handleLogin } from "./routes/login.ts";
import { handleViewUserProfile } from "./routes/view_userprofile.ts";
import { handleEditUserProfile } from "./routes/edit_userprofile.ts";
import { handleViewAllUserProfiles } from "./routes/view_all_userprofiles.ts";
import { handleFindMatches } from "./routes/find_matches.ts";
import { handleSendConnection, handleGetConnectionStatus, handleAcceptConnection, handleDisconnect } from "./routes/connections.ts";
import { 
  handleSendMessage, 
  handleGetConversation, 
  handleGetConversations, 
  handleGetUnreadCount 
} from './routes/messages.ts';
import { 
  handleProposeDate,
  handleGetCurrentDatePlan,
  handleAcceptDatePlan,
  handleDeclineDatePlan,
  handleCancelDatePlan
} from './routes/date_plan.ts';

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
  app.get("/api/user/:userId/matches", authenticateToken, handleFindMatches);
  
  // Connection routes
  app.post("/api/user/:userId/connections", authenticateToken, handleSendConnection);
  app.get("/api/user/:userId/connections/status", authenticateToken, handleGetConnectionStatus);
  app.put("/api/user/:userId/connections/accept", authenticateToken, handleAcceptConnection);
  app.delete("/api/user/:userId/connections", authenticateToken, handleDisconnect);

  // Messaging routes (activated only after accepted connection)
  // Get a specific conversation with another user (userId here refers to the other participant)
  app.get('/api/user/:userId/messages', authenticateToken, handleGetConversation);
  // List all conversations (accepted connections + last message preview)
  app.get('/api/user/conversations', authenticateToken, handleGetConversations);
  // Unread count badge
  app.get('/api/messages/unread-count', authenticateToken, handleGetUnreadCount);
  // Send a message (receiverId in body)
  app.post('/api/messages', authenticateToken, handleSendMessage);

  // Date planning routes (require accepted connection)
  app.get('/api/date-plan/current', authenticateToken, handleGetCurrentDatePlan);
  app.post('/api/date-plan', authenticateToken, handleProposeDate);
  app.put('/api/date-plan/:id/accept', authenticateToken, handleAcceptDatePlan);
  app.put('/api/date-plan/:id/decline', authenticateToken, handleDeclineDatePlan);
  app.delete('/api/date-plan/:id', authenticateToken, handleCancelDatePlan);





  return app;
}

// Start the server
const app = createServer();
const PORT = parseInt(process.env.PORT || '3000');
const HOST = '127.0.0.1';

app.listen(PORT, HOST, () => {
  console.log(`✅ Server listening on http://${HOST}:${PORT}`);
  console.log(`🔍 Debug: Server started at ${new Date().toISOString()}`);
}).on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});
