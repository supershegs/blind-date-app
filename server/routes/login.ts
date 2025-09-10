import type { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { timingSafeEqual } from "crypto";

const prisma = new PrismaClient();

// Input validation schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    // Validate input
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    // Find user by email with timing-safe approach
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Always perform password comparison to prevent timing attacks
    const dummyHash = "$2b$12$dummy.hash.to.prevent.timing.attacks.abcdefghijklmnopqrstuvwxyz";
    const hashToCompare = user ? user.password : dummyHash;
    const isValidPassword = await bcrypt.compare(password, hashToCompare);

    if (!user || !isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials."
      });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username,
        email: user.email, 
        role: user.role 
      },
      jwtSecret,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data.",
        errors: error.errors
      });
    }

    // Log error without exposing sensitive data
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again."
    });
  }
};