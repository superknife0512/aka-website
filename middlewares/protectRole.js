
exports.protectForTeacher = (req,res,next)=>{
    if(req.session.teacher.role !== 'teacher'){
        res.redirect('/teacher/login')
    } else {
        next();
    }
}

exports.protectForAdmin = (req, res, next)=>{
    if(req.session.teacher.role !== 'admin'){
        res.redirect('/teacher/login')
    } else {
        next();
    }
}