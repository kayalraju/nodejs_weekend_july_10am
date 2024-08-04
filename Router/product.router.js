const express = require('express');
const productController = require('../app/controller/product.controller');
const uploadProductImage = require('../app/helper/ProductImageUpload');

const router = express.Router();

router.post('/create/product',uploadProductImage.single('image'), productController.createProduct);
router.get('/get/product', productController.fetchAllProduct);
router.get('/get/product/:id', productController.fetchProductById);
router.put('/edit/product/:id', productController.editProduct);
router.delete('/delete/product/:id', productController.deleteProduct);

module.exports = router;