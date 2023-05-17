const contactForm = document.querySelector('.contactForm');
let fullname = document.getElementById('name');
let subject = document.getElementById('subject');
let uemail = document.getElementById('email');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    let formData = {
        name: fullname.value,
        subject: subject.value,
        uemail: uemail.value,
        message: message.value
    }

    let requested = new XMLHttpRequest();
    requested.open('POST', '/contactus');
    requested.setRequestHeader('content-type', 'application/json');
    requested.onload = function() {
        console.log(requested.responseText);
        if (requested.responseText == 'success') {
            alert('Email sent.');
            fullname.value='';
            subject.value='';
            uemail.value='';
            message.value='';
        }
        else {
            alert('We are sorry, something went wrong.')
        }
    }

    requested.send(JSON.stringify(formData));

})
