import { UserModel } from "../models/User.js";
// Retorna um usuário pelo ID
export const getUsers = async (req, res) => {
    const { name, address } = req.query;
    try {
        let user;
        if (name) {
            user = await UserModel.findOne({ name: name });
        }
        else if (address) {
            user = await UserModel.findOne({ address: address });
        }
        else {
            return res.status(400).json({
                message: "Informe um nome ou endereço para buscar o usuário.",
            });
        }
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuário", error: error });
    }
};
// Retorna todos os usuários
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuários", error: error });
    }
};
// Cria um novo usuário
export const createUser = async (req, res) => {
    const { name, address, number } = req.body;
    try {
        const newUser = new UserModel({
            name,
            address,
            number,
        });
        const createdUser = await newUser.save();
        res.status(201).json(createdUser);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar usuário", error });
    }
};
