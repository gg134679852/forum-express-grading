const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const adminController = {
  getRestaurants: (req, res,callback) => {
    return Restaurant.findAll({ raw: true, nest: true, include: [Category] }).then(restaurants => {
      callback({ restaurants: restaurants })
    })
  },
  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, {
      include: [Category]
    }).then(restaurant => {
      callback({ restaurant: restaurant })
      })
    },
  Categories: (req, res, callback) => {
    return Category.findAll({ raw: true, nest: true }).then(categories => {
      callback({ categories: categories })
    })
  }
}
module.exports = adminController