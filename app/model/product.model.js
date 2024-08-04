const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const productSchemavalidation = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    price: Joi.string()
    .min(3)
    .max(30)
    .required(),
    description: Joi.string().min(3).max(100).required()
   
})
    



const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    price: {
        type: String,
        required: [true, 'Price is required!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
    },
    image: {
        type: String,
        default: 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
    }
})

const productModel = mongoose.model('product', productSchema);

module.exports = {productModel,productSchemavalidation};