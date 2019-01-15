const Teacher = require('../models/Teacher');
const Course = require('../models/Course');
const Event = require('../models/Event');
const {clearOldFile}=require('../middlewares/deleteJunk')
const mongoose = require('mongoose');

const createErr = (msg, statusCode)=>{
    const err = new Error(msg);
    err.statusCode = statusCode;
    throw err
}

exports.getAdminBoard =async (req,res,next)=>{
    try{
        const teachers = await Teacher.find({role: 'teacher'});
        const courses = await Course.find();

        res.render('admin/adminBoard',{
            title: 'admin board',
            path: '/',
            courses,
        })

    } catch (err) {
        next(err)
    }
    
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
    let courseImgPath;
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

        if(req.file){
            courseImgPath = req.file.path.replace(/\\/g, '/');
        } else {
            courseImgPath = 'public/courseImgs/default.jpeg';
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
            courseImg: courseImgPath,
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

exports.postTeacherEdit = async (req,res,next)=>{
    try{
        const name = req.body.name;
        const specialty = req.body.specialty;
        const story = req.body.story;
        const videoLinks = req.body.videoLinks;
        let avatarUrl = undefined;

        const teacher =await Teacher.findById(req.body.teacherId);
        console.log(name,specialty, videoLinks);

        if(!req.file){
            console.log('No file has been sent here');           
        } else {
            if(teacher.avatar !== 'public/teacherData/avatar/default.png'){
                await clearOldFile(teacher.avatar);
            }
            avatarUrl = req.file.path.replace(/\\/g, '/');
            teacher.avatar = avatarUrl;
        }

        teacher.name = name;
        teacher.specialty = specialty;
        teacher.story = story;
        teacher.teacherVideo = videoLinks.split(';;');

        await teacher.save();
        res.redirect('/admin/teachers-info');
    } catch (err) {
        next(err);
    }
}

exports.postDeleteTeacher = async (req,res,next)=>{
    try{
        const teacherId = req.body.teacherId;
        await Teacher.findByIdAndRemove(teacherId);
        console.log('Delete a teacher');
        res.redirect('/admin/teachers-info');

    } catch (err) {
        next(err)
    }
}

