const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerName: { 
        type: String, 
        required: true 
    },
    orderItems: [
        {
            recipeId: { 
                type: Schema.Types.ObjectId, 
                ref: 'Menu' 
            }, // Reference to the Menu model
            quantity: { 
                type: Number, 
                required: true 
            },
        },
    ],
    totalPrice: { 
        type: Number, 
        required: true 
    },
  // You can include additional fields such as order date, delivery address, etc.
});

module.exports = mongoose.model('Order', orderSchema);
