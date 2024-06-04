import mongoose, { Schema, Document } from "mongoose";

interface ProductModel extends Document {
  idUser: string;
  idStore: string;
  name: string;
  price: number;
  unitType: "quilo" | "unidade" | "pacote/caixa" | "litro" | undefined;
  quantity: number;
  packegeQuantity: number;
  total: number;
}

const productModelSchema: Schema = new Schema({
  idUser: { type: String, required: true },
  idStore: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number },
  unitType: {
    type: String,
    enum: ["quilo", "unidade", "pacote/caixa", "litro", undefined],
  },
  packegeQuantity: {
    type: Number,
  },

  quantity: { type: Number },
  total: { type: Number },
});

export const ProductModel = mongoose.model<ProductModel>(
  "Product",
  productModelSchema
);
