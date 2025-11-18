import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Send a message
export const handleSendMessage: RequestHandler = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = (req as any).user?.userId;

    if (!senderId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (!receiverId || !content || content.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Receiver ID and message content are required' 
      });
    }

    // Check if users have an accepted connection
    const connection = await prisma.connection.findFirst({
      where: {
        OR: [
          { senderId, receiverId, status: 'accepted' },
          { senderId: receiverId, receiverId: senderId, status: 'accepted' }
        ]
      }
    });

    if (!connection) {
      return res.status(403).json({
        success: false,
        message: 'You can only message users you have an accepted connection with'
      });
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content: content.trim()
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
                imageUpload: true
              }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
};

// Get conversation between two users
export const handleGetConversation: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = (req as any).user?.userId;

    if (!currentUserId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const otherUserId = parseInt(userId);

    // Check if users have an accepted connection
    const connection = await prisma.connection.findFirst({
      where: {
        OR: [
          { senderId: currentUserId, receiverId: otherUserId, status: 'accepted' },
          { senderId: otherUserId, receiverId: currentUserId, status: 'accepted' }
        ]
      }
    });

    if (!connection) {
      return res.status(403).json({
        success: false,
        message: 'You can only view conversations with accepted connections'
      });
    }

    // Get all messages between the two users
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUserId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: currentUserId }
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
                imageUpload: true
              }
            }
          }
        },
        receiver: {
          select: {
            id: true,
            username: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Mark received messages as read
    await prisma.message.updateMany({
      where: {
        senderId: otherUserId,
        receiverId: currentUserId,
        isRead: false
      },
      data: {
        isRead: true
      }
    });

    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch conversation'
    });
  }
};

// Get all conversations (list of users with whom you have messages)
export const handleGetConversations: RequestHandler = async (req, res) => {
  try {
    const currentUserId = (req as any).user?.userId;

    if (!currentUserId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get all accepted connections
    const connections = await prisma.connection.findMany({
      where: {
        OR: [
          { senderId: currentUserId, status: 'accepted' },
          { receiverId: currentUserId, status: 'accepted' }
        ]
      },
      include: {
        sender: {
          include: {
            profile: true
          }
        },
        receiver: {
          include: {
            profile: true
          }
        }
      }
    });

    // Get the last message for each connection
    const conversationsPromises = connections.map(async (connection) => {
      const otherUserId = connection.senderId === currentUserId 
        ? connection.receiverId 
        : connection.senderId;
      
      const otherUser = connection.senderId === currentUserId 
        ? connection.receiver 
        : connection.sender;

      // Get last message
      const lastMessage = await prisma.message.findFirst({
        where: {
          OR: [
            { senderId: currentUserId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: currentUserId }
          ]
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // Count unread messages
      const unreadCount = await prisma.message.count({
        where: {
          senderId: otherUserId,
          receiverId: currentUserId,
          isRead: false
        }
      });

      return {
        userId: otherUserId,
        username: otherUser.username,
        profile: otherUser.profile,
        lastMessage: lastMessage?.content || null,
        lastMessageTime: lastMessage?.createdAt || connection.updatedAt,
        unreadCount,
        connectionStatus: connection.status
      };
    });

    const conversations = await Promise.all(conversationsPromises);

    // Sort by last message time
    conversations.sort((a, b) => 
      new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );

    res.json({
      success: true,
      conversations
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch conversations'
    });
  }
};

// Get unread message count
export const handleGetUnreadCount: RequestHandler = async (req, res) => {
  try {
    const currentUserId = (req as any).user?.userId;

    if (!currentUserId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const unreadCount = await prisma.message.count({
      where: {
        receiverId: currentUserId,
        isRead: false
      }
    });

    res.json({
      success: true,
      unreadCount
    });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch unread count'
    });
  }
};
