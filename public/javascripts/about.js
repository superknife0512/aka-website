
$(document).ready(function(){

    const leftDOM = '.about-page__left';
    
    const imgDOMs = document.querySelectorAll('.about-page__img');

    function hideALl(activeOne){
        imgDOMs.forEach(dom=>{
            dom.classList.add('about-page__hidden');
        })
        activeOne.classList.remove('about-page__hidden')
        activeOne.classList.add('about-page__display')
    }

    hideALl(imgDOMs[0]);

    $(leftDOM).scroll(function(){
        console.log($(this).scrollTop());
        if( $(this).scrollTop() < 600){
            hideALl(imgDOMs[0]);
        } else if ($(this).scrollTop() > 600 && $(this).scrollTop() < 1300){
            hideALl(imgDOMs[1]);
        } else if ($(this).scrollTop() > 1300) {
            hideALl(imgDOMs[2]);
        }
    })
})

