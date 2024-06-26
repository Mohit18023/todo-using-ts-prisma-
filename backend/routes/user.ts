import express, { Request, Response } from "express";
const router = express.Router();
import zod from "zod";
import { PrismaClient } from "@prisma/client";
import jwt, { Secret, GetPublicKeyOrSecret } from "jsonwebtoken";
import { authMiddleware } from "../middleware";
import bcrypt from "bcrypt";

// Ensure JWT_SECRET is defined correctly
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;
// Define the schema for the user
const signupSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8),
});

// define the hash password
async function hashPassword(password: string): Promise<string> {
    try{
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        return hashedPassword;
    }
    catch(err){
        throw new Error("Password hashed failed");
    }
}

async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const match: boolean = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    // Log or handle the error appropriately
    console.error("Password comparison failed:", err);
    throw new Error("Password comparison failed");
  }
}

// Define the Prisma client
const prisma = new PrismaClient();

router.post("/register", async (req: Request, res: Response) => {
  // Validate the request body
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }

  // Check if the user already exists
  const userExists = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (userExists) {
    return res.status(411).json({
      message: "User already exists",
    });
  }
   const hashedPassword = await hashPassword(req.body.password);
  // Create the user
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
  });
  const userId = user.id;

  // Check if JWT_SECRET is defined
  if (!JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret is not defined" });
  }

  // Create the token
  const token = jwt.sign({ userId }, JWT_SECRET as Secret) as string;

  res.status(200).json({
    message: "User created successfully",
    token,
  });
});

// login Schema
const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

router.post("/login", async (req: Request, res: Response) => {
  // Validate the request body
  const { success } = loginSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    // If the user does not exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    if (!(await comparePassword(req.body.password, user.password))) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Check if JWT_SECRET is defined
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not defined" });
    }

    // Create the token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET as Secret) as string;

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// update Schema
const updateSchema = zod.object({
  name: zod.string().optional(),
  email: zod.string().email().optional(),
  password: zod.string().min(8).optional(),
});

router.put("/update", authMiddleware, async (req: Request, res: Response) => {
  try {
    // Check if req.userId is defined
    if (typeof req.userId === "undefined") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate the request body
    const { success } = updateSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ message: "Invalid Inputs" });
    }

    // Convert req.userId to a number
    const userId = parseInt(req.userId);
    if (isNaN(userId)) {
      // Handle case where req.userId is not a valid number
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Ensure user exists
    if (!user) {
      // Handle case where user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Proceed with the update operation
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });

    // return the updated user
    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
