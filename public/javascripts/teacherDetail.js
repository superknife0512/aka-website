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

// pannel function
const btnVid = $('#btn-video');
const btnAl = $('#btn-album');
const btnSche = $('#btn-schedule');
const allBtn = document.querySelectorAll('.teacher-page__btn');

const paneVideo = $('#pane-video');
const paneAlbum = $('#pane-album');
const paneSche = $('#pane-schedule');
const allPannel = document.querySelectorAll('.teacher-page__body');

allPannel.forEach(pane=>{
    pane.style.display = 'none',
    allPannel[0].style.display = 'block';
})

btnVid.addClass('teacher-page__btn-active');

function displayOne(displayEl,btn){
    allPannel.forEach(pane=>{
        pane.style.display = 'none';
    })
    allBtn.forEach(btn=>{
        btn.classList.remove('teacher-page__btn-active')
    })
    displayEl.css('display', 'block');
    $(btn).addClass('teacher-page__btn-active')
}

btnVid.click(function(){
    displayOne(paneVideo,this)
})

btnAl.click(function(){
    displayOne(paneAlbum,this)
})

btnSche.click(function(){
    displayOne(paneSche,this)
})