require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression');
const helmet = require('helmet');

const clientRouter = require('./routes/client');
const teacherRouter = require('./routes/teacher');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

const Teacher = require('./models/Teacher');

const app = express();

//setup URI
const URI = process.env.MONGODB_CONNECTION_STRING

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression());
app.use(helmet());

//static serve setup
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/course-page',express.static(path.join(__dirname, 'public')));
app.use('/course-page/public',express.static(path.join(__dirname, 'public')));
app.use('/teacher-page',express.static(path.join(__dirname, 'public')));
app.use('/teacher-page/public',express.static(path.join(__dirname, 'public')));
app.use('/album',express.static(path.join(__dirname, 'public')));
app.use('/album/public',express.static(path.join(__dirname, 'public')));
app.use('/event-page',express.static(path.join(__dirname, 'public')));
app.use('/event-page/public',express.static(path.join(__dirname, 'public')));


app.use('/teacher', express.static(path.join(__dirname, 'public')));
app.use('/teacher/public', express.static(path.join(__dirname, 'public')));
app.use('/teacher/reset', express.static(path.join(__dirname, 'public')));

app.use('/admin', express.static(path.join(__dirname, 'public')));
app.use('/admin/public', express.static(path.join(__dirname, 'public')));
app.use('/admin/course/public', express.static(path.join(__dirname, 'public')));
app.use('/admin/event/public', express.static(path.join(__dirname, 'public')));
app.use('/admin/teacher-info/edit/public', express.static(path.join(__dirname, 'public')));
app.use('/admin/online-course/public', express.static(path.join(__dirname, 'public')));
app.use('/admin/online-course', express.static(path.join(__dirname, 'public')));


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

//user login
app.use(async (req,res,next)=>{
  if(req.session.teacher){
    const teacherId = req.session.teacher._id.toString();
    req.teacher = await Teacher.findById(teacherId);
    res.locals.isLogin = req.session.isLogin;
  } else {
    res.locals.isLogin = false;
  }
  next();
})

//router setup
app.use('/', clientRouter);
app.use('/teacher', teacherRouter);
app.use('/teacher', authRouter);
app.use('/admin', adminRouter);

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
  res.render('error',{
    path: 'Error',
    title: 'Error',
    contacts: [
      {
          icon: 'images/contact.svg#icon-phone',
          desc: '078 275 9831 - 094 942 9254',
      },
      {
          icon: 'images/contact.svg#icon-map',
          desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
      },

    ],

    socials: [
        {
            icon: 'images/contact.svg#icon-facebook',
            desc: 'https://www.facebook.com/Superknife0512',
        },
        {
            icon: 'images/contact.svg#icon-googleplus',
            desc: 'https://bom.to/0vEt3',
        },

    ]
  
  });
});

mongoose.connect(URI, (err)=>{
  if(err){
    throw `${err} + Not working`
  }
})

module.exports = app;
