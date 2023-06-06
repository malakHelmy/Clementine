

$(document).ready(function () {
  $("#checkoutForm").on('submit', function (e) {
      e.preventDefault();
  
      const data = { 
        userfullname:  $('#userfullname').val(),
        shippingAddress1: $('#shippingAddress1').val(),
        email: $('#email').val(),
        city: $('#city').val(),
        state: $('#statetype').val(),
        zip: $('#zipcode').val(),
        CreditCardNumber:$('#CreditCardNumber').val(),
        exp_month:$('#exp_month').val(),
        exp_year:$('#expyeardate').val(),
        cvv:$('#cvv').val()
   };

    $.ajax({
      url: '/checkout',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({inputs:data }),
      success: function (Error) {

            let c = 0;
            if(Error == 'done'){
                console.log('successful')
                $.ajax({
                    url: '/placeorder',
                    method: 'GET',
                    success: function (response) {
                        window.location.href = '/placeorder';
                    },
                    error:function(err){
                    }
                });
            }

            if (Error.length > 0) {
                if (Error.userFullName != undefined) {
                    $('#firstnamelabel').html(errors.userFullName);
                    const pass = document.getElementById('firstname');
                    const formc = pass.parentElement;
                    formc.className = 'textfield failed';
                    c++;
                } else {
                    $('#firstnamelabel').html('');
                    const pass = document.getElementById('firstname');
                    const formc = pass.parentElement;
                    formc.className = 'textfield success';
                }
                if (Error.shippingAddress1 != undefined) {
                    $('#addlabel').html(errors.shippingAddress1);
                    const pass = document.getElementById('address');
                    const formc = pass.parentElement;
                    formc.className = 'textfield failed';
                    c++;
                } else {
                    $('#addlabel').html('');
                    const pass = document.getElementById('address');
                    const formc = pass.parentElement;
                    formc.className = 'textfield success';
                }
                if (Error.city != undefined) {
                    $('#citylabel').html(errors.city);
                    const pass = document.getElementById('city');
                    const formc = pass.parentElement;
                    formc.className = 'textfield failed';
                    c++;
                } else {
                    $('#citylabel').html('');
                    const pass = document.getElementById('city');
                    const formc = pass.parentElement;
                    formc.className = 'textfield success';
                }
                if (Error.state != undefined) {
                    $('#statelabel').html(errors.state);
                    c++;
                } else {
                    $('#statelabel').html('');
                }
                if (Error.zip != undefined) {
                    $('#ziplabel').html(errors.zip);
                    const pass = document.getElementById('zipcode');
                    const formc = pass.parentElement;
                    formc.className = 'textfield failed';
                    c++;
                } else {
                    $('#ziplabel').html('');
                    const pass = document.getElementById('zipcode');
                    const formc = pass.parentElement;
                    formc.className = 'textfield success';
                }
                if (Error.CreditCardNumber != undefined) {
                    $('#cardlabel').html(errors.CreditCardNumber);
                    const pass = document.getElementById('card');
                    const formc = pass.parentElement;
                    formc.className = 'textfield failed';
                    c++;
                } else {
                    $('#cardlabel').html('');
                    const pass = document.getElementById('card');
                    const formc = pass.parentElement;
                    formc.className = 'textfield success';
                }
                if (Error.exp_month != undefined) {
                    $('#cardexlabel').html(errors.exp_month);
                    const pass = document.getElementById('cardexp');
                    const formc = pass.parentElement;
                    formc.className = 'textfield failed';
                    c++;
                } else {
                    $('#cardexlabel').html('');
                    const pass = document.getElementById('cardexp');
                    const formc = pass.parentElement;
                    formc.className = 'textfield success';
                }
                if (Error.exp_year != undefined) {
                    $('#expirelabel').html(errors.exp_year);
                    c++;
                } else {
                    $('#expirelabel').html('');
                }
                if (Error.cvv != undefined) {
                    $('#cardcvvlabel').html(errors.cvv);
                    const pass = document.getElementById('cardcvv');
                    const formc = pass.parentElement;
                    formc.className = 'textfield failed';
                    c++;
                } else {
                    $('#cardcvvlabel').html('');
                    const pass = document.getElementById('cardcvv');
                    const formc = pass.parentElement;
                    formc.className = 'textfield success';
                }
            }
       
       
       
       
       
        }})})
});

