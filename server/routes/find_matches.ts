import type { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handleFindMatches: RequestHandler = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // Get current user's profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId }
    });

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found"
      });
    }

    // Check if user already has an active connection
    const existingConnection = await prisma.connection.findFirst({
      where: {
        OR: [
          { senderId: userId, status: { in: ['pending', 'accepted'] } },
          { receiverId: userId, status: { in: ['pending', 'accepted'] } }
        ]
      }
    });

    // Get the connected user ID if exists
    const connectedUserId = existingConnection
      ? (existingConnection.senderId === userId ? existingConnection.receiverId : existingConnection.senderId)
      : null;

    // Find potential matches - get all profiles to properly rank them
    const allMatches = await prisma.userProfile.findMany({
      where: {
        userId: { not: userId }, // Exclude current user
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            createdAt: true,
            isVerified: true,
          }
        }
      }
    });

    // Calculate match percentage for all profiles
    const matchesWithScore = allMatches.map(match => {
      let score = 50; // Start with base score of 50%

      // Interest match
      if (match.interest && userProfile.interest && match.interest === userProfile.interest) {
        score += 15;
      }
      
      // Hobbies match (if any common hobbies)
      if (match.hobbies && userProfile.hobbies) {
        const userHobbies = userProfile.hobbies.toLowerCase().split(',').map(h => h.trim());
        const matchHobbies = match.hobbies.toLowerCase().split(',').map(h => h.trim());
        const commonHobbies = userHobbies.filter(hobby => matchHobbies.includes(hobby));
        if (commonHobbies.length > 0) {
          score += Math.min(20, commonHobbies.length * 10); // Up to 20 points
        }
      }

      // Location match (same city)
      if (match.city && userProfile.city && match.city === userProfile.city) {
        score += 10;
      }

      // Same state (if not same city)
      if (match.state && userProfile.state && match.state === userProfile.state && match.city !== userProfile.city) {
        score += 5;
      }

      // Age range match (within 5 years)
      if (match.dob && userProfile.dob) {
        const ageDiff = Math.abs(match.dob.getFullYear() - userProfile.dob.getFullYear());
        if (ageDiff <= 5) {
          score += 10;
        } else if (ageDiff <= 10) {
          score += 5;
        }
      }

      // Cap at 100%
      score = Math.min(100, score);

      return {
        ...match,
        matchPercentage: score,
        isConnected: match.userId === connectedUserId
      };
    });

    // Sort by match percentage (best matches first)
    matchesWithScore.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Return only top 3 best matches
    const top3Matches = matchesWithScore.slice(0, 3);

    res.json({
      success: true,
      matches: top3Matches,
      pagination: {
        page: 1,
        limit: 3,
        total: top3Matches.length,
        totalPages: 1
      },
      hasActiveConnection: !!existingConnection,
      connectedUserId: connectedUserId
    });
  } catch (error: any) {
    console.error('Find matches error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to find matches"
    });
  }
};