const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/index');
const teacherRouter = require('./routes/teacher');
const authRouter = require('./routes/auth')

const app = express();

//setup URI
const URI = 'mongodb+srv://superknife0512:Toan1234@node-app-oqduu.gcp.mongodb.net/Aka?retryWrites=true'

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//static serve setup
app.use(express.static(path.join(__dirname, 'public')));

//router setup
app.use('/', indexRouter);
app.use('/teacher', teacherRouter);
app.use('/teacher', authRouter);

//session setup
app.use(session({
  secret: 'Khoa ml',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 3600000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60*60,
    stringify: false,
  })
}))

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

mongoose.connect(URI, (err)=>{
  if(err){
    throw `${err} + Not working`
  }
})

module.exports = app;
