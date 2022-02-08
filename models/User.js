const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

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

// userSchema의 save함수 전에 실행 
userSchema.pre('save',function(next){

    var user = this;

    //비밀번호 바꿀때
    if(user.isModified('password')){

        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(user.password,salt,function(err,hash){
             if(err) return next(err)

             user.password = hash
             next()
            })
        })
    }else{
        next()
    }
})

//모델 생성
const User = mongoose.model('User',userSchema);

//유저 모델을 다른 폴더에서도 사용할 수 있게 
module.exports = {User};
