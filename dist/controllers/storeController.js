import { StoreModel } from "../models/Store.js";
// Retorna uma loja pelo ID
export const getStore = async (req, res) => {
    // refatorar para buscar listar resultado até 80% da palavra certa 
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
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar loja", error });
    }
};

export const getCategoryStore = async (req, res) => {
    // refatorar para buscar listar resultado até 80% da palavra certa 
    const { category } = req.query;
    try {
        let store;
        if (category) {
            const regex = new RegExp(`${category}`, "i");
            store = await StoreModel.find({
                category: regex,
            });
        }
        
        if (!store) {
            return res.status(404).json({ message: "Loja não encontrada" });
        }
        res.json(store);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar loja", error });
    }
};

// Retorna todas as lojas
export const getStores = async (req, res) => {
    try {
        const stores = await StoreModel.find();
        res.json(stores);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar lojas", error });
    }
};

export const getStoresCategories = async (req, res) => {
    try {
      const stores = await StoreModel.find();
  
      // Extrair categorias únicas
      const categories = [...new Set(stores.map(store => store.category))];
  
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar categorias", error });
    }
  };
// Cria uma nova loja
export const createStore = async (req, res) => {
    const { name, address, cep, number, longitude, latitude, category } = req.body;
    try {
        const newStore = new StoreModel({
            name,
            category,
            address,
            cep,
            number,
            longitude,
            latitude,
        });
        const savedStore = await newStore.save();
        res.status(201).json(savedStore);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar loja", error });
    }
};
