const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const adminService = require('../services/adminService')
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = 'd5542556c0e077f'

const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => { return res.render('admin/restaurants'), data })
  },
  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => { return res.render('admin/restaurant'), data })
  },
  createRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return res.render('admin/create', {
        categories: categories
      })
    })
  },
  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants')
    })
  },
  editRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return Restaurant.findByPk(req.params.id).then(restaurant => {
        return res.render('admin/create', {
          categories: categories,
          restaurant: restaurant.toJSON()
        })
      })
    })
  },
  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants/:id')
    })
  },
  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => {
      if (data['status'] === 'success') {
        return res.redirect('/admin/restaurants')
      }
    })
  },
  getUsers: (req, res) => {
    return User.findAll({ raw: true })
      .then(users => {
        return res.render('admin/users', { users: users })
      })
  },
  toggleAdmin: (req, res) => {
    return User.findByPk(req.params.id)
    .then((user)=>{
      user.update({ isAdmin: !user.isAdmin })
    })
    .then(()=>{
      req.flash('success_messages', 'user was successfully to update')
      res.redirect('/admin/users')
    })
  }
}
module.exports = adminController