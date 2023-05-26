function search_cust() {
    let input = document.getElementById('searchinput').value;
    input=input.toLowerCase();
    let ul = document.getElementById("custlist");
    let x = ul.getElementsByTagName('li');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}
