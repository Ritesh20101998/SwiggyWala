const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required : true
    },
    mobile:{
        type:Number,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    token: {
        type: String,
        default : ''
    }
},{
    versionKey:false
})

const User = mongoose.model("user",userSchema);

module.exports = User;