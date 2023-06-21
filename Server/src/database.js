require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");

const URI = process.env.URI;

mongoose.set("strictQuery", true);

mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err.message));

module.exports = mongoose;
