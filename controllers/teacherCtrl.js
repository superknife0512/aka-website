

exports.getTeacherProfile =async (req,res,next)=>{
    try{
        const teacher = req.teacher;

        console.log(teacher.teacherVideo);

        res.render('teachers/teacherProfile',{
            title:'Teacher Profile',
            path: '/teacher',
            teacher: teacher,
        })

    } catch (err) {
        next(err)
    }
    
}