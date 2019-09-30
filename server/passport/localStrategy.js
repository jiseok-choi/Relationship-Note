const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({ //첫번째 인자
    usernameField: 'userid', //urlencoded 미들웨어가 해석한 req.body의 값들을 받아준다 (req.body.userid)
    passwordField: 'password',//req.body.password
    session: true, //세션에 저장여부
  }, async (userid, password, done) => { //이메일, 비번, 성공시 상황을 파람으로 받음
  
  console.log('12번째줄까지 탐');
    try { //done(에러, 성공, 실패)
      const exUser = await User.findOne({ where: { userid } }); //사용자의 이메일이 존재하면
      if (exUser) { //있으면 비밀번호 검사
        const result = await bcrypt.compare(password, exUser.password); //사용자가 입력한패스워드, db의 비번 비교를 비교하여
        if (result) { // 검사후 
          return done(null, exUser); //성공자리에 사용자정보를 넣는다.
        } else {
          return done(null, false, { message: '비밀번호가 일치하지 않습니다.' }); //실패 자리에는 실패메세지를 넣는다.
        }
      } else {
        return done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));

};
