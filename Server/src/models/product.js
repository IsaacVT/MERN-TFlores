const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        stock: {
            type: Number,
            trim: true,
            required: true,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
        },
        priceSend: {
            type: Number,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },

        prodType: {
            type: String,
            enum: ["RAMO", "ARREGLO", "CANASTA", "KIT", "SET"],
            required: true,
        },

        cover: {
            type: Object,
            public_id: String,
            secure_url: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Product", ProductSchema);
