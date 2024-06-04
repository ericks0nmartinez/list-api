import mongoose, { Schema, Document } from "mongoose";

// Definição da interface do usuário
export interface UserModel extends Document {
  _id: string;
  name: string;
  address: string;
  number?: number;
}

// Definição do esquema do usuário
const userSchema: Schema = new Schema({
  name: { type: String, required: false },
  address: { type: String, required: true },
  number: { type: Number },
});

// Definição do modelo do usuário
export const UserModel = mongoose.model<UserModel>("User", userSchema);
