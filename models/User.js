const mongoose = require('mongoose')

//스키마 생성 
const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true, //공백 제거
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0 
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }

});

//모델 생성
const User = mongoose.model('User',userSchema);

//유저 모델을 다른 폴더에서도 사용할 수 있게 
module.exports = {User};
