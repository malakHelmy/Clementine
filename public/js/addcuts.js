


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
                    $('#emaillabel').html('Email already exists ');
                    $('#emaillabel').css('color', 'red');
                } else if (response == 'available') {
                    $('#emaillabel').html('Email is available');
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

$(document).ready(function () {
    $('#signInform').on('submit', function (e) {
        e.preventDefault();
        const inputs = {
            firstname: $('#firstname').val(),
            lastname: $('#lastname').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            confirmpassword: $('#confirmpassword').val(),
            phone: $('#phone').val(),
        };
        let c = 0;
        $.ajax({
            url: '/customers',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ inputs }),
            success: function (response) {
                if (response == 'done') {
                    var email = document.getElementById('email');
                    email.value = '';
                    $('#emaillabel').html('');

                    var summary = document.getElementById('confirmpassword');
                    summary.value = '';
                    $('#confirmpasslabel').html('');

                    var review = document.getElementById('password');
                    review.value = '';
                    $('#passlabel').html('');

                    var first = document.getElementById('firstname');
                    first.value = '';
                    $('#firstnamelabel').html('');

                    var last = document.getElementById('lastname');
                    last.value = '';
                    $('#lastnamelabel').html('');

                    var phone = document.getElementById('phone');
                    phone.value = '';
                    $('#phonelabel').html('');
                } else {
                    if (response.firsterror == undefined) {
                        $('#firstnamelabel').html('');
                    } else {
                        $('#firstnamelabel').html(response.firsterror);
                    }

                    if (response.lasterror == undefined) {
                        $('#lastnamelabel').html('');
                    } else {
                        $('#lastnamelabel').html(response.lasterror);
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

                    if (response.emailerror == undefined) {
                        $('#lastnamelabel').html('');
                    } else {
                        $('#lastnamelabel').html(response.lasterror);
                    }
                    if (response.phoneerror == undefined) {
                        $('#phonelabel').html('');
                    } else {
                        $('#phonelabel').html(response.phoneerror);
                    }
                }
            },
            error: function (err) {},
        });
    });
});

$(document).ready(function () {
    $('#updateform').on('submit', function (e) {
        let customerId = $(this).data('userid');
        e.preventDefault();
        const inputs = {
            firstname: $('#firstname').val(),
            lastname: $('#lastname').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            confirmpass: $('#confirmpass').val(),
            phone: $('#phone').val(),
        };
        console.log(inputs);
        let c = 0;
        $.ajax({
            url: `/editcustdash/update/${customerId}`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ inputs }),
            success: function (response) {
                if (response == 'done') {
                    var email = document.getElementById('email');
                    email.value = '';
                    $('#emaillabel').html('');

                    var summary = document.getElementById('confirmpassword');
                    summary.value = '';
                    $('#confirmpasslabel').html('');

                    var review = document.getElementById('password');
                    review.value = '';
                    $('#passlabel').html('');

                    var first = document.getElementById('firstname');
                    first.value = '';
                    $('#firstnamelabel').html('');

                    var last = document.getElementById('lastname');
                    last.value = '';
                    $('#lastnamelabel').html('');

                    var phone = document.getElementById('phone');
                    phone.value = '';
                    $('#phonelabel').html('');

                    $.ajax({
                        url: '/editcustdash',
                        method: 'GET',
                        success: function (response) {
                            window.location.href = '/editcustdash';
                        },
                        error:function(err){
                        }
                    });

                } else {
                    if (response.firsterror == undefined) {
                        $('#firstnamelabel').html('');
                    } else {
                        $('#firstnamelabel').html(response.firsterror);
                    }

                    if (response.lasterror == undefined) {
                        $('#lastnamelabel').html('');
                    } else {
                        $('#lastnamelabel').html(response.lasterror);
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

                    if (response.emailerror == undefined) {
                        $('#lastnamelabel').html('');
                    } else {
                        $('#lastnamelabel').html(response.lasterror);
                    }
                    if (response.phoneerror == undefined) {
                        $('#phonelabel').html('');
                    } else {
                        $('#phonelabel').html(response.phoneerror);
                    }
                }
            },
            error: function (err) {},
        });
    });
});
