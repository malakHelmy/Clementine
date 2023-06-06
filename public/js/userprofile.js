let form = document.querySelector('.form-horizontal');


$('.form-horizontal').on('submit', function (event) {
    event.preventDefault();
    const data = { 
        fname:  $('#fname').val(),
        lname: $('#lname').val(),
        email: $('#email').val(),
        cpass: $('#cpass').val(),
        newpass: $('#newpass').val(),
        address:$('#address ').val(),
        pnumber: $('#pnumber').val()
   };
    
    let c = 0;
    $.ajax({
        url: '/userprofile/editprofile',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ inputs: data }),
        success: function (response) {
            {
                if (response == 'done') {
                    $.ajax({
                        url: '/editprofile',
                        method: 'GET',
                        success: function (response) {
                            window.location.href = '/editprofile';
                        },
                        error: function (err) {},
                    });
                }
                if (response.passerror != '') {
                    $('#cpasslabel').html(response.passerror);
                    
                }

                if (response.confirmpasserror != '') {
                    $('#newpasslabel').html(response. confirmpasserror );
                
                }
                if (response.pnumbererror != '') {
                    $('#pnumberlabel').html(response.phoneerror);
                
                }
                if (response.emailerror != '') {
                    $('#emaillabel').html(response.emailerror );
              
                }
                if (response.addresserror != '') {
           
                    $('#adresslabel').html(response.addresserror );
                }
               
            }
        },
        error: function (err) {},
    });
});

// let data = {
//             fname: document.getElementById('fname').value,
//             lname: document.getElementById('lname').value,
//             email: document.getElementById('email').value,
//             cpass: document.getElementById('cpass').value,
//             newpass: document.getElementById('newpass').value,
//             pnumber: document.getElementById('pnumber').value,
//             address: document.getElementById('address').value,
//         }
