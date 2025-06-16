// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/UserModel'; // Adjust the import based on your user model location

interface JwtPayload {
  sub: string;
  role: IUser['role'];
  iat: number;
  exp: number;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

/**
 * Verify JWT & attach payload to req.user.
 * Sends 401 on missing/invalid token, otherwise calls next().
 */
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or malformed token' });
    return;
  }

  const token = authHeader.slice(7); // remove "Bearer "
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Role guard: only allows through if req.user.role is in allowedRoles.
 * Sends 403 otherwise.
 */
export const authorize = (...allowedRoles: IUser['role'][]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const user = req.user;
    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    next();
  };
};
