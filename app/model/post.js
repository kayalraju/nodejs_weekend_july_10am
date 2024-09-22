const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const postSchemavalidation = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),
   postdata : Joi.string()
    .min(3)
    .max(100)
    .required(),
    author: Joi.string().min(3).max(30).required()
   
})
    



const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    postdata: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required:true
    },
   
})

const postModel = mongoose.model('post', postSchema);

module.exports = {postModel,postSchemavalidation};