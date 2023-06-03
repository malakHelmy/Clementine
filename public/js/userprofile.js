document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('.updateForm');

    form.on('submit', function () {
        let data = {
            fname: document.getElementById('fname').value,
            lname: document.getElementById('lname').value,
            email: document.getElementById('email').value,
            cpass: document.getElementById('cpass').value,
            newpass: document.getElementById('newpass').value,
            pnumber: document.getElementById('pnumber').value,
            address: document.getElementById('address').value,
        };

        fetch('/userprofile/editprofile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload: data }),
        })
            .then((res) => res.json())
            .then((response) => {
                let c = 0;
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
                    }
                }
            });
    });
});
