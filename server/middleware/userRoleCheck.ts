import type { RequestHandler } from "express";

export const requireRole = (allowedRoles: string[]): RequestHandler => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions"
      });
    }

    next();
  };
};

// Explicit function declarations
export const requireAdminOnly: RequestHandler = (req, res, next) => {
  return requireRole(['admin'])(req, res, next);
};

export const requireUser: RequestHandler = (req, res, next) => {
  return requireRole(['user', 'admin'])(req, res, next);
};