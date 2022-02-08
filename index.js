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

// 참고 express 4.0 이상부턴 body-parser가 내장됨. 
// body-parser 설정 
// application/x-www-form-urlencoded 타입 가져올수 있게
app.use(bodyParser.urlencoded({extended:true}))
// application/json 타입 가져올수 있게
app.use(bodyParser.json())


const mongoose = require('mongoose') //mongoose 모듈 가져오기(mongoDb 편하게 사용하게 해주는 lib)
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


app.listen(port,()=> console.log(`Example app listening on port ${port}!`))

