$(document).ready(function(){
    $('#activePopup').click(function(){
        $('.info-popup__wrapper').fadeIn(500);
        $('.info-popup').fadeIn(500);
    })
    $('#popup__icon').click(function(){
        $('.info-popup__wrapper').fadeOut(500);
        $('.info-popup').fadeOut(500);
    })
    
    $('.deleteTesti').click(function(){
        const testiId = $(this).parent('.quote__card').find('.testiId').val();
        const courseId = $(this).next('[name=courseId]').val();    
                                                                      

        fetch(`/admin/course/delete-testimonial`,{
            method: 'POST',    
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                testiId,
                courseId
            })

        }).then(res=>{                    
            $(this).parent('.quote__card').remove(); 
            console.log(res);
            return res.json();                    
        }).then(data=>{                    
            console.log(data);
        }).catch(err=>{
            console.log(err)
        })
    })
})