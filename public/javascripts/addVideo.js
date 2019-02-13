

const app = new Vue({
    el: '#onCourse',
    data:{
        activePop: false,
        videos: [],
        title: '',
        time: '',
        videoUrl: '',
        isLoading: true,
        editVidMode: false,
        videoId: ''
    },
    created(){
        this.initVideo();
    },
    methods:{

        initVideo(){
            setTimeout(()=>{
                this.videos = [];
                this.isLoading = true;
                fetch('/admin/online-course/allVideo?onCourseId='+this.$refs.onCourseId.value)
                .then(res=>{
                    return res.json()
                }                
                ).then(resData=>{
                    console.log(resData);
                    this.videos = [...resData.videos]
                    this.isLoading =false;
                }).catch(err=>{
                    alert('Some thing went wrong');
                    throw new Error('Can not fetch post form server', err)
                })
        
            },500)
        },

        resetForm(){
            this.title = '';
            this.time = '';
            this.videoUrl = '';
        },

        deactivePop(){
            this.activePop = false;
            this.editVidMode = false;
            this.resetForm();
        },

        postVideo(){
            console.log(this.$refs.onCourseId);
            fetch('/admin/online-course/addVideo',{
                method: 'POST',
                headers:{
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    title: this.title,
                    time: this.time,
                    videoUrl: this.videoUrl,
                    onCourseId: this.$refs.onCourseId.value,
                })
            }).then(res=>{
                console.log(res);
                return res.json()
            }).then(resData=>{
                console.log(resData);
                this.videos.push(resData.lecture);
                this.resetForm();
                alert('Has been add a course');
                this.activePop = false;
            }).catch(err=>{
                alert('something went wrong')
                console.log(err);
                throw new Error('Can not send video to server')
                
            })
        },

        deleteVid(videoId){
            if(window.confirm('You really want to delete it?')){

                fetch('/admin/online-course/video',{
                    method:'DELETE',
                    headers:{
                        'Content-Type': 'Application/json'
                    },
                    body: JSON.stringify({
                        videoId,
                        onCourseId: this.$refs.onCourseId.value
                    })
                }).then(res=>{
                    return res.json()
                }).then(resData=>{
                    const videoIndex = this.videos.findIndex(vid=> vid._id === videoId);
                    this.videos.splice(videoIndex, 1);
                    alert(resData.message);
                }).catch(err=>{
                    alert('Can not delete this video');
                    throw new Error(err)
                })
            } else {
                return false;
            }
        },

        editVid(videoId){
            this.activePop = true;
            const video = this.videos.find(vid=>{
                return vid._id === videoId;
            })
            this.videoId = videoId;
            this.title = video.title;
            this.time = video.time;
            this.videoUrl = video.videoUrl;
            this.editVidMode = true;
        },

        putVideo(){            
            const onCourseId = this.$refs.onCourseId.value;
            fetch('/admin/online-course/video',{
                method: 'PUT',
                headers:{
                    'Content-Type': 'Application/json'
                },
                body:JSON.stringify({
                    onCourseId,
                    videoId: this.videoId,
                    title: this.title,
                    time: this.time,
                    videoUrl: this.videoUrl,
                })
            }).then(res=>{
                return res.json()
            }).then(resData=>{
                alert(resData.message);
                this.activePop = false;
                this.initVideo();
                this.deactivePop();
                
            }).catch(err=>{
                alert('Something went wrong');
                throw new Error(err)
            })
        }
    }
})

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