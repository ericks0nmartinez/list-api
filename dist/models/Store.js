import mongoose, { Schema } from "mongoose";
const storeSchema = new Schema({
    name: { type: String, required: true },
    category: { 
        type: String,
        enum: ["Posto", "Alimento", "Construção"],
        required: true
        },
    address: { type: String },
    cep: { type: String, required: true },
    number: { type: String, required: true },
    longitude: { type: String },
    latitude: { type: String },
});
export const StoreModel = mongoose.model("Store", storeSchema);
