const Teacher = require('../models/Teacher');
const Course = require('../models/Course');
const Events = require('../models/Event');
const IncomingEvent = require('../models/IncomingEvent');
const OnCourse = require('../models/OnlineCourse');
const {deleteBlob}=require('../middlewares/deleteBlob');
const mongoose = require('mongoose');

const createErr = (msg, statusCode)=>{
    const err = new Error(msg);
    err.statusCode = statusCode;
    throw err
}

// ************************************************
// ADMIN PART 
// ************************************************

exports.getAdminBoard =async (req,res,next)=>{
    try{
        const courses = await Course.find();
        const events = await Events.find();
        const onCourses = await OnCourse.find().populate('teacher');

        res.render('admin/adminBoard',{
            title: 'admin board',
            path: '/',
            courses,
            events,
            onCourses
        })

    } catch (err) {
        next(err)
    }
    
}

// ************************************************
// COURSE PART 
// ************************************************

exports.getCreateCourse =async (req, res, next)=>{
    try{
        const teachers = await Teacher.find({role: 'teacher'}).select('name');
        res.render('admin/createCourse',{
            title: 'Create course',
            path:'/admin/course',
            teachers,
            error: false,
            editMode: false,
        })
    } catch (err){
        next(err)
    }
}

exports.postCreateCourse = async (req,res,next)=>{
    const title = req.body.title;
    const shortDes = req.body.shortDes;
    const price = req.body.price;
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
            courseImgPath = req.file.url;
        } else {
            courseImgPath = 'public/courseImgs/default.jpeg';
        }        

        const requirementsArr = requirements.split(';;');
        const courseGoalsArr = courseGoals.split(';;');

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
            blobName: req.file.blob,
        })

        await course.save();
        console.log('Course has been saved');
        res.redirect('/admin/course')

    } catch (err) {
        next(err)
    }
}

exports.postDeleteCourse =async (req,res,next)=>{
    const courseId = req.body.courseId;
    try{
        const course = await Course.findById(courseId);
        if(course.courseImg !== 'public/courseImgs/default.jpg'){
            deleteBlob('course-photo', course.blobName);
        }
        await Course.findByIdAndRemove(courseId);
        res.redirect('/admin')

    } catch (err) {
        next(err)
    }
}

exports.getEditCourse = async (req,res,next)=>{
    const courseId = req.query.courseId;
    try{
        const teachers = await Teacher.find({role: 'teacher'});
        const course = await Course.findById(courseId).populate('teacher');
        res.render('admin/createCourse',{
            title: 'Create course',
            path:'/admin/course',
            course,
            error: false,
            editMode: true,
            teachers,
        })

    } catch (err) {
        next(err)
    }
}



exports.postEditCourse =async (req,res,next)=>{
    try{
        const courseId = req.body.courseId;
        const title = req.body.title;
        const shortDes = req.body.shortDes;
        const price = req.body.price;
        const oldPrice = req.body.oldPrice;
        const period = req.body.period;
        const learningSchedule = req.body.learningSchedule;
        const requirements = req.body.requirements;
        const courseGoals = req.body.courseGoals;
        const teacherName = req.body.teacherName;
        const videoUrl = req.body.videoUrl;

        const course = await Course.findById(courseId);
        const teacher = await Teacher.findOne({name: teacherName}).select('name');

        const teacherId = mongoose.Types.ObjectId(teacher._id);

        if(req.file){
            if(course.courseImg !== 'public/courseImgs/default.jpg'){
                deleteBlob('course-photo', course.blobName);
            }
            course.courseImg = req.file.url;
            course.blobName = req.file.blob;
        }

        course.title = title;
        course.shortDes = shortDes;
        course.price = price;
        course.oldPrice = oldPrice;
        course.period = period;
        course.learningSchedule = learningSchedule;
        course.requirements = requirements.split(';;');
        course.courseGoals = courseGoals.split(';;');
        course.videoUrl = videoUrl;
        course.teacher = teacherId;

        await course.save();
        res.redirect('/admin');

    } catch (err) {
        next(err)
    }
}

