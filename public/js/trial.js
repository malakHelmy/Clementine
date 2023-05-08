
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

