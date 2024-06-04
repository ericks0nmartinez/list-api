import express from "express";
import {
  createStore,
  getStore,
  getStores,
} from "../controllers/storeController";

const router = express.Router();

// Rota para salvar uma nova loja
router.get("/", getStore);
router.get("/all", getStores);
router.post("/", createStore);

export default router;
