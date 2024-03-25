import jwt, { Secret, GetPublicKeyOrSecret } from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

// Define the type for the response object
interface CustomResponse {
  message: string;
}

// Ensure JWT_SECRET is defined correctly
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

// Extend the Request interface to include the authorization property
declare global {
  namespace Express {
    interface Request {
      authorization?: string;
      userId?: string;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response<CustomResponse>,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  // Extract token from the header
  const token = authHeader.split(" ")[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Ensure JWT_SECRET is defined before using it
    if (!JWT_SECRET) {
      throw new Error("JWT secret is not defined");
    }

    const secretOrPublicKey: Secret | GetPublicKeyOrSecret = JWT_SECRET;
    const decode = jwt.verify(token, secretOrPublicKey) as { userId: string };
    req.userId = decode.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
