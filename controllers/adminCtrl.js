

exports.getAdminBoard = (req,res,next)=>{
    res.render('admin/adminBoard',{
        title: 'admin board'
    })
}