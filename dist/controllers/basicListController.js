import { BasicProductModel } from "../models/BasicList.js";
// Retorna todos os produtos da lista básica
export const getAllBasicProducts = async (req, res) => {
    try {
        const products = await BasicProductModel.find();
        res.json(products);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Erro ao buscar produtos da lista básica", error });
    }
};
// Retorna um produto da lista básica pelo ID
export const getBasicProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await BasicProductModel.findById(productId);
        if (!product) {
            return res
                .status(404)
                .json({ message: "Produto da lista básica não encontrado" });
        }
        res.json(product);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Erro ao buscar produto da lista básica", error });
    }
};
export const getBasicProductorder = async (req, res) => {
    const { name } = req.query;
    let product;
    try {
        if (name) {
            const regex = new RegExp(`${name}`, "i");
            product = await BasicProductModel.find({
                name: regex,
            });
        }
        if (!product) {
            return res
                .status(404)
                .json({ message: "Produto da lista básica não encontrado" });
        }
        res.json(product);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Erro ao buscar produto da lista básica", error });
    }
};
// Cria um novo produto na lista básica
export const createBasicProduct = async (req, res) => {
    const { name, unitType, packegeQuantity, brand, uf } = req.body;
    try {
        const newProduct = new BasicProductModel({
            name,
            unitType,
            packegeQuantity,
            brand,
            uf,
        });
        const createdProduct = await newProduct.save();
        res.status(201).json(createdProduct);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Erro ao criar produto na lista básica", error });
    }
};
// Atualiza um produto da lista básica pelo ID
export const updateBasicProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, unitType, packegeQuantity, brand } = req.body;
    try {
        const updatedProduct = await BasicProductModel.findByIdAndUpdate(productId, { name, unitType, packegeQuantity, brand }, { new: true });
        if (!updatedProduct) {
            return res
                .status(404)
                .json({ message: "Produto da lista básica não encontrado" });
        }
        res.json(updatedProduct);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Erro ao atualizar produto da lista básica", error });
    }
};
// Remove um produto da lista básica pelo ID
export const deleteBasicProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await BasicProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res
                .status(404)
                .json({ message: "Produto da lista básica não encontrado" });
        }
        res.json({ message: "Produto da lista básica excluído com sucesso" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Erro ao excluir produto da lista básica", error });
    }
};
