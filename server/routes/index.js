var express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const { User } = require('../models');

//회원가입 페이지
router.get('/auth', isNotLoggedIn, (req, res) => {
  console.log('로그인 화면 호출 성공');
  res.send('로그인 화면 호출 성공')
  res.render('login', {
      title: '회원가입 - R_note',
      user: req.user,
      // signupError: req.flash('signupError'),
  });
});

// 메인페이지
router.post('/',isLoggedIn, (req, res, next) => {
  
  return res.status(201).send(true);
  // res.send('메인페이지 호출 성공')
  // res.render('main', {
  //     title: 'r_note',
  //     user: req.user,
  //     // loginError: req.flash('loginError'),
  //   });
});

router.post('/main',isLoggedIn, (req, res, next) => {
  console.log('메인렌더링');
  // res.send('메인페이지 호출 성공')
  console.log(req.user);
  // console.log(req.user);
  return res.status(201).json(true);

});

module.exports = router;
