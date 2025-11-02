import type { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Input validation schema
const userRegistrationSchema = z.object({
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  role: z.enum(["user", "admin"])
});

export const handleUserRegistration: RequestHandler = async (req, res) => {
  try {
		// Validate input
		const validatedData = userRegistrationSchema.parse(req.body);
		const { username, email, password, role } = validatedData;

		// Check if user already exists
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [
					{ email },
					{ username }
				]
			}
		});

		if (existingUser) {
			return res.status(409).json({ 
				success: false, 
				message: "User with this email or username already exists." 
			});
		}

		// Hash password
		const saltRounds = 12;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create user
		const user = await prisma.user.create({
			data: { 
				username, 
				email, 
				password: hashedPassword, 
				role 
			},
			select: {
				id: true,
				username: true,
				email: true,
				role: true
			}
		});
		console.log("New user registered:", user);

		res.status(201).json({ 
			success: true, 
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
	console.error("Registration error:", error.message);

	res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
	  error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


//npx ts-node -P tsconfig.backend.json server/index.ts
