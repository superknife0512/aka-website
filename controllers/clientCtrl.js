const Course = require('../models/Course');
const Events = require('../models/Event');
const Teacher = require('../models/Teacher');
const Album = require('../models/Album');
const incEvent = require('../models/IncomingEvent');
const Message = require('../models/Message');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mongoose = require('mongoose');

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
                page:' giảng viên ',
                link: '/teacher-page',
            },
            {
                page:' Sự kiện ',
                link: '/event-page',
            },
            {
                page:' Về trung tâm AK ',
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
                desc: 'Lộ trình học hướng dẫn người học đi đúng mục tiêu,...'
            },
            {
                icon:"images/benefits.svg#icon-hourglass",
                title: "Tiết kiệm thời gian tối ưu",
                desc: 'Với các khóa học của chúng tôi, bạn có thể tự mình sắp xếp thời gian hiệu quả, ....'
            },
            {
                icon:"images/benefits.svg#icon-wallet",
                title: "Giảm thiểu tối đa chi phí",
                desc: 'Các khóa học của chúng tôi sẽ giúp các bạn tiết kiệm được một khoảng không nhỏ so với việc đến các trung tâm lớn'
            },
            {
                icon:"images/benefits.svg#icon-genius",
                title: "Phù hợp với mọi đối tượng",
                desc: 'Các khóa học với phong cách giảng dạy phù hợp với cả những người dù đã đi làm hay còn đi học...'
            },
            {
                icon:"images/benefits.svg#icon-linegraph",
                title: "Nguồn giảng viên chất lượng cao",
                desc: 'Giảng viên được lựa chọn một cách kỹ càng tăng hiệu quả tối đa,...'
            },
            {
                icon:"images/benefits.svg#icon-trophy",
                title: "Áp dụng kiến thức nhanh chóng",
                desc: 'Đảm bảo áp dụng kiến thức học vào đời sống công việc trong thời gian ngắn nhất'
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
        const contacts = [
            {
                icon: 'images/contact.svg#icon-phone',
                desc: '078 275 9831 - 094 942 9254',
            },
            {
                icon: 'images/contact.svg#icon-map',
                desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
            },

        ];

        const socials = [
            {
                icon: 'images/contact.svg#icon-facebook',
                desc: 'https://www.facebook.com/Superknife0512',
            },
            {
                icon: 'images/contact.svg#icon-googleplus',
                desc: 'https://bom.to/0vEt3',
            },

        ]

        const courses = await Course.find().populate('teacher').limit(6);
        console.log(courses);
        const events = await Events.find().limit(6).sort('-createdAt');

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
        const courses = await Course.find().populate('teacher');
        const contacts = [
            {
                icon: 'images/contact.svg#icon-phone',
                desc: '078 275 9831 - 094 942 9254',
            },
            {
                icon: 'images/contact.svg#icon-map',
                desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
            },

        ];

        const socials = [
            {
                icon: 'images/contact.svg#icon-facebook',
                desc: 'https://www.facebook.com/Superknife0512',
            },
            {
                icon: 'images/contact.svg#icon-googleplus',
                desc: 'https://bom.to/0vEt3',
            },

        ]
        const courseEng = [];
        const courseChi = [];
        const courseJav = [];

        const titleSEOEng = [];
        const titleSEOChi = [];
        const titleSEOJav = [];

        courses.forEach(course =>{
            let titleSEO = course.title.replace(/ /g, '-')
            if(course.title.match(/trung/gi)){
                courseChi.push(course)
                titleSEOChi.push(titleSEO);
            } else if (course.title.match(/anh/gi)){
                courseEng.push(course)
                titleSEOEng.push(titleSEO);
            } else {
                courseJav.push(course);
                titleSEOJav.push(titleSEO);

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
        console.log(discountEng);

        const discountChi = courseChi.map(course=>{
            return calculateDiscount(course)
        })

        const discountJav = courseJav.map(course=>{
            return calculateDiscount(course)
        })

        res.render('courses-page.ejs',{
            title: 'Course page',
            path: '/course-page',
            courseEng,
            courseChi,
            courseJav,
            contacts,
            socials,

            discountEng,
            discountChi,
            discountJav,

            titleSEOEng,
            titleSEOChi,
            titleSEOJav,
        })

    } catch (err) {
        next(err)
    }
}

exports.getCourseDetail =async (req,res,next)=>{
    try{
        const contacts = [
            {
                icon: 'images/contact.svg#icon-phone',
                desc: '078 275 9831 - 094 942 9254',
            },
            {
                icon: 'images/contact.svg#icon-map',
                desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
            },

        ];

        const socials = [
            {
                icon: 'images/contact.svg#icon-facebook',
                desc: 'https://www.facebook.com/Superknife0512',
            },
            {
                icon: 'images/contact.svg#icon-googleplus',
                desc: 'https://bom.to/0vEt3',
            },

        ]
        
        const course = await Course.findById(req.params.courseId).populate('teacher');
        res.render('course-detail',{
            path:'/course-page',
            title: course.title,
            course,
            contacts,
            socials,            
            courseDefaultVideo: process.env.COURSE_DEFAULT_VIDEO
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
        const contacts = [
            {
                icon: 'images/contact.svg#icon-phone',
                desc: '078 275 9831 - 094 942 9254',
            },
            {
                icon: 'images/contact.svg#icon-map',
                desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
            },

        ];

        const socials = [
            {
                icon: 'images/contact.svg#icon-facebook',
                desc: 'https://www.facebook.com/Superknife0512',
            },
            {
                icon: 'images/contact.svg#icon-googleplus',
                desc: 'https://bom.to/0vEt3',
            },

        ]
        
        const teachers =await Teacher.find({role: 'teacher'});
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
        })

    } catch (err) {
        next(err)
    }
}

exports.getTeacherDetail = async (req,res,next)=>{
    try{
        const contacts = [
            {
                icon: 'images/contact.svg#icon-phone',
                desc: '078 275 9831 - 094 942 9254',
            },
            {
                icon: 'images/contact.svg#icon-map',
                desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
            },

        ];

        const socials = [
            {
                icon: 'images/contact.svg#icon-facebook',
                desc: 'https://www.facebook.com/Superknife0512',
            },
            {
                icon: 'images/contact.svg#icon-googleplus',
                desc: 'https://bom.to/0vEt3',
            },

        ]
        
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
        const contacts = [
            {
                icon: 'images/contact.svg#icon-phone',
                desc: '078 275 9831 - 094 942 9254',
            },
            {
                icon: 'images/contact.svg#icon-map',
                desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
            },

        ];

        const socials = [
            {
                icon: 'images/contact.svg#icon-facebook',
                desc: 'https://www.facebook.com/Superknife0512',
            },
            {
                icon: 'images/contact.svg#icon-googleplus',
                desc: 'https://bom.to/0vEt3',
            },

        ]
        
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
        const contacts = [
            {
                icon: 'images/contact.svg#icon-phone',
                desc: '078 275 9831 - 094 942 9254',
            },
            {
                icon: 'images/contact.svg#icon-map',
                desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
            },

        ];

        const socials = [
            {
                icon: 'images/contact.svg#icon-facebook',
                desc: 'https://www.facebook.com/Superknife0512',
            },
            {
                icon: 'images/contact.svg#icon-googleplus',
                desc: 'https://bom.to/0vEt3',
            },

        ]
        
        const events = await Events.find().limit(3).sort('-createdAt');
        const remainingEvent = await Events.find().skip(3).limit(6).sort('-createdAt');
        const eventsDate = events.map(event=>{
            return event.createdAt.toISOString().split('T')[0].split('-').reverse().join('-');
        })
        const incomingEvent = await incEvent.findOne();

        res.render('event-page',{
            title: 'AK event - news',
            path: '/event-page',
            contacts,
            socials,
            events,
            eventsDate,
            remainingEvent,
            incomingEvent
        })

    } catch (err) {
        next(err);
    }
}

exports.getEventDetail = async (req,res,next)=>{
    const contacts = [
        {
            icon: 'images/contact.svg#icon-phone',
            desc: '078 275 9831 - 094 942 9254',
        },
        {
            icon: 'images/contact.svg#icon-map',
            desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
        },

    ];

    const socials = [
        {
            icon: 'images/contact.svg#icon-facebook',
            desc: 'https://www.facebook.com/Superknife0512',
        },
        {
            icon: 'images/contact.svg#icon-googleplus',
            desc: 'https://bom.to/0vEt3',
        },

    ]
    
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
    const contacts = [
        {
            icon: 'images/contact.svg#icon-phone',
            desc: '078 275 9831 - 094 942 9254',
        },
        {
            icon: 'images/contact.svg#icon-map',
            desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
        },

    ];

    const socials = [
        {
            icon: 'images/contact.svg#icon-facebook',
            desc: 'https://www.facebook.com/Superknife0512',
        },
        {
            icon: 'images/contact.svg#icon-googleplus',
            desc: 'https://bom.to/0vEt3',
        },

    ]
    
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
    const contacts = [
        {
            icon: 'images/contact.svg#icon-phone',
            desc: '078 275 9831 - 094 942 9254',
        },
        {
            icon: 'images/contact.svg#icon-map',
            desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
        },

    ];

    const socials = [
        {
            icon: 'images/contact.svg#icon-facebook',
            desc: 'https://www.facebook.com/Superknife0512',
        },
        {
            icon: 'images/contact.svg#icon-googleplus',
            desc: 'https://bom.to/0vEt3',
        },

    ]
    
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
    const contacts = [
        {
            icon: 'images/contact.svg#icon-phone',
            desc: '078 275 9831 - 094 942 9254',
        },
        {
            icon: 'images/contact.svg#icon-map',
            desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
        },

    ];

    const socials = [
        {
            icon: 'images/contact.svg#icon-facebook',
            desc: 'https://www.facebook.com/Superknife0512',
        },
        {
            icon: 'images/contact.svg#icon-googleplus',
            desc: 'https://bom.to/0vEt3',
        },

    ]
    
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
    const contacts = [
        {
            icon: 'images/contact.svg#icon-phone',
            desc: '078 275 9831 - 094 942 9254',
        },
        {
            icon: 'images/contact.svg#icon-map',
            desc: '23 Thái Thị Bôi, q Thanh Khê, tp. Đà Nẵng',
        },

    ];

    const socials = [
        {
            icon: 'images/contact.svg#icon-facebook',
            desc: 'https://www.facebook.com/Superknife0512',
        },
        {
            icon: 'images/contact.svg#icon-googleplus',
            desc: 'https://bom.to/0vEt3',
        },

    ]
    
    
    try{
        const search = req.body.search;
        const courses = await Course.find().populate('teacher');

        const searchPattern = new RegExp(search, "ig");
        const results = [];
        
        courses.forEach(course=>{
            if(course.title.match(searchPattern)){
                results.push(course)
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