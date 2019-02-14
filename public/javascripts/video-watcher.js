


const app = new Vue({
    el: '#video-app',
    data:{
        onCourse: {},
        videos:[],
        onCourseId: '',
        videoUrl: '',
        videoId:'',
        curTitle: '',
        curTime: '',
        documentLink: '',
        isFull: false,
        isLoading: true,
    },
    created(){
        setTimeout(() => {
            this.onCourseId = this.$refs.onCourseId.value;
            this.initApp();     
        }, 500);
    },
    methods:{
        initApp(){
            this.isLoading = true;
            fetch('/course-online/video/'+ this.onCourseId)
                .then(res=>{
                    return res.json();
                }).then(resData=>{
                    console.log(resData);
                    this.isLoading = false
                    this.onCourse = resData.onCourse;
                    this.videos = resData.onCourse.courses;
                    this.videoUrl = this.videos[0].videoUrl;                           
                    this.videoId = this.videos[0].videoId;                           
                    this.curTime = this.videos[0].time;                           
                    this.curTitle = this.videos[0].title;                           
                    this.documentLink = this.videos[0].documentLink;                           
                    this.initFacebook();
                }).catch(err=>{
                    alert('Something went wrong');
                    throw err
                })
        },
        initFacebook(){

                //function display facebook video
                window.fbAsyncInit = function() {
                    FB.init({
                    appId            : '461129931351975',
                    autoLogAppEvents : true,
                    xfbml            : true,
                    version          : 'v3.2'
                    });
                };
                
                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "https://connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
        },
        chooseVideo(videoId){
            const video = this.videos.find(vid=> videoId === vid._id);
            this.videoUrl = '';
            this.videoUrl = video.videoUrl;
            this.videoId = video.videoId;
            this.curTitle = video.title;
            this.curTime = video.time;
            this.documentLink = video.documentLink;
            this.initFacebook();
        },
        popFull(){
            this.isFull = true;
        }
    },
}) 

