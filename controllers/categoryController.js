const db = require('../models')
const Category = db.Category
const adminService = require('../services/adminService')
const categoryController = {
  getCategories: (req, res) => {
    adminService.getCategories(req,res,(data)=>{
      res.render('admin/categories',data)
    })
  },
  postCategory: (req, res)=>{
    adminService.postCategory(req, res, (data) => {
      res.render('admin/categories', data)
    })
  },
  putCategory: (req, res) => {
    adminService.putCategory(req, res, (data) => {
      res.render('admin/categories', data)
    })
  },
  deleteCategory: (req, res) => {
    adminService.deleteCategory(req, res, (data) => {
      res.render('admin/categories', data)
    })
  }
}

module.exports = categoryController