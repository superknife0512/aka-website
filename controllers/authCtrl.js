exports.getLogin = (req,res,next)=>{
    res.render('teachers/login',{
        title: 'Login'
    })
}

exports.getSignup = (req,res,next)=>{
    res.render('teachers/signup',{
        title: 'Signup'
    })
}