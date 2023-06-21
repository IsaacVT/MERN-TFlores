const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        products: {
            type: Schema.Types.Map,
            of: Schema.Types.Number,
            require: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model("Cart", CartSchema);