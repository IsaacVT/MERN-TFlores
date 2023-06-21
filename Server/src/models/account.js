const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

const AccountSchema = new Schema(
    {
        email: {
            type: String,
            trim: true,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            trim: true,
            require: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

AccountSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

AccountSchema.methods.comparePass = async function (passwordField) {
    return await bcrypt.compare(passwordField, this.password);
};

module.exports = model("Account", AccountSchema);
