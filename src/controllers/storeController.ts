import { Request, Response } from "express";
import { StoreModel } from "../models/Store";

// Retorna uma loja pelo ID
export const getStore = async (req: Request, res: Response) => {
  const { address, name, id } = req.query;
  try {
    let store;
    if (name) {
      const regex = new RegExp(`${name}`, "i");
      store = await StoreModel.find({
        name: regex,
      });
    }

    if (address) {
      store = await StoreModel.findOne({ address: address });
    }
    if (id) {
      store = await StoreModel.findById(id);
    }

    if (!store) {
      return res.status(404).json({ message: "Loja não encontrada" });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar loja", error });
  }
};

// Retorna todas as lojas
export const getStores = async (req: Request, res: Response) => {
  try {
    const stores = await StoreModel.find();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar lojas", error });
  }
};

// Cria uma nova loja
export const createStore = async (req: Request, res: Response) => {
  const { name, address, cep, number, longitude, latitude } = req.body;
  try {
    const newStore = new StoreModel({
      name,
      address,
      cep,
      number,
      longitude,
      latitude,
    });

    const savedStore = await newStore.save();

    res.status(201).json(savedStore);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar loja", error });
  }
};
