const { validationResult } = require('express-validator');
const { uploadImage, deleteImage } = require('../utils/cloudinary')
const Product = require('../models/product');
const fs = require('fs-extra');

const getAllProducts = async (req, res) => {
    const product = await Product.find();
    res.json(product);
}

const getSomeProducts = async (req, res) => {
    const prods = req.body
    const products = []

    for (let i = 0; i < prods.length; i++) {
        const prod = prods[i]
        const product = await Product.findById(prod);
        products.push(product);
    }

    res.json(products);
}

const getOnetProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
}

const insertNewProduct = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    const { name, stock, price, priceSend, description, prodType } = req.body;

    const newProd = new Product({ name, stock, price, priceSend, description, prodType });

    if (req.files?.cover) {
        const resultUpload = await uploadImage(req.files.cover.tempFilePath)
        newProd.cover = {
            public_id: resultUpload.public_id,
            secure_url: resultUpload.secure_url
        }

        await fs.remove(req.files.cover.tempFilePath)
    }

    await newProd.save();

    console.log("Product save: ", newProd)

    res.json({ status: "Product save" })
}

const updateProduct = async (req, res) => {
    const { name, stock, price, priceSend, description, prodType } = req.body;
    const updateProd = { name, stock, price, priceSend, description, prodType };

    if (req.files?.cover) {
        const resultUpload = await uploadImage(req.files.cover.tempFilePath)
        updateProd.cover = {
            public_id: resultUpload.public_id,
            secure_url: resultUpload.secure_url
        }

        await fs.remove(req.files.cover.tempFilePath)
    }

    console.log("Product update: ", updateProd)

    await Product.findByIdAndUpdate(req.params.id, updateProd);
    res.json({ status: "Product update" })
}

const deleteProduct = async (req, res) => {
    console.log("Body: ", req.body)
    const product = await Product.findByIdAndRemove(req.params.id)
    await deleteImage(product.cover.public_id)
    res.json({ status: "Product delete" });
}

module.exports = {
    getAllProducts, getSomeProducts, getOnetProduct, insertNewProduct, updateProduct, deleteProduct
}