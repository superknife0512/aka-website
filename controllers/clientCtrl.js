
exports.getHomePage = (req,res,next)=>{
    const navData = ['Trang chủ', 'Khóa học', 'Giảng viên', 'Sự kiện', 'Trung tâm AK', 'Liên hệ' ];
    res.render('index',{
        title: 'Home Page',
        navData: navData,
        path: '/'
    })
}