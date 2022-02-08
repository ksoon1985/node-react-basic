//index.js - back-end 서버 시작점 

/*
    express.js 다운 -> npm install express --save 
    node.js에서 사용되는 기본 library 

    기본 라우팅 : URI 및 HTTP 요청 메소드인 특정 엔드포인트에 대한
    클라이언트 요청에 애플리케이션이 응답하는 방법
    
    ex) /user 라우트에 대한 put 요청에 응답  
    app.put('/user',function(req,res){
        res.send('got a put request at /user');
    })
*/

const express = require('express') //express 모듈 가져오기
const app = express() //express app만들기
const port = 4000
const bodyParser = require('body-parser') //body-parser 모듈 가져오기 
const {User} = require("./models/User")
const config = require("./config/key")
const cookieParser = require('cookie-parser')
const {auth} = require('./middleware/auth')

// 참고 express 4.0 이상부턴 body-parser가 내장됨. 
// body-parser 설정 
// application/x-www-form-urlencoded 타입 가져올수 있게
app.use(bodyParser.urlencoded({extended:true}))
// application/json 타입 가져올수 있게
app.use(bodyParser.json())

//cookie-parser 사용 
app.use(cookieParser())

//mongoose 모듈 가져오기(mongoDb 편하게 사용하게 해주는 lib)
const mongoose = require('mongoose') 
const req = require('express/lib/request')
// mongo db connect
mongoose.connect(config.mongoURI,{
    //useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
    //위 옵션은 6.0 이상부턴 기본 적용이 되므로 주석처리 
}).then(()=> console.log('MongoDB Connected ...'))
.catch(err =>  console.log(err));//연결 오류 


app.get('/',(req,res) => res.send('Hello world'))


app.post('/register',(req,res)=>{
    
    //회원가입에 할때 필요한 정보들을 client에서 가져오면 그것들을 db에 저장

    const user = new User(req.body);

    user.save((err,userInfo)=>{
        if(err) return res.json({success:false,err})
        
        return res.status(200).json({
            success:true
        })
    })
})

app.post('/login',(req,res)=>{
    
    //요청된 이메일을 db에서 있는지 찾는다.
    User.findOne({email:req.body.email},(err,user)=>{

        if(!user){
            return res.json({
                loginSuccess : false,
                message:"제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        //요청된 이메일이 db에 있다면 비밀번호가 맞는지 확인.   
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.json({
                    loginSuccess: false,
                    message:"비밀번호가 틀렸습니다."
                })
            }

            //비밀번호가 맞다면 토큰을 생성
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err)

                // 토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지, 세션
                // 쿠키
                res.cookie("x_auth",user.token)
                .status(200)
                .json({
                    loginSuccess: true,
                    userId:user._id
                })
            })
        })
    })

    
})


app.get('/api/users/auth',auth,(req,res)=>{

    //여기까지 미들웨어(auth) 를 통과해 왔다는 것은 Authentication 이 true 라는 말 
    
    // role 1 -> 어드민
    // role 0 -> 일반유저
    res.status(200).json({
        _id:req.user._id,
        idAdmin: req.user.role === 0 ? false : true,
        isAuth:true,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
        role:req.user.role,
        image:req.user.image
    })

})


app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},
        {token:""},
        (err,user) =>{
            if(err) return res.json({success:false,err});

            return res.status(200).send({
                success:true
            })
    })
})

app.listen(port,()=> console.log(`Example app listening on port ${port}!`))

