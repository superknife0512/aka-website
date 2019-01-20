
$(document).ready(function(){
    $('.album-info__plus').click(function(){
        $(this).next('.album-info__title').find('.album-info__display').slideToggle(500);
        $(this).toggleClass('change-plus');
    })

    // active popup
    $('.activePopup').click(function(){
        $(this).parents('.album-info').next('.info-popup__wrapper').fadeIn(500);
        $(this).parents('.album-info').next('.info-popup__wrapper').find('.info-popup').fadeIn(500);
    })

    // close popup
    $('.popup__icon').click(function(){
        $(this).parents('.info-popup').fadeOut(500);
        $(this).parents('.info-popup__wrapper').fadeOut(500);
    })
})

