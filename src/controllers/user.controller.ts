import { Request, Response } from "express";
import prisma from "../prisma/client";
import { supabase } from "../supabase/client";
import { userService } from "../services";

class UserController {
  createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const existingUser = await userService.fetchUserByEmail(email);

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      const user = await userService.createUser(name, email);

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error creating user" });
    }
  };

  fetchUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const users = await userService.fetchUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching users" });
    }
  };

  fetchUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const user = await userService.fetchUserById(Number(id));
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching user" });
    }
  };

  deleteUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      await userService.deleteAllUsers();
      return res.status(204).json({ message: "Users deleted" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting users" });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const user = await userService.fetchUserById(Number(id));
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await userService.deleteUser(Number(id));
      return res.status(204).json({ message: "User deleted" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting user" });
    }
  };
}

export default new UserController();
