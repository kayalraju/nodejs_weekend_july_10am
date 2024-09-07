const express = require('express');
const productController = require('../app/controller/product.controller');
const uploadProductImage = require('../app/helper/ProductImageUpload');
const userController = require('../app/controller/userController');
const auth = require('../app/middleware/auth');

const router = express.Router();

router.get('/',userController.registerView);
router.get('/login',userController.loginView);
router.post('/regisetr',userController.register);
router.post('/login/create',userController.login);


router.get('/userdashboard',auth.authCheck,userController.Authuser,userController.userDashboard)
router.get('/logout',auth.authCheck,userController.Authuser,userController.logout)


module.exports = router;