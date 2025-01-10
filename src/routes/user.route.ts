import express from "express";
import { userController } from "../controllers";

const router = express.Router();

router.post("/create", userController.createUser as any);
router.get("/", userController.fetchUsers as any);
router.get("/:id", userController.fetchUserById as any);
router.delete("/", userController.deleteUsers as any);

export default router;
