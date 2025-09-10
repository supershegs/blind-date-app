import type { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const userProfileSchema = z.object({
  // userId: z.string().transform(Number),
  lastname: z.string().min(1).max(50),
  firstname: z.string().min(1).max(50),
  middlename: z.string().max(50).optional(),
  dob: z.string().optional(),
  phoneNum: z.string().max(20).optional(),
  sex: z.string().max(10).optional(),
  address: z.string().min(1).max(200),
  state: z.string().min(1).max(50),
  city: z.string().min(1).max(50),
  localGovt: z.string().min(1).max(50),
  bio: z.string().max(500).optional(),
  interest: z.string().max(200).optional(),
  heightFt: z.string().transform(Number).optional(),
  weightKg: z.string().transform(Number).optional(),
  complexion: z.string().max(50).optional(),
  hobbies: z.string().max(200).optional()
});

export const handleUserProfileRegistration: RequestHandler = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID."
      });
    }
    const imageUpload = req.file ? req.file.buffer.toString('base64') : null;
    
    // Use req.body directly (multer populates it)
    const validatedData = userProfileSchema.parse(req.body);
    const {
      lastname, firstname, middlename,
      dob, phoneNum, sex,
      address, state, city, localGovt,
      bio, interest, heightFt, weightKg,
      complexion, hobbies
    } = validatedData;

    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId }
    });

    if (existingProfile) {
      return res.status(409).json({
        success: false,
        message: "User profile already exists."
      });
    }

    const userProfile = await prisma.userProfile.create({
      data: {
        userId, lastname, firstname, middlename,
        dob: dob ? new Date(dob) : null,
        phoneNum, sex, imageUpload,
        address, state, city, localGovt,
        bio, interest, heightFt, weightKg,
        complexion, hobbies
      }
    });

    res.status(201).json({
      success: true,
      profile: userProfile,
      message: "User profile created successfully."
    });
  } catch (error: any) {
    console.error("Profile creation error:", error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data.",
        errors: error.errors
      });
    }

    res.status(500).json({
      success: false,
      message: "Profile creation failed. Please try again."
    });
  }
};
