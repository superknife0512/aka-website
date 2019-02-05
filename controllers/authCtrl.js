const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

const defaultEmail = process.env.DEFAULT_EMAIL

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createErr = (msg, statusCode)=>{
    const err = new Error(msg);
    err.statusCode = statusCode;
    throw err
}

exports.getLogin = (req,res,next)=>{
    res.render('teachers/login',{
        title: 'Login',
        error: false
    })
}

exports.postLogin = async (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    try{
        // check if existing a teacher
        const teacher = await Teacher.findOne({email: email});
        console.log(teacher);
        if(!teacher){
            return res.render('teachers/login',{
                title: 'login',
                error: 'Wrong email, please try again'
            })
        }
        const result =await bcrypt.compare(password, teacher.password);
        if(!result){
            return res.render('teachers/login',{
                title: 'login',
                error: 'Wrong password, please try again'
            })
        }
            req.session.teacher = teacher;
            req.session.isLogin = true;

            await req.session.save((err)=>{
                if(err){
                    throw err;
                }
            });

            if(teacher.role === 'admin'){
                res.redirect('/admin')
            } else if (teacher.role === 'teacher'){
                res.redirect('/teacher')
            }

    } catch (err) {
        next(err);
    }
}

exports.getSignup = (req,res,next)=>{
    res.render('teachers/signup',{
        title: 'Signup'
    })
}

exports.emailCheck= async (req,res,next) => {
    const email = req.body.email;
    try{
        const teacher = await Teacher.findOne({email: email}).select('name');
        if(teacher){
            //have an existing email
            res.json({
                msg: 'Your email is existed! You can not use this!',
                canUse: false,
            })
        } else {
            res.json({
                msg: 'You can use this',
                canUse: true,
            })
        }

    } catch (err){
        res.json({
            err,
        })
    }
}

exports.postSignup =async (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const teacherName = req.body.teacherName;
    const specialty = req.body.specialty;
    const story = req.body.story; 
    const roleCode = req.body.roleCode;
    let role;
    try{
        if(email === '' || password === '' || teacherName === ''){
            return createErr('You must enter all * fields', 422);
        }

        //check role code 
        const teacherRole = await bcrypt.compare('teacher', roleCode);
        const adminRole = await bcrypt.compare('admin', roleCode);

        //check duplicate code 
        const dupCode = await Teacher.findOne({roleCode: roleCode});
        if(dupCode){
            return createErr('Your code is invalid, comeback and try again');
        }

        if (teacherRole) {//check role 
            role = 'teacher';
        } else if(adminRole){
            role = 'admin';
        } else {
            return createErr('Your code is invalid, please try another!')
        }
        
        let avatarUrl;
        if(req.file){
            avatarUrl = req.file.path;
        } else {
            avatarUrl = 'public/teacherData/avatar/default.png';
        }

        const hassPass = await bcrypt.hash(password, 15);
        const teacher = new Teacher({
            email,
            password: hassPass,
            name: teacherName,
            specialty,
            story,
            avatar: avatarUrl,
            role,
            roleCode,
        })

        await teacher.save();
        console.log('Teacher has been save');
        res.redirect('/teacher/login')

    } catch (err) {
        next(err)
    }
}

exports.sendCode =async (req,res,next)=>{
    const role = req.body.role;
    try{

        const roleCode = await bcrypt.hash(role, 15);    
        const msg = {
            from: 'admin@danguAK.com',
            to: defaultEmail,
            subject: 'Your role code!',
            html: ` 
                <h3>This is your ${role} code</h3>
                <p>-------------------------------------------------------------</p>
                <p style="color: red">${roleCode}</p>
                <p>-------------------------------------------------------------</p>
                <p>Enter to the code field</p>`
        }

        sgMail.send(msg, (err, resonse)=>{
            if(err){
                throw err
            } else {
                console.log('Sent role code');
                res.json({
                    msg: 'Your mail has been send!'
                })
            }
        })        
    

    } catch (err) { 
        next(err);
    }    
}

exports.codeCheck =async (req,res,next)=>{
    const code = req.body.code;
    try{
        //check if code is duplicated
        const dupCode =await Teacher.findOne({roleCode: code});
        if(dupCode){
            return res.json({
                msg: 'This code has been used please try another one'
            })
        }

        // check role of the code
        const teacher =await bcrypt.compare('teacher', code);
        const admin = await bcrypt.compare('admin', code);

        if(teacher){
            return res.json({
                msg: 'This is teacher code'
            })
        } else if (admin){
            return res.json({
                msg: 'This is admin code'
            })
        } else {
            return res.json({
                msg: 'This is invalid code'
            })
        }

    } catch (err) {
        res.json({
            err: err
        })
    }
}

exports.getResetPass = (req,res,next)=>{
    res.render('teachers/reset',{
        title: 'Reset password',
        error: false,
    })
}

exports.postResetPass = async (req, res, next)=>{
    const email = req.body.email;
    try{
        const person = await Teacher.findOne({email: email});
        if(!person){
            return res.render('teachers/reset',{
                title: 'Reset password',
                error: `Your email doesn't exist yet`,
            })
        }
        //create the token
        const token = crypto.randomBytes(15).toString('hex');
        const tokenExpiration = Date.now() + 3600000;

        //add token to the account
        person.token = token;
        person.tokenExpiration = tokenExpiration;

        await person.save();

        const msg = {
            from: 'admin@danguAK.com',
            to: email,
            subject: 'Reset your password',
            html: ` 
                <h3>Click the link bellow to reset your password</h3>
                <p>-------------------------------------------------------------</p>
                <a href="http://localhost:3000/teacher/reset/${token}">Reset your password</a>
                <p>-------------------------------------------------------------</p>
                <p>Enter to the code field</p>`
        }

        sgMail.send(msg, function(error, info){
            if (error) {
              console.log(error);              
            } else {
              console.log('Email sent: ' + info.response);                
            }
          });

        res.redirect('/teacher/login');

    } catch (err) {
        next(err)
    }
}

exports.getResetWithToken = async (req,res,next)=>{
    const token = req.params.token;
    try{
        const person =await Teacher.findOne({token: token, tokenExpiration:{$gt: Date.now()}});
        if(!person){
            return res.render('teachers/reset',{
                title: 'Reset password',
                error: `Your password reset request has been expried!`,
            })
        }

        res.render('teachers/passwordReset',{
            title: 'Password reset',
            error: false,
            resetToken: token,
        })

    } catch (err) {
        next(err)
    }
}

exports.postResetWithToken = async (req,res,next)=>{
    const token = req.body.token;
    const pass = req.body.password;
    const cfPass = req.body.cfPassword;
    console.log(pass, cfPass);
    try{
        const person =await Teacher.findOne({token: token, tokenExpiration:{$gt: Date.now()}});
        if(pass.length < 6){
            return res.render('teachers/passwordReset',{
                title: 'Password reset',
                resetToken: token,
                error: 'Your password should be 6 character long',
            })
        }
        if(pass !== cfPass){
            return res.render('teachers/passwordReset',{
                title: 'Password reset',
                error: 'password and password confirm should be the same',
                resetToken: token,
            })
        }
        const hashPass = await bcrypt.hash(pass, 15);
        person.password = hashPass;
        person.token = undefined;
        person.tokenExpiration = undefined;

        await person.save();
        res.redirect('/teacher/login');

    } catch (err) {
        next(err)
    }
}

exports.postLogout =async (req, res, next)=>{
    await req.session.destroy();
    res.redirect('/teacher/login');
}