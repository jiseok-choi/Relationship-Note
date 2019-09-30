var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config(); //.env 설정

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
// var usersRouter = require('./routes/users');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
sequelize.sync();
passportConfig(passport);



// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('port', process.env.PORT || 8000); //포트 설정

app.use(morgan('dev'));
app.use(cors({
  // origin: "http://localhost:3000",
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
      httpOnly: true,
      secure: false,
  },
  // store: new FileStore(),
}));
app.use(flash()); //1회성 메세지
app.use(passport.initialize()); //설정초기화 (미들웨어 연결)
app.use(passport.session()); //로그인시 로컬로 로그인했을때 세션에 저장하는 역할

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 서버 실행중입니다.`);
});


module.exports = app;
