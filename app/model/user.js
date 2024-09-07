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
   
})

const userModel = mongoose.model('user', UserSchema);

module.exports =userModel