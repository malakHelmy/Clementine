
function myFunction() {
    var x = document.getElementById("mynavbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}

function newcollectionslider() {
    const prod_cont = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.next_arrow')];
    const preBtn = [...document.querySelectorAll('.prev_arrow')];
    
    prod_cont.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;
    
            nxtBtn[i].addEventListener('click', () => {
                item.scrollLeft += containerWidth;
            })
        
       
    
            preBtn[i].addEventListener('click', () => {
                item.scrollLeft -= containerWidth;
            })
        
        
    })
}

window.addEventListener('scroll', reveal);

function reveal(){
    var reveals=document.querySelectorAll('.reveal');
    for(var i=0;i<reveals.length;i++){
        var windowheight=window.innerHeight;
        var revealtop=reveals[i].getBoundingClientRect().top;
        var revealpoint=150;

        if(revealtop<windowheight-revealpoint){
            reveals[i].classList.add('active');
        }
       
     }
 }

 function closesidebar() {
    document.getElementById("sidebar").style.display = "none";
  }
  

