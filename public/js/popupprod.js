
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.close-popup');
const learnMoreLinks = document.querySelectorAll('.learn-more');
learnMoreLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const imageUrl = link.getAttribute('data-image');
        popup.querySelector('img').src = imageUrl;
        popup.style.display = 'block';
    });
});
closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});


$(document).ready(function () {
    $("#signInform").on('submit', function (e) {
        e.preventDefault();

        var ser=document.getElementById('productid');
        let id=ser.className;
       
        var data ={email: $('#email').val(),
        summary: $('#summary').val(),
        review:$('#review').val(),
        productId:id
    }; console.log(data)
        $.ajax({
            url: '/reviews',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ inputs: data }),
            success: function (response) {

                if(response == 'done')
                {

                    var email = document.getElementById("email");
                    email.value = "";
                    $('#emaillabel').html('');

                    var summary = document.getElementById("summary");
                    summary.value = "";
                    $('#summarylabel').html('');

                    var review = document.getElementById("review");
                    review.value = "";
                    $('#reviewlabel').html('');


                }
                if(response.emailerror != undefined){
                    $('#emaillabel').html(response.emailerror);
                    $('#emaillabel').css("color", "rgb(97, 9, 9)");
                }else{
                    $('#emaillabel').html('');
                }
                if(response.summaryerror != undefined){
                    $('#summarylabel').html(response.summaryerror);
                    $('#summarylabel').css("color", "rgb(97, 9, 9)");
                }else{
                    $('#summarylabel').html('');

                }
                if(response.reviewerror != undefined){
                    $('#reviewlabel').html(response.reviewerror);
                    $('#reviewlabel').css("color", "rgb(97, 9, 9)");
                }else{
                    $('#reviewlabel').html('');
                }
            },
            error:function(err){

            }
        });
    });
});
   