

const app = new Vue({
    el: '#onCourse',
    data:{
        activePop: false,
        videos: [],
        title: '',
        time: '',
        videoUrl: '',
        isLoading: true,
    },
    created(){
        setTimeout(()=>{
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
    
        },2000)
    },
    methods:{
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
                this.time = '';
                this.videoUrl = '';
                this.title = '';
                alert('Has been add a course');
                this.activePop = false;
            }).catch(err=>{
                alert('something went wrong')
                console.log(err);
                throw new Error('Can not send video to server')
                
            })
        },

        deleteVid(videoId){
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