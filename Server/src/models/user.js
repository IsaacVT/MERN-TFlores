const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
        names: {
            type: String,
            trim: true,
            require: true,
        },
        lastName: {
            type: String,
            trim: true,
            require: true,
        },
        birthday: {
            type: Date,
            trim: true,
            require: true,
        },
        cellphone: {
            type: Number,
            trim: true,
            require: true,
        },
        street: {
            type: String,
            trim: true,
            require: true,
        },
        number: {
            type: String,
            trim: true,
            require: true,
        },
        cp: {
            type: String,
            trim: true,
            require: true,
        },
        delegation: {
            type: String,
            trim: true,
            require: true,
        },
        state: {
            type: String,
            trim: true,
            require: true,
        },

        userType: {
            type: String,
            enum: ["ADMIN", "CLIENT"],
            default: "CLIENT",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", UserSchema);
