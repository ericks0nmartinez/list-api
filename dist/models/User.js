import mongoose, { Schema } from "mongoose";
// Definição do esquema do usuário
const userSchema = new Schema({
    name: { type: String, required: false },
    address: { type: String, required: true },
    number: { type: Number },
});
// Definição do modelo do usuário
export const UserModel = mongoose.model("User", userSchema);
