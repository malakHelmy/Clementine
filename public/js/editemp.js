$(document).ready(function () {
    $("#signInform").on('submit', function (e) {
        e.preventDefault();
        var employeeId = $(this).data('employeeid');
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

        let c = 0;
        $.ajax({
            url: `/editemployers/${employeeId}`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ inputs }),
            success: function (response) {

                if (response == 'done') {
                    $.ajax({
                        url: '/employersdash',
                        method: 'GET',
                        success: function (response) {
                            window.location.href = '/employersdash';
                        },
                        error:function(err){
                        }
                    });

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