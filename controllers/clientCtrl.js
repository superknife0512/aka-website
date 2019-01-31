const Course = require('../models/Course');
const Events = require('../models/Event');

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
            socials
        })

    } catch (err) {
        next(err);
    }
}