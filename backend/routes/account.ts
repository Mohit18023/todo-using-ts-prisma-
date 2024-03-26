import express, { Response,Request } from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
import zod from 'zod';
import { authMiddleware } from '../middleware';
const prisma = new PrismaClient();

const addSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    completed: zod.boolean().optional()
});

router.post("/add", authMiddleware, async (req: Request, res: Response) => {
  const todo = req.body as todoType;

  // Validate the request body against the schema
  const { success } = addSchema.safeParse(todo);

  if (!success) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }

  try {
    // Create a new todo item
    const newTodo = await prisma.todos.create({
      data: {
        title: todo.title,
        description: todo.description,
        completed: todo.completed || false,
        userId: parseInt(req.userId || ""),
      },
    });

    res.status(200).json({ message: "Todo added successfully", todo: newTodo });
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/todos", authMiddleware, async (req: Request, res: Response) => {
  try {
    // Fetch todos for the authenticated user
    const userTodos = await prisma.todos.findMany({
      where: {
        userId: parseInt(req.userId || ""), // Convert req.userId to a number
      },
    });

    // Send the todos as a response
    res.status(200).json({ todos: userTodos });
  } catch (error) {
    // Handle any errors that may occur during the database query
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

interface todoType {
    title: string,
    description:string,
    completed: boolean
}
router.put("/delete", authMiddleware, async (req: Request, res: Response) => {
  const todoTitle = req.query.todo as string; // Extract todo title from query parameter

  if (!todoTitle) {
    return res.status(400).json({
      message: "Give an appropriate todo title",
    });
  }

  try {
    // Find the todo with the given title for the authenticated user
    const findTodo = await prisma.todos.findFirst({
      where: {
        title: todoTitle,
      },
    });

    if (!findTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // Proceed with deleting the found todo item
    const deletedTodo = await prisma.todos.delete({
      where: {
        id: findTodo.id,
      },
    });

    return res.status(200).json({
      message: "Todo deleted successfully",
    });

  } catch (error) {
    console.error("Error finding todo:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;