function checkinputs() {
    const fullnamevalue = fullname.value.trim();
    const addressvalue = address.value.trim();
    const cityvalue = city.value.trim();
    const zipvalue = zip.value.trim();
    const cardvalue = card.value.trim();
    const cardexpvalue = cardexp.value.trim();
    const cardcvv_value = cardcvv.value.trim();
    const selectedstate = options[state.selectedIndex].value;
    const selectedexpyear = options[expyear.selectedIndex].value;
    const emailvalue = email.value;

    if (selectedexpyear == 'selectyear') {
        alert('Please select an expiry year.');
    }

    if (selectedstate == 'selectstate') {
        alert('Please select a state.');
    }

    const l = document.getElementById('firstnamelabel');
    if (fullnamevalue == '') {
        const formc = fullname.parentElement;
        formc.className = 'textfield failed';
        l.innerHTML = 'Please enter your full name';
    } else {
        const formc = fullname.parentElement;
        formc.className = 'textfield success';
        l.innerHTML = '';
    }

    if (addressvalue == '') {
        const l = document.getElementById('addlabel');
        const formc = address.parentElement;
        formc.className = 'textfield failed';
        l.innerHTML = 'Please enter your address';
    } else {
        const formc = address.parentElement;
        const l = document.getElementById('addlabel');
        formc.className = 'textfield success';
        l.innerHTML = '';
    }

    if (emailvalue == '') {
        const l = document.getElementById('emaillabel');
        const formc = email.parentElement;
        formc.className = 'textfield failed';
        l.innerHTML = 'Please enter your mail';
    } else {
        const formc = email.parentElement;
        const l = document.getElementById('emaillabel');
        formc.className = 'textfield success';
        l.innerHTML = '';
    }

    if (cityvalue == '') {
        const l = document.getElementById('citylabel');
        const formc = city.parentElement;
        formc.className = 'textfield failed';
        l.innerHTML = 'Please enter a city name';
    } else {
        const l = document.getElementById('citylabel');
        const formc = city.parentElement;
        formc.className = 'textfield success';
        l.innerHTML = '';
    }

    if (zipvalue == '') {
        const l = document.getElementById('ziplabel');
        const formc = zip.parentElement;
        formc.className = 'textfield failed';
        l.innerHTML = 'Please enter a zip code';
    } else {
        const l = document.getElementById('ziplabel');
        const formc = zip.parentElement;
        formc.className = 'textfield success';
        l.innerHTML = '';
    }

    if (cardvalue == '') {
        const l = document.getElementById('cardlabel');
        const formc = card.parentElement;
        formc.className = 'textfield failed';
        l.innerHTML = 'Please enter a valid card number';
    } else {
        const l = document.getElementById('cardlabel');
        const formc = card.parentElement;
        formc.className = 'textfield success';
        l.innerHTML = '';
    }

    if (cardexpvalue == '') {
        const l = document.getElementById('cardexlabel');
        const formc = cardexp.parentElement;
        formc.className = 'textfield failed';
        l.innerHTML = 'Please enter an expiry month date';
    } else {
        const l = document.getElementById('cardexlabel');
        const formc = cardexp.parentElement;
        formc.className = 'textfield success';
        l.innerHTML = '';
    }

    if (cardcvv_value == '') {
        const l = document.getElementById('cardcvvlabel');
        const formc = cardcvv.parentElement;
        formc.className = 'textfield failed';
        l.innerHTML = 'Please enter the CVV number';
    } else {
        const l = document.getElementById('cardcvvlabel');
        const formc = cardcvv.parentElement;
        formc.className = 'textfield success';
        l.innerHTML = '';
    }
}

const cardInput = document.getElementById('card');
const cardError = document.getElementById('cardError');

cardInput.addEventListener('input', () => {
    if (cardInput.value.length !== 16) {
        cardError.textContent = 'Credit card number must be 16 digits long';
    } else {
        cardError.textContent = '';
    }
});
