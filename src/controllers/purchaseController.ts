import { Request, Response } from "express";
import { PurchaseModel } from "../models/Purchase";

// Retorna uma compra pelo ID
export const getPurchase = async (req: Request, res: Response) => {
  const { id, idUser } = req.query;
  let purchase;
  try {
    if (id) purchase = await PurchaseModel.findById(id);
    if (idUser )
      purchase = await PurchaseModel.findOne({
        idUser: idUser
      });
    if (!purchase) {
      return res.status(404).json({ message: "Compra não encontrada" });
    }

    res.json(purchase);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar compra", error });
  }
};

// Retorna todas as compras
export const getPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await PurchaseModel.find();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar compras", error });
  }
};

// Cria uma nova compra
export const createPurchases = async (req: Request, res: Response) => {
  const purchasesData = req.body; // Recebe o array de compras no corpo da requisição
  try {
    // Verifica se os dados recebidos são um array
    if (!Array.isArray(purchasesData.purchases)) {
      return res
        .status(400)
        .json({ message: "Os dados devem ser fornecidos em um array" });
    }

    // Salva todas as compras no banco de dados
    const createdPurchases = await PurchaseModel.create(purchasesData);

    res.status(201).json(createdPurchases);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar compras", error });
  }
};

export const updatePurchases = async (req: Request, res: Response) => {
  const { id } = req.query;
  const updatePurchaseData = req.body; // Recebe os dados do novo item de compra no corpo da requisição

  try {
    // Verifica se o ID é fornecido
    if (!id) {
      return res
        .status(400)
        .json({ message: "É necessário fornecer um ID para a atualização" });
    }

    // Atualiza o documento com o ID fornecido
    const updatedPurchase = await PurchaseModel.findByIdAndUpdate(
      { _id: id },
      updatePurchaseData,
      { new: true } // Opção new:true retorna o documento atualizado
    );

    // Verifica se o documento foi encontrado e atualizado
    if (!updatedPurchase) {
      return res.status(404).json({ message: "Compra não encontrada" });
    }

    res.status(200).json(updatedPurchase);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar a compra", error });
  }
};
