import mongoose, { Schema } from "mongoose";
const purchaseItemSchema = new Schema({
    idStore: { type: String, required: true },
    nameStore: { type: String, required: true },
    latitudeStore: { type: String },
    longitudeStore: { type: String },
    totalPrice: { type: Number, default: 0 },
});
const purchaseSchema = new Schema({
    idUser: { type: String, required: true },
    nameUser: { type: String, required: true },
    addressUser: { type: String, required: true },
    latitudeUser: { type: String },
    longitudeUser: { type: String },
    purchases: [purchaseItemSchema], // Incorporando o esquema do item de compra
});
export const PurchaseModel = mongoose.model("Purchase", purchaseSchema);
