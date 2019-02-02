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

//function help working with tetsimonials
const allTestis = document.querySelectorAll('.course-testi__each');
let testiOrder = 1;

function displayTesti(){
    allTestis.forEach(testi=>{
        testi.style.display = 'none'
    })
    allTestis[testiOrder-1].style.display = 'block';
    console.log(allTestis[testiOrder-1]);
}

displayTesti();

$('.arrows-right').click(function(){
    if(testiOrder +1 > allTestis.length){
        testiOrder = 1
    } else {
        testiOrder +=1
    }
    displayTesti();
})

$('.arrows-left').click(function(){
    if(testiOrder-1 < 1){
        testiOrder = allTestis.length;
    } else {
        testiOrder -=1;
    }
    displayTesti();
})        