exports.postAddTesti = async (req,res,next)=>{
    try{
        const facebookLink = req.body.facebookLink;
        const name = req.body.name;
        const desc = req.body.desc;
        const courseId = req.body.courseId;

        const course = await Course.findById(courseId);
        course.testimonials.push({
            facebookLink,
            name,
            desc,
        })

        await course.save();
        res.redirect(`/admin/course/edit?courseId=${course._id}`);
    } catch (err) {
        next(err)
    }
}

exports.postDeleteTesti =async (req,res,next)=>{
    const testiId = req.body.testiId;
    const courseId = req.body.courseId;
    try{
        const course = await Course.findById(courseId);
        await course.testimonials.id(testiId).remove();
        await course.save();
        res.json({
            msg: 'Has been deleted a testimonial'
        })
    } catch (err) {
        res.json({
            msg: err
        })
    }
}

// ************************************************
// EVENT PART 
// ************************************************

exports.getCreateEvent = (req,res,next)=>{
    res.render('admin/createEvent',{
        path: '/admin/event',
        title: 'Create event',
        editMode: false,
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

        console.log(req.files);

        // create image url
        const fileInfos = req.files;

        const filePaths = fileInfos.map(file=>{
            return file.url;
        })
        const blobNames = fileInfos.map(file=> file.blob);
        const descArr = desc.split(';;');

        const event = new Events({
            dateHappen,
            eventName,
            desc: descArr,
            eventImgs: filePaths,
            blobNames
        })
        await event.save();
        res.redirect('/admin/event')

    } catch (err) {
        next(err)
    }
}

exports.getEditEvent = async (req,res,next)=>{
    try{
        const event =await Events.findById(req.query.eventId);
        const incEvent = await IncomingEvent.find();
        res.render('admin/createEvent', {
            path: '/admin/event',
            title: 'Edit event',
            event,
            incEvent: incEvent[0],
            editMode: true,
        })

    } catch (err) {
        next(err)
    }
}

exports.postEditEvent = async (req,res,next)=>{
    try{
        const eventId = req.body.eventId;
        const eventName = req.body.eventName;
        const dateHappen = req.body.dateHappen;
        const desc = req.body.desc;

        const event = await Events.findById(eventId);
        if(req.files[0]){
            
            event.blobNames.forEach(blogName => {
                deleteBlob('event-photos', blogName);
            });
            const filePaths = req.files.map(imgInfo=>{
                return imgInfo.url;
            })
            event.eventImgs = filePaths;
        }

        event.eventName = eventName;
        event.dateHappen = dateHappen;
        event.desc = desc;

        await event.save();
        res.redirect('/admin')

    } catch (err) {
        next(err);
    }
}

exports.postDeleteEvent = async (req,res,next)=>{
    try{
        const eventId = req.body.eventId;
        const event = await Events.findById(eventId);
        event.blobNames.forEach(blogName=>{
            deleteBlob('event-photos', blogName);
        })
        await Events.findByIdAndRemove(eventId);
        res.redirect('/admin')
    } catch(err) {
        next(err);
    }
}

exports.postIncomingEvent =async (req,res,next)=>{
    try{
        const eventName = req.body.eventName;
        const dateHappen = req.body.dateHappen;
        const desc = req.body.desc;

        await IncomingEvent.deleteMany();

        const descArr= desc.split(';;');
        const event = await Events.findById(req.body.eventId);
        
        const incomingEvent = new IncomingEvent({
            dateHappen,
            eventName,
            desc: descArr,
            eventImg: req.file.url,
            blobName: req.file.blobName
        })

        await incomingEvent.save();
        res.redirect(`/admin/event/edit?eventId=${event._id}`);

    } catch (err) {

    }
}

exports.postEventOver =async (req,res,next)=>{
    try{
        const incEventId = req.body.incEventId;
        const incEvent = await IncomingEvent.findById(incEventId);
        const event = new Events({
            eventName: incEvent.eventName,
            dateHappen: incEvent.dateHappen,
            desc: incEvent.desc,
            eventImgs: [incEvent.eventImg],
            blobNames: [incEvent.blobName]
        })

        await event.save()
        await IncomingEvent.deleteMany();
        res.redirect('/admin');


    } catch (err) {

    }
}

// ************************************************
// TEACHER PART 
// ************************************************

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
        const archivements = req.body.archivements;
        let avatarUrl = undefined;

        const teacher =await Teacher.findById(req.body.teacherId);
        console.log(name,specialty, videoLinks);

        if(!req.file){
            console.log('No file has been sent here');           
        } else {
            if(teacher.avatar !== 'public/teacherData/avatar/default.png'){
                deleteBlob('teacher-photo', teacher.blobName);
                teacher.blobName = req.file.blob;
            }
            avatarUrl = req.file.url;
            teacher.avatar = avatarUrl;
        }

        teacher.name = name;
        teacher.specialty = specialty;
        teacher.story = story;
        teacher.teacherVideo = videoLinks.split(';;');
        teacher.archivements = archivements.split(';;');

        await teacher.save();
        res.redirect('/admin/teachers-info');
    } catch (err) {
        next(err);
    }
}

