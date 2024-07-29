import mongoose, { Schema, Document } from "mongoose";

// Definição do esquema da loja
interface StoreModel extends Document {
  _id: string;
  name: string;
  category: "Posto" | "Alimento" | "Construção";
  address: string;
  cep: string;
  number: string;
  longitude: string;
  latitude: string;
}

const storeSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  category: {
    type: String,
    enum: ["Posto", "Alimento", "Construção"],
    required: true },
  cep: { type: String, required: true },
  number: { type: String, required: true },
  longitude: { type: String },
  latitude: { type: String },
});

export const StoreModel = mongoose.model<StoreModel>("Store", storeSchema);
