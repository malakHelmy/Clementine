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
                if (response.passerror != '') {
                    let resp = document.getElementById('cpass');
                    resp.innerHTML = '';
                    resp.innerHTML += response.passerror;
                    resp.className = 'formerror show';
                    c++;
                }

                if (response.confirmpasserror != '') {
                    let resp = document.getElementById('cpassErr');
                    resp.innerHTML = '';
                    resp.innerHTML += response.confirmpasserror;
                    resp.className = 'formerror show';
                    c++;
                }
                if (response.pnumbererror != '') {
                    let resp = document.getElementById('pnumbErr');
                    resp.innerHTML = '';
                    resp.innerHTML += response.pnumbererror;
                    resp.className = 'formerror show';
                    c++;
                }
                if (response.emailerror != '') {
                    let resp = document.getElementById('emailErr');
                    resp.innerHTML = '';
                    resp.innerHTML += response.emailerror;
                    resp.className = 'formerror show';
                    c++;
                }
                if (response.addresserror != '') {
                    let resp = document.getElementById('addErr');
                    resp.innerHTML = '';
                    resp.innerHTML += response.addresserror;
                    resp.className = 'formerror show';
                    c++;
                }
                if (c == 0) {
                    let resp = document.getElementById('fnameErr');
                    resp.className = 'formerror show';
                    $.ajax({
                        url: '/editprofile',
                        method: 'GET',
                        success: function (response) {
                            window.location.href = '/editprofile';
                        },
                        error: function (err) {},
                    });
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