exports.postDeleteTeacher = async (req,res,next)=>{
    try{
        const teacherId = req.body.teacherId;
        const album = await Album.find({createBy: teacherId});
        const courses = await Course.find({teacher: teacherId});
        await Teacher.findByIdAndRemove(teacherId);
        console.log('Delete a teacher');
        album.posts.forEach(post=>{
            post.blobNames.forEach(blobName=>{
                deleteBlob('post-photos', blobName)
            })
        })
        courses.forEach(course=>{
            deleteBlob('course-photo', course.blobName);
        })
        Album.deleteMany({createBy: teacherId});
        Course.deleteMany({teacher: teacherId});

        res.redirect('/admin/teachers-info');

    } catch (err) {
        next(err)
    }
}

// ************************************************
// SERACH PART 
// ************************************************

exports.getSearchPage =async (req,res,next)=>{
    try{
        const search = req.body.search;
        console.log(search);
        const courses = await Course.find();
        const events = await Events.find();
        let courseSearch = [];
        let eventSearch =[];
        const searchRegex = new RegExp(search.toLowerCase(), 'g');

        courses.forEach(course => {
            if(course.title.toLowerCase().match(searchRegex)){
                courseSearch.push(course);
            }
        })
        events.forEach(event => {
            if(event.eventName.toLowerCase().match(searchRegex)){
                eventSearch.push(event);
            }
        })

        res.render('admin/search',{
            title: 'Search results',
            path: '/admin/search',
            courseSearch,
            eventSearch,
        })
    } catch (err) {
        next(err)
    }
}

// ************************************************
// ONLINE COURSE PART 
// ************************************************

exports.getCreateOnlineCourse =async (req,res,next)=>{
    try{ 
        const teachers = await Teacher.find({role: 'teacher'});
        res.render('admin/createOnlineCourse',{
            title: 'Online course',
            path: '/admin/online-course',
            teachers,
            editMode: false,
        })
    } catch (err) {
        next(err)
    }
}

exports.postCreateOnlineCourse = async (req,res,next)=>{
    try{

        const title = req.body.title;
        const teacherName = req.body.teacherName;
        const documentLink = req.body.documentLink;
        console.log(title);

        if( !title || !teacherName){
            throw new Error('Please enter all fields');
        }

        if(!req.file){
            throw new Error('The image cannot found')
        }

        const teacher = await Teacher.findOne({name: teacherName});
        const teacherObjectId = mongoose.Types.ObjectId(teacher._id);

        const onCourse = new OnCourse({
            title,
            teacher: teacherObjectId,
            imageUrl: req.file.url,
            blobName: req.file.blob,
            documentLink
        })

        await onCourse.save();
        res.redirect('/admin/online-course');

    } catch (err){
        next(err)
    }
}

