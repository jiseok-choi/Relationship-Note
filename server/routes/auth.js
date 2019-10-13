//회원가입 라우터
const express = require('express');
const passport = require('passport'); //패스포트 전략을 여기서 사용한다.
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares'); //
const { User } = require('../models');

const router = express.Router();

//클라이언트 요청 POST /auth/signup 으로 들어온다.
router.post('/signup', isNotLoggedIn, async (req, res, next) => { //router(미들웨어1, 미들웨어2, 미들웨어3) 이런 구조
    console.log('회원가입 요청');
    const { email, userid, password, name } = req.body.data; //
    console.log(email, userid, password, name);
    
    try {
      const exUser = await User.findOne({ where: { email } }); //이메일 있는지 검사
      if (exUser) {
        // req.flash('signupError', '이미 가입된 이메일입니다.'); //1회성 메세지 보내기
        // return res.redirect('/signup'); //회원가입 페이지로 다시 돌려보내는 것
        console.log('이미 회원가입 했음');
        return res.status(201).send('이미 가입된 이메일 입니다.');
      }
      const hash = await bcrypt.hash(password, 12); //회원정보 없다면 비밀번호를 암호화 하는 것이다
      const newUser = await User.create({ //
        email,
        userid,
        password: hash,
        name,
      });
      console.log('회원가입 완료');
      return res.status(201).json(newUser); //메인페이지로 보내는 것
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });
  
  //클라이언트 요청 POST /auth/login 으로 들어온다.
  router.post('/login', isNotLoggedIn, (req, res, next) => { //req.body.data.userid, --password
    // console.error(req.body);
    passport.authenticate('local', (authError, user, info) => { //done(에러, 성공, 실패)
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        //   console.log(req.body);
          return res.status(201).send(info.message+ ' 유저없음');
        // req.flash('loginError', info.message);
        // return res.redirect('/');
      }
      return req.login(user, (loginError) => { // req.user 사용자 정보가 들어있다.
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        console.log('로그인 요청시도')
        // return res.redirect('/');
        console.log('로그인??',req.isAuthenticated());
          return res.status(201).json(user);
          
      });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
  });

  router.get('/logout', isLoggedIn, (req, res) => { //로그인 한사람들만
    req.logout();
    req.session.destroy(); //세션을 지우면서 다른 세션도 같이 지워져서 logout 시 안해도 된다.
    return res.status(200).json('logout');
          // res.redirect('/');
  });


module.exports = router;