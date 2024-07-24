import { ProductModel } from "../models/Product.js";
// Retorna um produto pelo ID
export const getProduct = async (req, res) => {
    const { id, idUser, idStore, name } = req.query;
    try {
        let query = {};
        if (id) {
            query = { _id: id };
        }
        else if (idUser && idStore) {
            query = { idUser, idStore };
        }
        else if (name) {
            query = { name: new RegExp(`${name}`, "i") };
        }
        // Busca o produto com base na consulta e ordena por updatedAt (descendente) e createdAt (descendente)
        const products = await ProductModel.find(query)
            .sort({ updatedAt: -1, createdAt: -1 });
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar produto", error });
    }
};
export const getFindProduct = async (req, res) => {
    const { name } = req.query;
    try {
        let query = {};
        if (name) {
            query = { name: new RegExp(`${name}`, "i"), idStore: { $ne: "my-list" } };
        }
        // Busca o produto com base na consulta e ordena por updatedAt (descendente) e createdAt (descendente)
        const products = await ProductModel.find(query)
            .sort({ updatedAt: -1, createdAt: -1 })
            .limit(5);
        if (!products || products.length === 0) {
            return res.json(products.map(product => {
                return {
                    _id: product._id,
                    name: product.name,
                    idStore: product.idStore,
                    price: product.price,
                    packegeQuantity: product.packegeQuantity,
                    unitType: product.unitType
                };
            }));
        }
        res.json(products.map(product => {
            return {
                _id: product._id,
                name: product.name,
                idStore: product.idStore,
                price: product.price,
                packegeQuantity: product.packegeQuantity,
                unitType: product.unitType
            };
        }));
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar produto", error });
    }
};
export const getValueProduct = async (req, res) => {
    const { name } = req.query;
    try {
        let products;
        if (name) {
            const regex = new RegExp(`${name}`, "i");
            products = await ProductModel.find({
                name: regex,
                price: { $ne: 0 } // Considera apenas produtos com preço diferente de zero
            })
                .sort({ updatedAt: -1, createdAt: -1 });
        }
        let findMinValue;
        if (!products || products.length === 0) {
            if (!products || products.length === 0) {
                return res.json({ name: name, price: "Não tem", findIdStore: "Não tem" });
            }
        }
        const minPrices = {};
        // Itera sobre os produtos encontrados
        for (const product of products) {
            const { name, price, idStore } = product;
            // Se ainda não tiver um menor preço registrado para esse produto
            if (!(name in minPrices) || price < minPrices[name].price) {
                minPrices[name] = {
                    name: name,
                    price: price,
                    idStore: idStore
                };
                findMinValue = { name: name, price: minPrices[name].price, findIdStore: minPrices[name].idStore };
            }
        }
        res.json(findMinValue);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar produto", error });
    }
};
export const getValueProductStore = async (req, res) => {
    // esse get buscará apenas duas lojas da lista.
    // se na lista de comparação houver 3 lojas aparecendo, faz sentido mostrar as duas lojas que contando tem mais itens relacionando na lista.
    // para fazer a rquesição de um outro controller vou implementar aqui dentro também a busca do controleer purchase
    const { name, idStore } = req.query;
    try {
        let products;
        if (name && idStore) {
            const regex = new RegExp(`${name}`, "i");
            products = await ProductModel.find({
                name: regex,
                idStore: idStore,
                price: { $ne: 0 } // Considera apenas produtos com preço diferente de zero
            })
                .sort({ updatedAt: -1, createdAt: -1 });
        }
        let findMinValue;
        if (!products || products.length === 0) {
            if (!products || products.length === 0) {
                return res.json({ name: name, price: "Não tem", findIdStore: "Não tem" });
            }
        }
        const minPrices = {};
        // Itera sobre os produtos encontrados
        for (const product of products) {
            const { name, price, idStore } = product;
            // Se ainda não tiver um menor preço registrado para esse produto
            if (!(name in minPrices) || price < minPrices[name].price) {
                minPrices[name] = {
                    name: name,
                    price: price,
                    idStore: idStore
                };
                findMinValue = { name: name, price: minPrices[name].price, findIdStore: minPrices[name].idStore };
            }
        }
        res.json(findMinValue);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar produto", error });
    }
};
// Retorna todos os produtos
export const getAllProducts = async (req, res) => {
    try {
        // Busca todos os produtos ordenados por updatedAt (descendente) e createdAt (descendente)
        const products = await ProductModel.find()
            .sort({ updatedAt: -1, createdAt: -1 });
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar produtos", error });
    }
};
// Cria um novo produto
export const createProducts = async (req, res) => {
    const productsData = req.body; // Recebe o array de produtos no corpo da requisição
    // Para cada produto em productsData, seta createdAt, updatedAt e status
    productsData.createdAt = `${new Date()}`;
    productsData.updatedAt = "";
    productsData.status = "active";
    try {
        // Salva todos os produtos no banco de dados
        const createdProducts = await ProductModel.create(productsData);
        res.status(201).json(createdProducts);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar produtos", error });
    }
};
// Atualiza um produto
export const updateProducts = async (req, res) => {
    const { id } = req.query;
    const updateProductData = req.body; // Recebe os dados do novo produto no corpo da requisição
    // Define updatedAt como a data e hora atuais
    updateProductData.updatedAt = new Date();
    try {
        // Verifica se o ID é fornecido
        if (!id) {
            return res
                .status(400)
                .json({ message: "É necessário fornecer um ID para a atualização" });
        }
        // Atualiza o documento com o ID fornecido
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateProductData, { new: true } // Opção new:true retorna o documento atualizado
        );
        // Verifica se o documento foi encontrado e atualizado
        if (!updatedProduct) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o produto", error });
    }
};
