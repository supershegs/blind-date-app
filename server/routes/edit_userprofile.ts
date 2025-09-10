import type { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const updateProfileSchema = z.object({
  lastname: z.string().min(1).max(50).optional(),
  firstname: z.string().min(1).max(50).optional(),
  middlename: z.string().max(50).optional(),
  dob: z.string().optional(),
  phoneNum: z.string().max(20).optional(),
  sex: z.string().max(10).optional(),
  address: z.string().min(1).max(200).optional(),
  state: z.string().min(1).max(50).optional(),
  city: z.string().min(1).max(50).optional(),
  localGovt: z.string().min(1).max(50).optional(),
  bio: z.string().max(500).optional(),
  interest: z.string().max(200).optional(),
  heightFt: z.string().transform(Number).optional(),
  weightKg: z.string().transform(Number).optional(),
  complexion: z.string().max(50).optional(),
  hobbies: z.string().max(200).optional()
});

export const handleEditUserProfile: RequestHandler = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId parameter"
      });
    }

    // Check if logged-in user owns this profile
    if (req.user!.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "User is not permitted to edit/change another's user profile"
      });
    }

    const imageUpload = req.file ? req.file.buffer.toString('base64') : undefined;
    const validatedData = updateProfileSchema.parse(req.body);

    // Check if profile exists
    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId }
    });

    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found"
      });
    }

    // Update profile
    const updatedProfile = await prisma.userProfile.update({
      where: { userId },
      data: {
        ...validatedData,
        dob: validatedData.dob ? new Date(validatedData.dob) : undefined,
        ...(imageUpload && { imageUpload })
      }
    });

    res.json({
      success: true,
      profile: updatedProfile,
      message: "Profile updated successfully"
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
        errors: error.errors
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update profile"
    });
  }
};
