const Course = require('../models/Course');
const Events = require('../models/Event');

exports.getHomePage =async (req,res,next)=>{

    try{
        const navData = ['Trang chủ', 'Khóa học', 'Giảng viên', 'Sự kiện', 'Trung tâm AK', 'Liên hệ' ];
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

        const courses = await Course.find().populate('teacher').limit(6);
        const events = await Events.find().limit(6).sort('-createdAt');
        
        const offPrices = courses.map(course => {
            const oldPrice = parseInt(course.oldPrice.split('.').join(''));
            const price = parseInt(course.price.split('.').join(''));
            const pricesMinus = oldPrice - price;
            return ((pricesMinus/oldPrice)*100).toFixed(0)
        })

        console.log(offPrices);

        res.render('index',{
            title: 'Home Page',
            navData: navData,
            benefitData,
            path: '/',
            offPrices,
            courses,
            events
        })

    } catch (err) {
        next(err)
    }
    
}