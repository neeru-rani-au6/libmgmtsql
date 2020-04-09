 require('./models/sequelize');

const express = require('express')
const dotenv=require('dotenv');
const bodyParser = require('body-parser')
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var expressValidator = require('express-validator');
var session=require('express-session');
var indexRouter = require('./routes/indexrouters');
var bookRouter = require('./routes/bookroutes');
var userRouter = require('./routes/userrouters');
adminRouter=require('./routes/adminroutes');
logRouter=require('./routes/logroutes');
const app = express()

dotenv.config();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

 app.use('/', indexRouter);
 //app.use('/users', usersRouter);
 app.use('/books', bookRouter);
 app.use('/users', userRouter);
 app.use('/admin', adminRouter);
 app.use('/logs', logRouter);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//session
// app.use(session({
//     name:"LibraryManagement",
//     secret:process.env.SESSION_SECRET_KEY,
//     resave:false,
//     saveUninitialized:false,
//     cookie:{
//         maxAge:1000*60*30,
//         httpOnly:true,
//         sameSite:"strict",
//         secure:false
//     }
// }));
/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;