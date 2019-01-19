
$(document).ready(function(){
    $('.album-info__plus').click(function(){
        $(this).next('.album-info__title').find('.album-info__display').slideToggle(500);
        $(this).toggleClass('change-plus');
    })
})