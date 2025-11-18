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
          // Don't filter by sex/interest for now - show all potential matches
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
        }
      })
    ]);

    // Calculate match percentage based on common interests/hobbies
    const matchesWithScore = matches.map(match => {
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