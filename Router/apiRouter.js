const express=require('express')
const ApiAuthController = require('../app/controller/ApiAuthController')
const { authCheckforApi } = require('../app/middleware/authCheck')
const Router=express.Router()


Router.post('/register',ApiAuthController.register)
Router.post('/login',ApiAuthController.login)
Router.get('/dashboard',authCheckforApi ,ApiAuthController.dashboard)
Router.post('/update-password',authCheckforApi,ApiAuthController.updatePassword)
Router.post('/forget-password',ApiAuthController.forgetPassword)


module.exports=Router