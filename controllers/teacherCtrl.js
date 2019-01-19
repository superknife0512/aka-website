const Album = require('../models/Album');
const mongoose = require('mongoose');


exports.getTeacherProfile =async (req,res,next)=>{
    try{
        const teacher = req.teacher;
        const albums = await Album.find({createBy: teacher._id});

        res.render('teachers/teacherProfile',{
            title:'Teacher Profile',
            path: '/teacher',
            teacher: teacher,
            albums
        })

    } catch (err) {
        next(err)
    }
    
}

// ************************************************
// SCHEDULE PART 
// ************************************************

exports.getTeacherSchedule = (req,res,next)=>{    
    res.render('teachers/schedule',{
        title: 'Schedule',
        path: '/teacher/schedule',
        teacher: req.teacher,
        editMode: false
    })
}

exports.postTeacherSchedule =async (req,res,next)=>{
    try{
        const teacher = req.teacher;
    const t21 = req.body.T21;
    const t31 = req.body.T31;
    const t41 = req.body.T41;
    const t51 = req.body.T51;
    const t61 = req.body.T61;
    const t71 = req.body.T71;
    const cn1 = req.body.CN1;

    const t22 = req.body.T22;
    const t32 = req.body.T32;
    const t42 = req.body.T42;
    const t52 = req.body.T52;
    const t62 = req.body.T62;
    const t72 = req.body.T72;
    const cn2 = req.body.CN2;

    const t23 = req.body.T23;
    const t33 = req.body.T33;
    const t43 = req.body.T43;
    const t53 = req.body.T53;
    const t63 = req.body.T63;
    const t73 = req.body.T73;
    const cn3 = req.body.CN3;

    teacher.schedule.push({
        t21,
        t22,
        t23,
        
        t31,
        t32,
        t33,
        
        t41,
        t42,
        t43,
        
        t51,
        t52,
        t53,
        
        t61,
        t62,
        t63,
        
        t71,
        t72,
        t73,
        
        cn1,
        cn2,
        cn3,
    })
    await teacher.save();
    res.redirect('/teacher');

    } catch (err) {
        next(err)
    }    
}

exports.getScheduleEdit = (req,res,next)=>{    
    const editMode = req.query.editMode;
    const teacher= req.teacher;
    const schedule = teacher.schedule[0];
    res.render('teachers/schedule', {
        title: ' Edit Schedule ',
        path: '/teacher/schedule',
        schedule,
        editMode,
        teacher,
    })
}

exports.postScheduleEdit = async (req,res,next)=>{
    const teacher = req.teacher;
    const t21 = req.body.T21;
    const t31 = req.body.T31;
    const t41 = req.body.T41;
    const t51 = req.body.T51;
    const t61 = req.body.T61;
    const t71 = req.body.T71;
    const cn1 = req.body.CN1;

    const t22 = req.body.T22;
    const t32 = req.body.T32;
    const t42 = req.body.T42;
    const t52 = req.body.T52;
    const t62 = req.body.T62;
    const t72 = req.body.T72;
    const cn2 = req.body.CN2;

    const t23 = req.body.T23;
    const t33 = req.body.T33;
    const t43 = req.body.T43;
    const t53 = req.body.T53;
    const t63 = req.body.T63;
    const t73 = req.body.T73;
    const cn3 = req.body.CN3;
    try{
        const schedule = teacher.schedule[0];
        schedule.t21 = t21
        schedule.t31 = t31
        schedule.t41 = t41
        schedule.t51 = t51
        schedule.t61 = t61
        schedule.t71 = t71
        schedule.cn1 = cn1

        schedule.t22 = t22
        schedule.t32 = t32
        schedule.t42 = t42
        schedule.t52 = t52
        schedule.t62 = t62
        schedule.t72 = t72
        schedule.cn2 = cn2

        schedule.t23 = t23
        schedule.t33 = t33
        schedule.t43 = t43
        schedule.t53 = t53
        schedule.t63 = t63
        schedule.t73 = t73
        schedule.cn3 = cn3

        teacher.save();
        res.redirect('/teacher')

    } catch (err) {
        next(err);
    }
}

// ************************************************
// SCHEDULE PART 
// ************************************************

exports.getCreateAlbum = (req,res,next)=>{
    res.render('teachers/album',{
        path: '/teacher/album',
        title: 'Album',
    })
}

exports.postCreateAlbum =async (req,res,next)=>{
    try{
        const teacherId = req.teacher._id;
        const name = req.body.name;
        const shortDes = req.body.shortDes;

        const createBy = mongoose.Types.ObjectId(teacherId);

        const album = new Album({
            name, 
            shortDes,
            createBy
        })

        await album.save();
        res.redirect('/teacher')

    } catch(err){
        next(err);
    }
}