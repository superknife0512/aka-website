const Teacher = require('../models/Teacher');
const Course = require('../models/Course');
const mongoose = require('mongoose');

exports.getAdminBoard = (req,res,next)=>{
    res.render('admin/adminBoard',{
        title: 'admin board',
        path: '/'
    })
}

exports.getCreateCourse =async (req, res, next)=>{
    try{
        const teachers = await Teacher.find({role: 'teacher'}).select('name');
        res.render('admin/createCourse',{
            title: 'Create course',
            path:'/admin/course',
            teachers,
            error: false,
        })
    } catch (err){
        next(err)
    }
}

exports.postCreateCourse = async (req,res,next)=>{
    const title = req.body.title;
    const shortDes = req.body.shortDes;
    const price = req.body.shortDes;
    const oldPrice = req.body.oldPrice;
    const period = req.body.period;
    const learningSchedule = req.body.learningSchedule;
    const requirements = req.body.requirements;
    const courseGoals = req.body.courseGoals;
    const teacherName = req.body.teacherName;
    // refactor code 
    const renderCreateCourse = (res, error)=>{
        res.render('admin/createCourse',{
            title: 'Create course',
            path:'/admin/course',
            teachers,
            error,
        })
    }
    
    try{
        //validation input
        if(!title || !shortDes || !price || !period || !requirements || !courseGoals || !teacherName){
            renderCreateCourse(res, 'Your should input all the fields !!');
        }

        const requirementsArr = requirements.split(';;');
        const courseGoalsArr = courseGoals.split(';;');
        console.log(requirementsArr, courseGoalsArr);

        const teacher = await Teacher.findOne({name: teacherName});
        const teacherId = mongoose.Types.ObjectId(teacher._id);        

        const course = new Course({
            title,
            shortDes,
            price,
            oldPrice,
            period,
            learningSchedule,
            requirements: requirementsArr,
            courseGoals: courseGoalsArr,
            teacher: teacherId,
        })

        await course.save();
        console.log('Course has been saved');
        res.redirect('/admin/course')

    } catch (err) {
        next(err)
    }
}