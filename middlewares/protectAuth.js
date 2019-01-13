
exports.protectAuth = (req,res,next)=>{
    if(req.session.isLogin !== true){
        res.redirect('/')
    } else {
        next();
    }
}