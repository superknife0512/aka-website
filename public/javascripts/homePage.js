
    $('#item-0').addClass('active-home');

    const glider1 = new Glider(document.querySelector('.course-section__glider'), {
    // Mobile-first defaults
    slidesToShow: 1,
    slidesToScroll: 2,     
    scrollLock: true,
    draggable: true,            
    arrows: {
        prev: '.course-section__icon--left',
        next: '.course-section__icon--right'
    },
    responsive: [{
        // screens greater than >= 1024px
        breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,                     
                dragVelocity: 2,
                duration: 2,
                
            }
            }
        ]
    });

    const glider2 = new Glider(document.querySelector('.events__glider'), {
    // Mobile-first defaults
    slidesToShow: 1,
    slidesToScroll: 2,  
    scrollLock: true,   
    draggable: true,         
    arrows: {
        prev: '.events-sect__icon--left',
        next: '.events-sect__icon--right'
    },
    responsive: [{
        // screens greater than >= 1024px
        breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                // itemWidth: 150,                        
                dragVelocity: 2,
                duration: 2,
                
            }
            }
        ]
    });

    const allTestis = document.querySelectorAll('.testi__display');
    let testiOrder = 1;
    function displayQuote(){
        allTestis.forEach(testi=>{
            testi.style.display = 'none';
        })
        if(testiOrder + 1 > 3){
            testiOrder = 1
        } else {
            testiOrder += 1;
        }
        allTestis[testiOrder-1].style.display = 'flex';
        setTimeout(displayQuote, 5000);
    }
    displayQuote();

    $('.hero__responsive').click(function(){
        $('.hero__nav--list').slideToggle('normal');
        $('.hero__nav--list').css('display', 'flex');
    })

    $('.glider').css('overflow-x: visible')

const app = new Vue({
    el: '.homepage-popup',
    data:{
        isActive:false
    },
    created(){
        setTimeout(()=>{
            this.isActive = true;
        }, 2800)
    }
})