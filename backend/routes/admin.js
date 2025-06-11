const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const adminAuth = require('../middleware/adminAuth');

// Admin routes
router.get('/users', adminAuth, userController.getUsers);
router.put('/users/:id', adminAuth, userController.updateUser);
router.delete('/users/:id', adminAuth, userController.deleteUser);

router.get('/products/manage', adminAuth, productController.getProducts);
router.post('/products/manage', adminAuth, upload.single('image'), productController.createProduct);

router.get('/orders/manage', adminAuth, orderController.getOrders);
router.put('/orders/:id/status', adminAuth, orderController.updateOrder);

// Dashboard
router.get('/dashboard',  adminController.getDashboardData);

module.exports = router;