const Course = require('../models/Course');
const Events = require('../models/Event');
const Teacher = require('../models/Teacher');
const Album = require('../models/Album');
const OnlineCourse = require('../models/OnlineCourse');
const AdminData = require('../models/AdminData')
const incEvent = require('../models/IncomingEvent');
const Message = require('../models/Message');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mongoose = require('mongoose');

const contacts = [
    {
        icon: 'images/contact.svg#icon-phone',
        desc: '0905.674.528 - 0868.126.734',
    },
    {
        icon: 'images/contact.svg#icon-map',
        desc: '222 Ngũ Hành Sơn - Tp. Đà Nẵng ( Đối Diện ĐHKT Đà Nẵng )',
    },

];

const socials = [
    {
        icon: 'images/contact.svg#icon-facebook',
        desc: 'https://www.facebook.com/Meixuan.dn/',
    },
    {
        icon: 'images/contact.svg#icon-googleplus',
        desc: 'https://bom.to/0vEt3',
    },

]

// *********************************************
// HOME PAGE 
// *********************************************

exports.getHomePage =async (req,res,next)=>{
    try{
       
        const navData = [
            {
                page:' Trang chủ ',
                link: '/',
            },
            {
                page:' khóa học ',
                link: '/course-page',
            },
            {
                page:' Học online ',
                link: '/course-online',
            },
            {
                page:' giảng viên ',
                link: '/teacher-page',
            },
            {
                page:' Sự kiện ',
                link: '/event-page',
            },
            {
                page:' về AK ',
                link: '/about',
            },
            {
                page:' Liên hệ ',
                link: '/contact',
            },
        ];
        const benefitData = [
            {
                icon:"images/benefits.svg#icon-target",
                title: "Lộ trình học hiệu quả",
                desc: 'Đào tạo theo nhu cầu cá nhân từng học viên '
            },
            {
                icon:"images/benefits.svg#icon-hourglass",
                title: "Tối ưu hóa thời gian học",
                desc: 'Rút gọn thời gian học, thông qua các phương pháp mới nhưng vẫn đảm bảo kiến thức đầu ra '
            },
            {
                icon:"images/benefits.svg#icon-wallet",
                title: "Giảm thiểu tối đa chi phí",
                desc: 'Chi phí học liên tục được tài trợ để hỗ trợ những bạn có hoàn cảnh khó khăn'
            },
            {
                icon:"images/benefits.svg#icon-genius",
                title: "Phù hợp với mọi đối tượng",
                desc: 'Hệ thống các khóa học được thiết kế để mọi độ tuổi đều có thể tham gia'
            },
            {
                icon:"images/benefits.svg#icon-linegraph",
                title: "Nguồn giảng viên chất lượng cao",
                desc: 'Các giảng viên được kiểm tra đầu vào gắt gao nhằm nâng cao chất lượng giảng dạy.'
            },
            {
                icon:"images/benefits.svg#icon-trophy",
                title: "Áp dụng kiến thức nhanh chóng",
                desc: 'Thuần thục sử dụng các kiến thức đã học vào đời sống, công việc hàng ngày chỉ sau vài tháng học'
            },
        ];
        const testimonials = [
            {
                quote:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error quia esse harum excepturi, illum id consequuntur eaque debitis ullam qui est, maiores incidunt sit voluptatum, natus hic autem cum nostrum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, atque voluptas animi id doloremque molestiae sunt dolor debitis, magni laboriosam obcaecati totam quia aliquid inventore.",
                img:"images/testi (1).jpg",
                name: "David Cramer",
                course: "Tiếng Trung giao tiếp",
                date: "14/02/2018 - 14/03/2019"
            },
            {
                quote:"The awesome course ipsum dolor, sit amet consectetur adipisicing elit. Error quia esse harum excepturi, illum id consequuntur eaque debitis ullam qui est, maiores incidunt sit voluptatum, natus hic autem cum nostrum? Modi, atque voluptas animi id doloremque molestiae sunt dolor debitis, magni laboriosam obcaecati totam quia aliquid inventore.",
                img:"images/testi (2).jpg",
                name: "Laviosa Leevin",
                course: "Tiếng Nhật giao tiếp",
                date: "14/05/2018 - 14/09/2019"
            },
            {
                quote:"Perfect one. Error quia esse harum excepturi, illum id consequuntur eaque debitis ullam qui est, maiores incidunt sit voluptatum, natus hic autem cum nostrum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, atque voluptas animi id doloremque molestiae sunt dolor debitis, magni laboriosam obcaecati totam quia aliquid inventore.",
                img:"images/testi (3).jpg",
                name: "Corino Dlavico",
                course: "Tiếng Trung cho người đi làm",
                date: "10/02/2018 - 10/03/2019"
            },
        ]
        
        const courses = await Course.find().limit(6).sort('createdAt').populate('teacher assistant');
        console.log(courses);
        const events = await Events.find().limit(6).sort('-createdAt');
        const adminData = await AdminData.find();

        const offPrices = courses.map(course => {
            const oldPrice = parseInt(course.oldPrice.split('.').join(''));
            const price = parseInt(course.price.split('.').join(''));
            const pricesMinus = oldPrice - price;
            return ((pricesMinus/oldPrice)*100).toFixed(0)
        })

        const titleSEOs = courses.map(course=>{
            return course.title.replace(/ /g, '-');
        })

        console.log(offPrices);

        res.render('index',{
            title: 'Home Page',
            benefitData,
            path: '/',
            offPrices,
            courses,
            events,
            testimonials,
            contacts,
            socials,
            titleSEOs,
            navData,
            adminData
        })

    } catch (err) {
        next(err)
    }
    
}

