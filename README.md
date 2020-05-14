# Fave v1 Homepage for StrongFriend

(주)건강한친구의 홈페이지 코드입니다.  
반응형으로 디자인되었습니다.  
**데스크탑 화면입니다.**
![데스크탑 화면](https://user-images.githubusercontent.com/29043491/81529677-4c259700-939a-11ea-9666-c8ffe1085129.PNG)  
**모바일 화면입니다.**  
![모바일 화면](https://user-images.githubusercontent.com/29043491/81529687-4fb91e00-939a-11ea-80a9-f42c6c466e94.PNG)

## 기술스택

mongoDB와 Express, pug, Sass, vanilla javascript를 통해서 구현되었습니다.  
현재 aws의 ec2를 사용하여 호스팅되어 있습니다.  
[홈페이지 보러가기](https://www.faves.co.kr)

## 컴파일 및 압축

es6와 sass, 코드 압축 및 uglify 등을 사용하기 위해서 babel과 gulp를 통해서 개발환경을 구축했습니다.  
[gulp 보러가기](https://gulpjs.com/)  
구현한 코드는 **gulpfile.babel.js** 파일을 통해서 확인할 수 있습니다.

## 결제 기능 추가

결제 기능은 아임포트를 통해서 추가했습니다.  
[아임포트 공식홈페이지 가기](https://www.iamport.kr/)  
아임포트는 PG사를 하나 사용하는 것은 무료, 2개 이상은 서비스 금액을 지불해야합니다.  
국내결제의 경우 이니시스(구축완료)를 통해서 제공되고, 해외 결제는 페이팔을 통해서 제공됩니다.  
[아임포트 사용후기 및 정리글](https://minhanpark.github.io/today-i-learned/iamport/)

## https 적용됨

aws의 로드밸런싱을 통해서 전 페이지가 다 https가 적용되어 있습니다.  
해당 구현은 블로그글을 통해서 확인 가능합니다.  
[https 적용하기](https://minhanpark.github.io/today-i-learned/apply-https/)

## 검색엔진 최적화

robots.txt를 추가하여 검색 엔진 최적화를 하고 있습니다.

```js
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(
    "User-agent: *\nDisallow: /admin/\nDisallow: /store/orders/\nDisallow: /store/orders/kr/\nDisallow: /store/orders/jp/\n"
  );
});
```

Express의 미들웨어를 통해서 robots.txt를 추가했고, admin 페이지와 store/orders 페이지에는 로봇이 접근하지 않도록 robots.txt가 구성되어 있습니다.  
[Express에 robots.txt 적용하기](https://minhanpark.github.io/today-i-learned/robots-txt/)

## 이미지 업로드는 Multer를 통해서 구현함

공지사항에 이미지를 올리면 Multer를 통해서 업로드 됩니다.  
지금은 공지사항에 추가되는 것이 거의 없어 로컬환경에 올리도록 구성되어 있지만  
나중에 공지사항이 자주 추가되는 시점이 오면 aws의 s3에 Multer를 통해서 올리는 작업을 추가할 예정입니다.

## 사용자에게 메일 보내기 구현

일정량의 메일을 무료로 제공하는 nodemailer를 통해서 메일 보내기 기능이 구현되었습니다.  
[노드메일러 공식홈페이지 가기](https://nodemailer.com/about/)  
비밀번호 찾기 및 사용자의 문의 및 질문이 관리자에게 전달되는 기능을 만드는데 사용중입니다.  
![ContactUs](https://user-images.githubusercontent.com/29043491/81529712-5e073a00-939a-11ea-866b-46e00206e918.PNG)

## 회원가입 구현

회원가입의 경우 passport-local과 passport-local-mongoose를 통해서 구현되었습니다.  
[passport-local-mongoose 문서 확인하기](https://github.com/saintedlama/passport-local-mongoose)  
passport-local-mongoose를 사용하면 회원가입 시 salt 및 암호화가 자동으로 진행되기 때문에  
passport-local과 mongoose를 사용하고 있다면 사용할만한 모듈이라고 생각합니다.
![회원가입 페이지](https://user-images.githubusercontent.com/29043491/81529703-58a9ef80-939a-11ea-9f07-9a712e0e4713.PNG)