exports.getEditOnlineCourse =async (req,res,next)=>{
    try{ 
        const teachers = await Teacher.find({role: 'teacher'});
        const onCourse = await OnCourse.findById(req.query.onCourseId).populate('teacher');
        res.render('admin/createOnlineCourse',{
            title: 'Online course',
            path: '/admin/online-course',
            editMode: true,
            onCourse,
            teachers
        })
    } catch (err) {
        next(err)
    }
}

exports.postEditOnlineCourse = async (req,res,next)=>{
    try{
        const title = req.body.title;
        const teacherName = req.body.teacherName;
        const documentLink = req.body.documentLink;

        const onCourse = await OnCourse.findById(req.body.onCourseId);
        console.log(onCourse);
        const teacher = await Teacher.findOne({name: teacherName});

        const teacherId = mongoose.Types.ObjectId(teacher._id);

        if(req.file){
            deleteBlob('course-photo', onCourse.blobName);
            onCourse.imageUrl = req.file.url;
            onCourse.blobName = req.file.blob;
        }

        onCourse.title = title;
        onCourse.teacher = teacherId;
        onCourse.documentLink = documentLink;

        await onCourse.save();
        res.redirect('/admin')

    } catch (err) {
        next(err)
    }
}

exports.postDeleteOnlineCourse = async (req, res, next)=>{
    try{
        const onCourseId = req.body.onCourseId;
        const onCourse = await OnCourse.findById(onCourseId);
        deleteBlob('course-photo', onCourse.blobName);
        await OnCourse.findByIdAndRemove(onCourseId);
        console.log('has delete an online course');
        res.redirect('/admin')

    } catch(err){
        next(err);
    }
}

// add video here **************************************
exports.getAllVideo = async (req, res, next)=>{
    try{
        const onCourse = await OnCourse.findById(req.query.onCourseId);
        res.status(200).json({
            videos: onCourse.courses
        })

    } catch(err){
        next(err);
    }
}

exports.postAddVideo = async (req,res,next) =>{
    try{
        const title = req.body.title;
        const videoUrl = req.body.videoUrl;
        const time = req.body.time;
        const documentLink = req.body.documentLink;
        const onCourseId = req.body.onCourseId;

        const onCourse = await OnCourse.findById(onCourseId);
        const videoId = videoUrl.match(/\d{7,20}/gi)[0];

        if(!title || !videoUrl || !time){
            res.status(422).json({
                message: 'You should enter all the fields'
            })
        }

        onCourse.courses.push({
            title,
            videoUrl,
            time,
            videoId,
            documentLink
        })

        await onCourse.save()
        res.status(201).json({
            lecture:{
                title,
                videoUrl,
                time,   
                videoId,
                documentLink            
            },
            message: 'create lecture sucessfully'
        })

    } catch(err){
        next(err);
    }
}

exports.deleteVideo = async (req, res, next)=>{
    try{
        const onCourse = await OnCourse.findById(req.body.onCourseId);
        onCourse.courses.pull(req.body.videoId);
        await onCourse.save();
        res.status(200).json({
            message: 'Has been deleted a video'
        })

    } catch(err){
        next(err);
    }
}

exports.editVideo = async (req,res,next)=>{
    try{
        const title = req.body.title;
        const time = req.body.time;
        const videoUrl = req.body.videoUrl;
        const documentLink = req.body.documentLink;

        const onCourse =await OnCourse.findById(req.body.onCourseId);
        const video = onCourse.courses.id(req.body.videoId);

        const videoId = videoUrl.match(/\d{7,20}/gi)[0];

        video.title = title;
        video.time = time;
        video.videoUrl = videoUrl;
        video.videoId = videoId;
        video.documentLink = documentLink;

        await onCourse.save();
        res.status(200).json({
            message: 'update course sucessfully'
        })

    } catch (err){
        next(err)
    }
}