const express=require('express')
const PostController = require('../app/controller/PostController')

const Router=express.Router()


Router.post('/post',PostController.store)
Router.get('/list',PostController.list)


//*********for ejs testing routes *********** */

Router.get('/post/list',PostController.index)



module.exports=Router