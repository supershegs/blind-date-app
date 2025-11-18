import type { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAcceptedConnectionForUser(userId: number) {
  return prisma.connection.findFirst({
    where: {
      status: 'accepted',
      OR: [
        { senderId: userId },
        { receiverId: userId }
      ]
    }
  });
}

// POST /api/date-plan  { dateTime, location, notes }
export const handleProposeDate: RequestHandler = async (req, res) => {
  try {
    const currentUserId = (req as any).user?.userId;
    if (!currentUserId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const { dateTime, location, notes } = req.body;
    if (!dateTime || !location) {
      return res.status(400).json({ success: false, message: 'dateTime and location are required' });
    }

    const connection = await getAcceptedConnectionForUser(currentUserId);
    if (!connection) {
      return res.status(400).json({ success: false, message: 'No accepted connection to plan a date.' });
    }

    // Ensure only one active proposed/accepted plan at a time
    const existingActive = await prisma.datePlan.findFirst({
      where: {
        connectionId: connection.id,
        status: { in: ['proposed', 'accepted'] }
      }
    });
    if (existingActive) {
      return res.status(400).json({ success: false, message: 'An active date plan already exists.' });
    }

    const plan = await prisma.datePlan.create({
      data: {
        connectionId: connection.id,
        proposerId: currentUserId,
        dateTime: new Date(dateTime),
        location,
        notes: notes || null
      }
    });

    res.json({ success: true, plan });
  } catch (e) {
    console.error('Propose date error:', e);
    res.status(500).json({ success: false, message: 'Failed to propose date' });
  }
};

// GET /api/date-plan/current
export const handleGetCurrentDatePlan: RequestHandler = async (req, res) => {
  try {
    const currentUserId = (req as any).user?.userId;
    if (!currentUserId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const connection = await getAcceptedConnectionForUser(currentUserId);
    if (!connection) {
      return res.json({ success: true, plan: null });
    }

    const plan = await prisma.datePlan.findFirst({
      where: { connectionId: connection.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, plan });
  } catch (e) {
    console.error('Get current date plan error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch date plan' });
  }
};

// PUT /api/date-plan/:id/accept
export const handleAcceptDatePlan: RequestHandler = async (req, res) => {
  try {
    const currentUserId = (req as any).user?.userId;
    if (!currentUserId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const id = parseInt(req.params.id);

    const plan = await prisma.datePlan.findUnique({ where: { id } });
    if (!plan) return res.status(404).json({ success: false, message: 'Date plan not found' });

    // Only non-proposer can accept
    if (plan.proposerId === currentUserId) {
      return res.status(400).json({ success: false, message: 'Proposer cannot accept their own plan' });
    }

    const updated = await prisma.datePlan.update({
      where: { id },
      data: { status: 'accepted' }
    });

    res.json({ success: true, plan: updated });
  } catch (e) {
    console.error('Accept date plan error:', e);
    res.status(500).json({ success: false, message: 'Failed to accept date plan' });
  }
};

// PUT /api/date-plan/:id/decline
export const handleDeclineDatePlan: RequestHandler = async (req, res) => {
  try {
    const currentUserId = (req as any).user?.userId;
    if (!currentUserId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const id = parseInt(req.params.id);

    const plan = await prisma.datePlan.findUnique({ where: { id } });
    if (!plan) return res.status(404).json({ success: false, message: 'Date plan not found' });

    if (plan.proposerId === currentUserId) {
      return res.status(400).json({ success: false, message: 'Proposer cannot decline their own plan' });
    }

    const updated = await prisma.datePlan.update({
      where: { id },
      data: { status: 'declined' }
    });

    res.json({ success: true, plan: updated });
  } catch (e) {
    console.error('Decline date plan error:', e);
    res.status(500).json({ success: false, message: 'Failed to decline date plan' });
  }
};

// DELETE /api/date-plan/:id  (cancel by proposer)
export const handleCancelDatePlan: RequestHandler = async (req, res) => {
  try {
    const currentUserId = (req as any).user?.userId;
    if (!currentUserId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const id = parseInt(req.params.id);

    const plan = await prisma.datePlan.findUnique({ where: { id } });
    if (!plan) return res.status(404).json({ success: false, message: 'Date plan not found' });

    if (plan.proposerId !== currentUserId) {
      return res.status(403).json({ success: false, message: 'Only proposer can cancel the plan' });
    }

    const updated = await prisma.datePlan.update({
      where: { id },
      data: { status: 'cancelled' }
    });

    res.json({ success: true, plan: updated });
  } catch (e) {
    console.error('Cancel date plan error:', e);
    res.status(500).json({ success: false, message: 'Failed to cancel date plan' });
  }
};
