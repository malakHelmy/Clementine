console.log('y')

$(document).ready(function () {
    $(".removebtn").on('click', function (e) {
        e.preventDefault();
        console.log('y')
    let c=0;
        $.ajax({
            url: '/cart/remove',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ inputs: 'l' }),
            success: function (response) {
                 
            },
            error:function(err){
            }
        });
    });
});