// *********************************************
// COURSE PAGE 
// *********************************************

exports.getCoursesPage = async (req,res,next)=>{
    try{
        const courses = await Course.find().populate('teacher assistant');
       
        const courseEng = [];
        const courseChi = [];
        const courseJav = [];
        const courseKor = [];

        const titleSEOEng = [];
        const titleSEOChi = [];
        const titleSEOJav = [];
        const titleSEOKor = [];

        courses.forEach(course =>{
            let titleSEO = course.title.replace(/ /g, '-')
            if(course.title.match(/tiếng trung/gi)){
                courseChi.push(course)
                titleSEOChi.push(titleSEO);
            } else if (course.title.match(/tiếng anh/gi)){
                courseEng.push(course)
                titleSEOEng.push(titleSEO);
            } else if(course.title.match(/tiếng Nhật/gi)) {
                courseJav.push(course);
                titleSEOJav.push(titleSEO);
            } else if(course.title.match(/tiếng Hàn/gi)){
                courseKor.push(course);
                titleSEOKor.push(titleSEO)
            }
        })
        const calculateDiscount = (course)=>{
            const oldPrice = parseInt(course.oldPrice.split('.').join(''));
            const price = parseInt(course.price.split('.').join(''));
            const pricesMinus = oldPrice - price;
            return ((pricesMinus/oldPrice)*100).toFixed(0)
        }

        const discountEng = courseEng.map(course=>{
            return calculateDiscount(course)
        })

        const discountChi = courseChi.map(course=>{
            return calculateDiscount(course)
        })

        const discountJav = courseJav.map(course=>{
            return calculateDiscount(course)
        })

        const discountKor = courseKor.map(course=>{
            return calculateDiscount(course)
        })

        res.render('courses-page.ejs',{
            title: 'Course page',
            path: '/course-page',
            courseEng,
            courseChi,
            courseJav,
            courseKor,

            contacts,
            socials,

            discountEng,
            discountChi,
            discountJav,
            discountKor,

            titleSEOEng,
            titleSEOChi,
            titleSEOJav,
            titleSEOKor
        })

    } catch (err) {
        next(err)
    }
}

exports.getCourseDetail =async (req,res,next)=>{
    try{
       
        
        const course = await Course.findById(req.params.courseId).populate('teacher assistant');
        let courseView = course.views + 1;
        course.views = courseView;

        await course.save()

        const adminData = await AdminData.find();
        const scheduleArr = course.learningSchedule.split(';;');
        const offPrices = remainingCourse.map(course => {
            const oldPrice = parseInt(course.oldPrice.split('.').join(''));
            const price = parseInt(course.price.split('.').join(''));
            const pricesMinus = oldPrice - price;
            return ((pricesMinus/oldPrice)*100).toFixed(0)
        })
        const titleSEOs = remainingCourse.map(course=>{
            return course.title.replace(/ /, '-');
        });
        res.render('course-detail',{
            path:'/course-page',
            title: course.title,
            course,
            contacts,
            socials,            
            courseDefaultVideo: process.env.COURSE_DEFAULT_VIDEO,
            adminData,
            scheduleArr,
            remainingCourse,
            offPrices,
            titleSEOs
        })

    } catch (err) {
        next(err);
    }
}

// *********************************************
// TEACHER PAGE 
// *********************************************

