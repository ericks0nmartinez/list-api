import mongoose, { Schema, Document } from "mongoose";

// Definição do esquema da loja
interface StoreModel extends Document {
  _id: string;
  name: string;
  address: string;
  cep: string;
  number: string;
  longitude: string;
  latitude: string;
}

const storeSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  cep: { type: String, required: true },
  number: { type: String, required: true },
  longitude: { type: String },
  latitude: { type: String },
});

export const StoreModel = mongoose.model<StoreModel>("Store", storeSchema);
