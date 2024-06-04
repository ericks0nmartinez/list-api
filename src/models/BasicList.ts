import mongoose, { Schema, Document } from "mongoose";

interface BasicProductModel extends Document {
  name: string;
  unitType:
    | "quilo"
    | "unidade"
    | "pacote/caixa"
    | "litro"
    | "ml"
    | "g"
    | undefined;
  packegeQuantity: number;
  brand: string;
  basic: boolean;
  uf: string;
}

const basicProductModelSchema: Schema = new Schema({
  name: { type: String, required: true },
  unitType: {
    type: String,
    enum: ["quilo", "unidade", "pacote/caixa", "litro", "ml", "g"],
    required: true,
  },
  packegeQuantity: {
    type: Number,
    required: true,
  },
  brand: { type: String, required: true },
  basic: { type: Boolean, required: true },
  uf: { type: String },
});

export const BasicProductModel = mongoose.model<BasicProductModel>(
  "BasicProduct",
  basicProductModelSchema
);
