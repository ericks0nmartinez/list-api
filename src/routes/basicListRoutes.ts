import express from "express";
import {
  getAllBasicProducts,
  createBasicProduct,
  deleteBasicProduct,
  getBasicProductById,
  updateBasicProduct,
  getBasicProductorder,
} from "../controllers/basicListController";

const router = express.Router();

// Rota para salvar uma nova loja
router.get("/", getBasicProductById);
router.get("/find", getBasicProductorder);
router.get("/all", getAllBasicProducts);
router.post("/", createBasicProduct);
router.patch("/", updateBasicProduct);

export default router;
