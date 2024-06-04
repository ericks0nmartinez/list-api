import mongoose, { Schema, Document } from "mongoose";

// Definição do esquema da compra
interface PurchaseModel extends Document {
  idUser: string;
  nameUser: string;
  addressUser: string;
  latitudeUser?: string; // tornando opcional, já que está como opcional no JSON
  longitudeUser?: string; // tornando opcional, já que está como opcional no JSON
  purchase: PurchaseItem[];
}

interface PurchaseItem {
  idStore: string;
  nameStore: string;
  latitudeStore?: string; // tornando opcional, já que está como opcional no JSON
  longitudeStore?: string; // tornando opcional, já que está como opcional no JSON
  totalPrice: number;
}

const purchaseItemSchema: Schema = new Schema({
  idStore: { type: String, required: true },
  nameStore: { type: String, required: true },
  latitudeStore: { type: String },
  longitudeStore: { type: String },
  totalPrice: { type: Number, default: 0 },
});

const purchaseSchema: Schema = new Schema({
  idUser: { type: String, required: true },
  nameUser: { type: String, required: true },
  addressUser: { type: String, required: true },
  latitudeUser: { type: String },
  longitudeUser: { type: String },
  purchases: [purchaseItemSchema], // Incorporando o esquema do item de compra
});

export const PurchaseModel = mongoose.model<PurchaseModel>(
  "Purchase",
  purchaseSchema
);
