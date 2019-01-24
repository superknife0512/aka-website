
$(document).ready(function(){
    $('.album-info__plus').click(function(){
        $(this).next('.album-info__title').find('.album-info__display').slideToggle(500);
        $(this).toggleClass('change-plus');
    })

    // active popup
    $('.activePopup').click(function(){
        $(this).parents('.album-info').next('.info-popup__wrapper1').fadeIn(500);
        $(this).parents('.album-info').next('.info-popup__wrapper1').find('.info-popup').fadeIn(500);
    })

    // close popup
    $('.popup__icon').click(function(){
        $(this).parents('.info-popup').fadeOut(500);
        $(this).parents('.info-popup__wrapper1').fadeOut(500);
    })

    $('.btn__delete').click(function(){
        $(this).parents('.album-info').find('.info-popup__wrapper--2').show();
        $(this).parents('.album-info').find('.info-popup--2').show();
        $(this).parents('.album-info').find('.info-popup--2').css('display', 'flex');
    })

    // close popup
    $('.btn__cancel').click(function(){
        $(this).parents('.info-popup--2').fadeOut(500);
        $(this).parents('.info-popup__wrapper--2').fadeOut(500);
    })
})


