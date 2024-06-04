import { Request, Response } from "express";
import { ProductModel } from "../models/Product";

// Retorna um produto pelo ID
export const getProduct = async (req: Request, res: Response) => {
  const { id, idUser, idStore, name } = req.query;

  let product;
  try {
    if (id) product = await ProductModel.findById(id);

    if (idUser && idStore) {
      product = await ProductModel.find({ idUser, idStore });
    }

    if (name) {
      const regex = new RegExp(`${name}`, "i");
      product = await ProductModel.find({
        name: regex,
      });
    }
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produto", error });
  }
};

// Retorna todos os produtos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
};

// Cria um novo produto
export const createProducts = async (req: Request, res: Response) => {
  const productsData = req.body; // Recebe o array de produtos no corpo da requisição
  try {
    // Salva todos os produtos no banco de dados
    const createdProducts = await ProductModel.create(productsData);

    res.status(201).json(createdProducts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produtos", error });
  }
};

// Atualiza um produto
export const updateProducts = async (req: Request, res: Response) => {
  const { id } = req.query;
  const updateProductData = req.body; // Recebe os dados do novo produto no corpo da requisição

  try {
    // Verifica se o ID é fornecido
    if (!id) {
      return res
        .status(400)
        .json({ message: "É necessário fornecer um ID para a atualização" });
    }

    // Atualiza o documento com o ID fornecido
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: id },
      updateProductData,
      { new: true } // Opção new:true retorna o documento atualizado
    );

    // Verifica se o documento foi encontrado e atualizado
    if (!updatedProduct) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o produto", error });
  }
};
