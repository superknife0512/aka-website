const app = new Vue({
    el: '#admin-board',
    data:{
        isActive: false,
        onCourseId: '',
    },
    methods:{
        deleteCourse(){
            this.isActive = true;
            this.onCourseId = this.$refs.courseId.value;
        }
    }
})

const glider1 = new Glider(document.querySelector('.glider'), {
    // Mobile-first defaults
    slidesToShow: 1,
    slidesToScroll: 1,            
    itemWidth: 300, 
    scrollLock: true,    
    // draggable: true,
    dots:'.dots',
    responsive: [{
        // screens greater than >= 1024px
        breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                // itemWidth: 150,                        
                dragVelocity: 2,
                duration: 2,
                dots:'.dots',
                
                arrows: {
                    prev: '.glider__icon--left',
                    next: '.glider__icon--right'
                }, 
                
            }
        }
    ]
});

const glider2 = new Glider(document.querySelector('.event-glider'), {
    // Mobile-first defaults
    slidesToShow: 1,
    slidesToScroll: 1,            
    itemWidth: 300, 
    scrollLock: true, 
    draggable: true,          
    dots:'.dots',
    responsive: [{
        // screens greater than >= 1024px
        breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                // itemWidth: 150,                        
                dragVelocity: 2,
                duration: 2,
                dots:'.dots',
                
                arrows: {
                    prev: '#arrow-left',
                    next: '#arrow-right'
                }, 
                
            }
        }
    ]
});
const glider3 = new Glider(document.querySelector('.online-course-glider'), {
    // Mobile-first defaults
    slidesToShow: 1,
    slidesToScroll: 1,            
    itemWidth: 300, 
    scrollLock: true, 
    draggable: true,          
    dots:'.dots',
    responsive: [{
        // screens greater than >= 1024px
        breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                // itemWidth: 150,                        
                dragVelocity: 2,
                duration: 2,
                dots:'.dots',
                
                arrows: {
                    prev: '#on-arrow-left',
                    next: '#on-arrow-right'
                }, 
                
            }
        }
    ]
});