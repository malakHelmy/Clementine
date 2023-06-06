$(document).ready(function () {
    $("#signInform").on('submit', function (e) {
        e.preventDefault();

        var checkbox = document.getElementById("isAdmin");
        var check = checkbox.checked;

        const inputs = {
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            confirmpassword: $('#confirmpassword').val(),
            phone: $('#phone').val(),
            isAdmin: check
        };

        console.log(inputs)
        let c = 0;
        $.ajax({
            url: '/addemployers',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ inputs }),
            success: function (response) {

                if (response == 'done') {
                    var email = document.getElementById("email");
                    email.value = "";
                    $('#emaillabel').html('');

                    var summary = document.getElementById("confirmpassword");
                    summary.value = "";
                    $('#confirmpasslabel').html('');

                    var review = document.getElementById("password");
                    review.value = "";
                    $('#passlabel').html('');

                    var first = document.getElementById("name");
                    first.value = "";
                    $('#namelabel').html('');

                    var phone = document.getElementById("phone");
                    phone.value = "";
                    $('#phonelabel').html('');

                } else {
                    if (response.nameerror == undefined) {
                        $('#namelabel').html('');
                    } else {
                        $('#namelabel').html(response.nameerror);
                    }

                    if (response.emailerror != undefined) {
                        $('#emaillabel').html(response.emailerror);
                    }

                    if (response.passerror != undefined) {
                        $('#passlabel').html(response.passerror);
                    } else {
                        $('#passlabel').html('');
                    }

                    if (response.confirmpasserror != undefined) {
                        $('#confirmpasslabel').html(response.confirmpasserror);
                    } else {
                        $('#confirmpasslabel').html('');
                    }

                    if (response.phoneerror == undefined) {
                        $('#phonelabel').html('');
                    } else {
                        $('#phonelabel').html(response.phoneerror);
                    }
                }
            },
            error: function (err) {
            }
        });
    });
});