import express from "express";
import {
  createProducts,
  getProduct,
  getProducts,
  updateProducts,
} from "../controllers/productController";

const router = express.Router();

// Rota para salvar uma nova loja
router.get("/", getProduct);
router.get("/all", getProducts);
router.post("/", createProducts);
router.patch("/", updateProducts);

export default router;
