# node-react-basic

## 프로젝트 설명
**node js 와 react js를 사용하여 로그인, 로그아웃, 회원가입, auth를 경험하는 기본적인 프로젝트**

node js (express js) : 서버 사이드에서 js를 실행 (js로 서버단 기술까지 제어), 프레임워크  
react js (redux) : virtual dom을 이용하여 변경된 컴포넌트만 렌더링, jsx 등..., 라이브러리  

참고 강의 :[따라하며 배우는 노드, 리액트 시리즈 - 기본 강의](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/lecture/37076?tab=curriculum)  

## 추가 설치 library
### 설치하는법  
npm install express --save   
npm install nodemon --save-dev  

### react
npx creat-react-app 
* antd - css
* axios - 비동기 요청(ajax같은)
* http-proxy-middleware - cors 이슈
* redux - 참고 사이트 [Redux 정리](https://kyun2da.dev/%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC/Redux-%EC%A0%95%EB%A6%AC/)
* react-redux 
* redux-promise
* redux-thunk

### node
npm init 
* express - node js 편리하게 쓸수있는 lib
* body-parser - json 및 여러 type 가져올수 있게 설정
* cookie-parser - 쿠키  
* bcript - 암호화
* nodemon - 소스코드 변경 저장해도 서버 재시작 안해도됨
* jsonwebtoken - 토큰 생성 
* mongoose - 몽고db
* concurrently - 한번으로 서버+클라이언트 서버 시작  




