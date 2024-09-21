const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
       
    },
    password: {
        type: String,
        
    },
    mobile: {
        type: String,
        required: [true,"mobile require"]
    },
    first_school: {
        type: String,
        required: [true,"school name require"]
    },
    city: {
        type: String,
        required:false,
    },
    role: {
        type: String,
        enum: ["USER","HR","ADMIN"],
        default:"USER"
      },

})

const userModel = mongoose.model('user', UserSchema);

module.exports =userModel