import { NextFunction, Request, Response } from "express";
import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;


// Middleware to check JWT token

function checkToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization; // Get token from localStorage

  if (token) {
    // Ensure JWT_SECRET is defined before using it
    if (!JWT_SECRET) {
      throw new Error("JWT secret is not defined");
    }

    const secretOrPublicKey: Secret | GetPublicKeyOrSecret = JWT_SECRET;
    jwt.verify(token, secretOrPublicKey, (err, decoded) => {
      if (err) {
        // Token verification failed
        res.status(401).json({ message: "Invalid token" });
      } else {
        // Token is valid, redirect to dashboard
        res.redirect("api/v1/dashboard");
      }
    });
  } else {
    // No token found, continue to next middleware
    next();
  }
}

export default checkToken;