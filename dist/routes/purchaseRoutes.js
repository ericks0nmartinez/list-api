import express from "express";
import { createPurchases, getPurchase, getPurchases, updatePurchases, } from "../controllers/purchaseController";
const router = express.Router();
// Rota para salvar uma nova loja
router.get("/", getPurchase);
router.get("/all", getPurchases);
router.post("/", createPurchases);
router.patch("/", updatePurchases);
export default router;
