import mongoose, { Schema } from "mongoose";
const basicProductModelSchema = new Schema({
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
export const BasicProductModel = mongoose.model("BasicProduct", basicProductModelSchema);
