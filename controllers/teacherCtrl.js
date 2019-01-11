exports.getTeacherProfile = (req,res,next)=>{
    res.render('teachers/teacherProfile',{
        title:'Teacher Profile'
    })
}