const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            trim: true,
            require: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        direction: {
            type: String,
            trim: true,
            required: true,
        },
        products: {
            type: Map,
            of: {
                name: { type: String, required: true },
                amount: { type: Number, required: true },
                price: { type: Number, required: true },
                send: { type: Number, required: true },
                total: { type: Number, required: true }
            }
        },
        total: {
            type: Number,
            trim: true,
            require: true,
        },
        status: {
            type: String,
            enum: ["order_placed", "order_shipped", "order_canceled"],
            default: "order_placed",
            trim: true,
        },
        payment: {
            type: String,
            enum: ["PENDING", "SUCCESS", "REFUNDED"],
            default: "PENDING",
            trim: true,
        },
        shipment: {
            type: String,
            enum: ["PENDING", "IN TRANSIT", "DELIVERED"],
            default: "PENDING",
            trim: true,
        },
        comment: {
            type: String,
            enum: ["WE ARE PREPARING YOUR ORDER", "YOUR ORDER HAS BEEN PROCESSED"],
            default: "WE ARE PREPARING YOUR ORDER",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Order", OrderSchema);
