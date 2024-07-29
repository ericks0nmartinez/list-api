import express from "express";
import {
  createStore,
  getStore,
  getStores,
  getCategoryStore,
  getStoresCategories
} from "../controllers/storeController";

const router = express.Router();

// Rota para salvar uma nova loja
router.get("/", getStore);
router.get("/all", getStores);
router.post("/", createStore);
router.get("/category", getCategoryStore);
router.get("/categories", getStoresCategories);
export default router;
