import type { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handleFindMatches: RequestHandler = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

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

    // Find potential matches based on preferences
    const [matches, total] = await Promise.all([
      prisma.userProfile.findMany({
        where: {
          userId: { not: userId }, // Exclude current user
          // Add basic matching criteria
          sex: userProfile.interest === 'Both' ? undefined : userProfile.interest,
          // You can add more matching criteria here
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
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.userProfile.count({
        where: {
          userId: { not: userId },
          sex: userProfile.interest === 'Both' ? undefined : userProfile.interest,
        }
      })
    ]);

    // Calculate match percentage based on common interests/hobbies
    const matchesWithScore = matches.map(match => {
      let score = 0;
      const totalFactors = 4; // Number of factors we're considering

      // Interest match
      if (match.interest === userProfile.interest) score += 25;
      
      // Hobbies match (if any common hobbies)
      if (match.hobbies && userProfile.hobbies) {
        const userHobbies = userProfile.hobbies.toLowerCase().split(',');
        const matchHobbies = match.hobbies.toLowerCase().split(',');
        if (userHobbies.some(hobby => matchHobbies.includes(hobby))) score += 25;
      }

      // Location match (same city)
      if (match.city === userProfile.city) score += 25;

      // Age range match (within 5 years)
      if (match.dob && userProfile.dob) {
        const ageDiff = Math.abs(match.dob.getFullYear() - userProfile.dob.getFullYear());
        if (ageDiff <= 5) score += 25;
      }

      return {
        ...match,
        matchPercentage: score
      };
    });

    // Sort by match percentage
    matchesWithScore.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json({
      success: true,
      matches: matchesWithScore,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Find matches error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to find matches"
    });
  }
};