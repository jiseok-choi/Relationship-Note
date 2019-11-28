// 두개의 미들웨어 (req, res, next) 가 존재하면 미들웨어이다.

exports.isLoggedIn = (req, res, next) => {
  console.log(req.isAuthenticated());
    if (req.isAuthenticated()) { //로그인 여부를 알려줌
      console.log("req",req);
      next();
    } else {
      res.status(403).send(false);
    }
  };
  
  exports.isNotLoggedIn = (req, res, next) => {
    console.log( '로그인 안된거 검사',req.isAuthenticated());
    if (!req.isAuthenticated()) { //로그인을 안했으면
      next(); //다음페이지로 넘어간다.
    } else {
      // res.redirect('/');
    }
  };
  