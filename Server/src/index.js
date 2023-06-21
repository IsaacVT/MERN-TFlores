require("dotenv").config({ path: "./config.env" });
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

require("./database");
const app = express();

// Configuration
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("./tmp", express.static(path.join(__dirname, "tmp")));

// Routes
app.use("/api/mern", require("./routes/account.routes"));
app.use("/api/mern", require("./routes/user.routes"));
app.use("/api/mern", require("./routes/product.routes"));
app.use("/api/mern", require("./routes/state.routes"));
app.use("/api/mern", require("./routes/cart.routes"));
app.use("/api/mern", require("./routes/order.routes"));
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

// Start the server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});

module.exports = app;
