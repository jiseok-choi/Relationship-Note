const local = require('./localStrategy');
const { User } = require('../models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    //{ id: 1, name: choi, age: 27 }
    console.log('serializeUser 호출됨@@@@@@@@@@@@@@')
    done(null, user.id); //모든 사용자정보는 무거우니까 유니크한 것만, 유니크한것은 id이다. mongodb면 user_id 이다.
  });
    
  //메모리에 저장된 1번만 저장된걸 찾아서 db에서 찾아서 user정보를 복구하는 것이다.
  passport.deserializeUser(async (id, done) => {
  console.log('deserializeUser 호출됨!!!!!!!!!!!!')
    try{

    
      // 1 -> { id:1, name: choi, age:27 } -> req.user 로 변환
      // User.findOne({ where: { id } })
      //   .then(user => done(null, user))
      //   .catch(err => done(err));
  
      const user = await User.findOne({
        where: { id }, //현재 아이디가 누군지?
        // include: [{ //팔로워 가져오기
        //   model: User, 
        //   attributes: ['id', 'nick'],
        //   as: 'Followers',
        // }, { //팔로윙 가져오기
        //   model: User,
        //   attributes: ['id', 'nick'],
        //   as: 'Followings',
        // }],
      })
      return done(null, user); //req.user
        // .then(user => done(null, user)) //req.user 에 저장
        // .catch(err => done(err));
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local(passport);


}