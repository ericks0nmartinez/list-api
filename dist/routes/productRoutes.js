import express from "express";
import { createProducts, getProduct, getFindProduct, getValueProduct, getValueProductStore, getAllProducts, updateProducts, } from "../controllers/productController";
const router = express.Router();
// Rota para salvar uma nova loja
router.get("/", getProduct);
router.get("/find", getFindProduct);
router.get("/value", getValueProduct);
router.get("/value/store", getValueProductStore);
router.get("/all", getAllProducts);
router.post("/", createProducts);
router.patch("/", updateProducts);
export default router;
