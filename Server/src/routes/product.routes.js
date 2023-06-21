const { Router } = require('express');
const { check, body, } = require('express-validator');
const fileUpload = require('express-fileupload');
const router = Router();

const { getAllProducts, getSomeProducts, getOnetProduct, insertNewProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Show all data
router.get('/getProducts', getAllProducts);
router.post('/getConcretProducts', getSomeProducts);

// Show one data
router.get('/getProduct/:id', getOnetProduct);

// Insert data
router.post('/saveProduct', fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
    preserveExtension: true
}),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('stock', 'Stock es obligatorio').not().isEmpty(),
    check('price', 'Hay un error con el precio').not().isEmpty().isNumeric(),
    check('priceSend', 'Hay un error con el precio de envio').not().isEmpty().isNumeric(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('prodType', 'El tipo de producto es obligatorio').not().isEmpty(),
    check('cover', 'No hay ningún archivo cargado').isEmpty(),
    insertNewProduct
);

// Update data
router.put('/updateProduct/:id', fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
    preserveExtension: true
}),
    updateProduct
);

// Delete specific data
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;