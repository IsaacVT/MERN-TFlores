const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const StateSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            require: true
        },
        delegations: {
            type: Array,
            trim: true,
            require: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("State", StateSchema);