exports.getTeachersPage =async (req,res,next)=>{
    try{
        
        
        const teachers =await Teacher.find({role: 'teacher'});
        const assistants =await Teacher.find({role: 'assistant'});
        const seoName = teachers.map(teacher=>{
            return teacher.name.replace(/[ .]/g, '-');
        })
        
        res.render('teachers-page',{
            title: 'Giảng viên',
            path: '/teacher-page',
            contacts,
            socials,
            seoName,
            teachers,
            assistants
        })

    } catch (err) {
        next(err)
    }
}

exports.getTeacherDetail = async (req,res,next)=>{
    try{
        
        
        const teacher = await Teacher.findById(req.params.teacherId);
        const teacherId = mongoose.Types.ObjectId(teacher._id)
        const albums = await Album.find({createBy: teacherId});
        const courses = await Course.find({teacher: teacherId}).populate('teacher');
        
        function changeDate(date){
            return date.toISOString().split('T')[0].split('-').reverse().join('-');
        }

        const albumsDate = albums.map(album=>{
            const createdDate = changeDate(album.createdAt);
            const updatedDate = changeDate(album.updatedAt);
            return {
                createdDate,
                updatedDate,
            }
        })

        const offPrices = courses.map(course => {
            const oldPrice = parseInt(course.oldPrice.split('.').join(''));
            const price = parseInt(course.price.split('.').join(''));
            const pricesMinus = oldPrice - price;
            return ((pricesMinus/oldPrice)*100).toFixed(0)
        })

        const titleSEOs = courses.map(course=>{
            return course.title.replace(/ /g, '-');
        })

        res.render('teacher-detail',{
            socials,
            contacts,
            teacher,
            title: teacher.name,
            path: '/teacher-page',
            teacherDefaultVideo: process.env.TEACHER_DEFAULT_VIDEO,
            albums,
            albumsDate,
            offPrices,
            courses,
            titleSEOs
        })

    } catch (err) {
        next(err);
    }
}

// *********************************************
// ALBUM PAGE 
// *********************************************

exports.getAlbumPage = async (req,res,next)=>{
    try{
        
        
        const album =await Album.findById(req.params.albumId);
        const teacher = await Teacher.findById(req.query.teacherId);
        const postCreatedDate = album.posts.map(post=>{
            if(post.createdAt){
                return post.createdAt.toISOString().split('T')[0].split('-').reverse().join('-');
            } else {
                return null
            }
        })
        res.render('album-page',{
            title: album.name,
            contacts,
            socials,
            path: '/album',
            album,
            postCreatedDate,
            teacher
        })

    } catch (err) {
        next(err);
    }
}

// *********************************************
// EVENT PAGE 
// *********************************************

exports.getEventPage = async (req,res,next)=>{
    try{
        const page_event = req.query.pageEvent || 1;
        const PER_PAGE_EVENT = 6;

        const page_news = req.query.pageNews || 1;
        const PER_PAGE_NEWS = 6;

        const events = await Events.find({category: 'event'})
                                        .sort('-createdAt')
                                        .skip((page_event-1)*PER_PAGE_EVENT)
                                        .limit(PER_PAGE_EVENT);

        const news = await Events.find({category: 'news'})
                                        .sort('-createdAt')
                                        .skip((page_news-1)*PER_PAGE_NEWS)
                                        .limit(PER_PAGE_NEWS);

        const eventsDate = events.map(event=>{
            return event.createdAt.toISOString().split('T')[0].split('-').reverse().join('-');
        })

        const newsDate = news.map(newss=>{
            return newss.createdAt.toISOString().split('T')[0].split('-').reverse().join('-');
        })
        const incomingEvent = await incEvent.findOne();
        const adminData = await AdminData.find();

        res.render('event-page',{
            title: 'AK event - news',
            path: '/event-page',
            contacts,
            socials,
            events,
            news,
            newsDate,
            eventsDate,
            incomingEvent,
            numDocsEvent: Math.ceil(events.length/PER_PAGE_EVENT),
            numDocsNews: Math.ceil(news.length/PER_PAGE_NEWS),
            curPageEvent: page_event,
            curPageNews: page_news,
            adminData,
        })

    } catch (err) {
        next(err);
    }
}

exports.getEventDetail = async (req,res,next)=>{
        
    try{
        const event = await Events.findById(req.params.eventId);
        const events = await Events.find().limit(5);
        res.render('event-detail',{
            title: event.eventName,
            path: '/event-page',
            event,
            socials,
            contacts,
            events
        })
        
    } catch (err) {
        next(err);
    }
}

// *********************************************
// ABOUT PAGE 
// *********************************************

