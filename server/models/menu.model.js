const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    isVeg: { 
        type: Boolean, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    ratings: { 
        type: Number, 
        default: 0 
    },
    // You can store the image URL or use a file upload mechanism.
    // For simplicity, we'll store the URL as a string here.
    image: {
        type: String, 
        required: true 
    },
},{
    versionKey:false
});

const Menu = mongoose.model('Menu', menuSchema); 

module.exports = Menu;
