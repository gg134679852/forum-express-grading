const express = require('express')
const router = express.Router()
const adminController = require('../controllers/api/adminController.js')
const categoryController = require('../controllers/api/categoryController')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router.get('/admin/restaurants', adminController.getRestaurants)
router.get('/admin/restaurant', adminController.getRestaurant)
router.get('/admin/categories', categoryController.getCategories)
router.post('/admin/categories', categoryController.postCategories)
router.put('/admin/categories/:id', categoryController.putCategory)
router.delete('/admin/categories/:id', categoryController.deleteCategory)
router.post('/admin/restaurants', upload.single('image'), adminController.postRestaurant)
router.put('/admin/restaurants/:id', upload.single('image'), adminController.putRestaurant)
router.delete('/admin/restaurants/:id', adminController.deleteRestaurant)

module.exports = router