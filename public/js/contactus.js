// const contactForm = document.querySelector('.contactForm');
// let fullname = document.getElementById('name');
// let subject = document.getElementById('subject');
// let uemail = document.getElementById('email');
// let message = document.getElementById('message');

// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     let formData = {
//         name: fullname.value,
//         subject: subject.value,
//         uemail: uemail.value,
//         message: message.value,
//     };

//     let requested = new XMLHttpRequest();
//     requested.open('POST', '/contactus');
//     requested.setRequestHeader('content-type', 'application/json');
//     requested.onload = function () {
//         if (requested.responseText == 'success') {
//             alert('Email sent.');
//             fullname.value = '';
//             subject.value = '';
//             uemail.value = '';
//             message.value = '';
//         }
//     };

//     requested.send(JSON.stringify(formData));
// });

$(document).ready(function () {
    $('#email').on('keyup', function (e) {
        e.preventDefault();
        var data = $('#email').val();
        $.ajax({
            url: '/customers/checkemail',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: data }),
            success: function (response) {
                console.log(response);
                if (response == 'taken') {
                    $('#emaillabel').html('valid email');
                    $('#emaillabel').css('color', 'green');
                } else if (response == 'available') {
                    $('#emaillabel').html('valid email');
                    $('#emaillabel').css('color', 'green');
                } else {
                    $('#emaillabel').html('Email is Invalid');
                    $('#emaillabel').css('color', 'red');
                }
            },
            error: function (err) {},
        });
    });
});
