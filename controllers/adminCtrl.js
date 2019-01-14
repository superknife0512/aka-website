const Teacher = require('../models/Teacher');
const Course = require('../models/Course');
const Event = require('../models/Event');
const mongoose = require('mongoose');

const createErr = (msg, statusCode)=>{
    const err = new Error(msg);
    err.statusCode = statusCode;
    throw err
}

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

exports.getCreateEvent = (req,res,next)=>{
    res.render('admin/createEvent',{
        path: '/admin/event',
        title: 'Create event',
    })
}

exports.postCreateEvent = async (req,res,next)=>{
    try{
        const dateHappen = req.body.dateHappen;
        const eventName = req.body.eventName;
        const desc = req.body.desc;
        
        if(!req.files){
            return createErr('We cannot find your images, try again');
        }

        // create image url
        const fileInfos = req.files;

        const filePaths = fileInfos.map(file=>{
            return file.path.replace(/\\/g, '/');
        })
        const descArr = desc.split(';;');

        const event = new Event({
            dateHappen,
            eventName,
            desc: descArr,
            eventImgs: filePaths,
        })
        await event.save();
        res.redirect('/admin/event')

    } catch (err) {
        next(err)
    }
}

exports.getTeachersInfo =async (req, res, next)=>{
    try{
        const teachers = await Teacher.find({role: 'teacher'});
        res.render('admin/teacherInfo', {
            title: ' Teacher Info ',
            path: '/admin/teachers-info',
            teachers,
        })

    } catch (err) {
        next(err)
    }
}

exports.getTeacherEdit =async (req,res,next)=>{
    try{
        const teacher =await Teacher.findById(req.params.teacherId);
        
        res.render('admin/teacherEdit', {
            title: 'Edit teacher information',
            path: '/admin/teachers-info',
            teacher
        })

    } catch (err) {
        next(err);
    }
}