exports.getAboutPage = async (req,res,next)=>{
    
    
    try{

        res.render('about',{
            title: 'Về trung tâm AK',
            path: '/about',
            socials,
            contacts,
        })
        
    } catch (err) {
        next(err);
    }
}

// *********************************************
// CONTACT PAGE 
// *********************************************

exports.getContactPage = async (req,res,next)=>{
    
    
    try{

        res.render('contact',{
            title: 'Về trung tâm AK',
            path: '/contact',
            socials,
            contacts,
            err: false,
        })
        
    } catch (err) {
        next(err);
    }
}

exports.postContact = async (req,res,next)=>{
    
    
    try{
        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const msg = req.body.msg;

        if(!name || !phone || !email || !msg){
            return res.render('contact',{
                title: 'Về trung tâm AK',
                path: '/contact',
                socials,
                contacts,
                err: 'Bạn phải nhập đầy đủ các trường trước khi gửi'
            })
        }
            
        
        const msgSendGrid = {
            to: process.env.DEFAULT_EMAIL,
            from: 'Guest@ak.com',
            subject: 'Thư khách gửi cho trung tâm',
            html:
             `
            <h3>Họ và tên: ${name}</h3>
            <h4>Số điện thoại: ${phone}</h4>
            <h4 style="color: red">Email học viên: ${email}</h4>            
            <p>${msg}</p>`,
          };

        const message = new Message({
            name,
            phone,
            email,
            message: msg,
        })

        
        await sgMail.send(msgSendGrid, (err, result)=>{
            if(err){
                throw err
            } else {
                console.log('Has send');
            }
        });

        await message.save();
               
        res.render('contact',{
            title: 'Về trung tâm AK',
            path: '/contact',
            socials,
            contacts,
            err: 'Cảm ơn bạn đã gửi thư cho chúng tôi!'
        })    
        
    } catch (err) {
        next(err);
    }
}

// *********************************************
// ABOUT PAGE 
// *********************************************

exports.postSearch = async (req,res,next)=>{
    
    
    
    try{
        const search = req.body.search;
        const courses = await Course.find().populate('teacher');

        const searchPattern = new RegExp(search, "ig");
        const results = [];
        
        courses.forEach(course=>{
            if(course.title.match(searchPattern)){
                results.unshift(course)
            } else if (course.teacher.name.match(searchPattern)){
                results.unshift(course)
            }
        })
        const offPrices = courses.map(course => {
            const oldPrice = parseInt(course.oldPrice.split('.').join(''));
            const price = parseInt(course.price.split('.').join(''));
            const pricesMinus = oldPrice - price;
            return ((pricesMinus/oldPrice)*100).toFixed(0)
        })
        const titleSEOs = courses.map(course=>{
            return course.title.replace(/ /g, '-');
        })
        res.render('search',{
            title: 'Kết quả tìm kiếm của bạn',
            path: '/search',
            socials,
            contacts,
            results,
            offPrices,
            titleSEOs
        })
        
    } catch (err) {
        next(err);
    }
}

// *********************************************
// ONLINE COURSE
// *********************************************

exports.getCourseOnline = async (req,res,next)=>{
    
    try{
        const onCourses = await OnlineCourse.find().populate('teacher').sort('-updatedAt');
        const date = onCourses.map(course=>{
            const create = course.createdAt.toISOString().split('T')[0].split('-').reverse().join('-');
            const update = course.updatedAt.toISOString().split('T')[0].split('-').reverse().join('-');
            return {
                create,
                update
            }
        })

        res.render('onlineCourses', {
            title: 'Học trực tuyến miễn phí',
            path: '/course-online',
            contacts,
            socials,
            onCourses,
            date,
        })

    } catch (err){
        next(err)
    }
}

exports.getCourseOnlineDetail = async (req,res,next)=>{
    
    try{
        const onCourse = await OnlineCourse.findById(req.params.onCourseId);                

        res.render('onlineCourseDetail', {
            title: 'Học trực tuyến miễn phí',
            path: '/course-online',
            contacts,
            socials,
            onCourse,
            courseTitle: onCourse.title
        })

    } catch (err){
        next(err)
    }
}

// api service 

exports.getVideo = async (req,res,next)=>{
    try{
        const onCourseId = req.params.onCourseId;
        const onCourse = await OnlineCourse.findById(onCourseId).populate('teacher');

        res.status(200).json({
            message: 'Get videos sucessfully',
            onCourse,
        })

    } catch(err){
        res.status(500).json({
            message: 'Server error',
            err,
        })
    }
}