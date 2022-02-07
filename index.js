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

const express = require('express'); //express 모듈 가져오기
const app = express(); //express app만들기
const port = 5000;

const mongoose = require('mongoose'); //mogoose 모듈 가져오기(mongoDb 편하게 사용하게 해주는 lib)
mongoose.connect('mongodb+srv://soonshine:rnjscnltk12@boilerplate.9zqjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    //useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
    //위 옵션은 6.0 이상부턴 기본 적용이 되므로 주석처리 
}).then(()=> console.log('MongoDB Connected ...')) //정상적으로 연결
.catch(err =>  console.log(err));//연결 오류 

app.get('/',(req,res) => res.send('Hello world'));

app.listen(port,()=> console.log(`Example app listening on port ${port}!`));

