import type { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handleViewUserProfile: RequestHandler = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId parameter"
      });
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true
          }
        }
      }
    });

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found"
      });
    }

    res.json({
      success: true,
      profile: userProfile
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve profile"
    });
  }
};
