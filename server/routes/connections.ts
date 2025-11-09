import type { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Send a connection request
export const handleSendConnection: RequestHandler = async (req, res) => {
  try {
    const senderId = parseInt(req.params.userId);
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID is required"
      });
    }

    // Check if user already has an active connection
    const existingConnection = await prisma.connection.findFirst({
      where: {
        OR: [
          { senderId, status: { in: ['pending', 'accepted'] } },
          { receiverId: senderId, status: { in: ['pending', 'accepted'] } }
        ]
      }
    });

    if (existingConnection) {
      return res.status(400).json({
        success: false,
        message: "You already have an active connection. Please disconnect first.",
        connection: existingConnection
      });
    }

    // Check if connection already exists with this specific user
    const duplicateConnection = await prisma.connection.findFirst({
      where: {
        OR: [
          { senderId, receiverId: parseInt(receiverId) },
          { senderId: parseInt(receiverId), receiverId: senderId }
        ]
      }
    });

    if (duplicateConnection) {
      return res.status(400).json({
        success: false,
        message: "Connection request already exists with this user",
        connection: duplicateConnection
      });
    }

    // Create new connection request
    const connection = await prisma.connection.create({
      data: {
        senderId,
        receiverId: parseInt(receiverId),
        status: 'pending'
      },
      include: {
        receiver: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                firstname: true,
                lastname: true,
                imageUpload: true
              }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      message: "Connection request sent successfully",
      connection
    });
  } catch (error: any) {
    console.error('Send connection error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to send connection request"
    });
  }
};

// Get user's connection status
export const handleGetConnectionStatus: RequestHandler = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const connection = await prisma.connection.findFirst({
      where: {
        OR: [
          { senderId: userId, status: { in: ['pending', 'accepted'] } },
          { receiverId: userId, status: { in: ['pending', 'accepted'] } }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                firstname: true,
                lastname: true,
                imageUpload: true,
                city: true,
                state: true
              }
            }
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                firstname: true,
                lastname: true,
                imageUpload: true,
                city: true,
                state: true
              }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      connection,
      hasActiveConnection: !!connection
    });
  } catch (error: any) {
    console.error('Get connection status error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to get connection status"
    });
  }
};

// Accept connection request
export const handleAcceptConnection: RequestHandler = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { connectionId } = req.body;

    if (!connectionId) {
      return res.status(400).json({
        success: false,
        message: "Connection ID is required"
      });
    }

    // Verify the connection exists and user is the receiver
    const connection = await prisma.connection.findFirst({
      where: {
        id: parseInt(connectionId),
        receiverId: userId,
        status: 'pending'
      }
    });

    if (!connection) {
      return res.status(404).json({
        success: false,
        message: "Connection request not found or already processed"
      });
    }

    // Update connection status to accepted
    const updatedConnection = await prisma.connection.update({
      where: { id: parseInt(connectionId) },
      data: { status: 'accepted' },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            profile: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: "Connection accepted successfully",
      connection: updatedConnection
    });
  } catch (error: any) {
    console.error('Accept connection error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to accept connection"
    });
  }
};

// Disconnect (reject or remove connection)
export const handleDisconnect: RequestHandler = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { connectionId } = req.body;

    if (!connectionId) {
      return res.status(400).json({
        success: false,
        message: "Connection ID is required"
      });
    }

    // Verify the connection exists and user is part of it
    const connection = await prisma.connection.findFirst({
      where: {
        id: parseInt(connectionId),
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      }
    });

    if (!connection) {
      return res.status(404).json({
        success: false,
        message: "Connection not found"
      });
    }

    // Delete the connection
    await prisma.connection.delete({
      where: { id: parseInt(connectionId) }
    });

    res.json({
      success: true,
      message: "Connection removed successfully"
    });
  } catch (error: any) {
    console.error('Disconnect error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to disconnect"
    });
  }
};