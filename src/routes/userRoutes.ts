import express from "express";
import {
  getUsers,
  getAllUsers,
  createUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/all", getAllUsers);

export default router;
