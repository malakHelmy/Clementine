const changePassForm = document.getElementById('changePassForm');
const oldPassword = document.getElementById('oldPassword');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');

function checkFields() {
    const oldPasswordValue = oldPassword.value.trim();
    const newPasswordValue = newPassword.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
    let errorCount = 0;

    if (oldPasswordValue === '') {
        const label = document.getElementById('oldPassLabel');
        const formControl = oldPassword.parentElement;
        formControl.className = 'textfield failed';
        label.innerHTML = 'Please enter your old password';
        errorCount++;
    } else {
        const formControl = oldPassword.parentElement;
        const label = document.getElementById('oldPassLabel');
        formControl.className = 'textfield success';
        label.innerHTML = '';
    }

    if (newPasswordValue === '') {
        const label = document.getElementById('newPassLabel');
        const formControl = newPassword.parentElement;
        formControl.className = 'textfield failed';
        label.innerHTML = 'Please enter your new password';
        errorCount++;
    } else {
        const formControl = newPassword.parentElement;
        const label = document.getElementById('newPassLabel');
        formControl.className = 'textfield success';
        label.innerHTML = '';
    }

    if (confirmPasswordValue === '') {
        const label = document.getElementById('confPasswordLabel');
        const formControl = confirmPassword.parentElement;
        formControl.className = 'textfield failed';
        label.innerHTML = 'Please enter your confirm password';
        errorCount++;
    } else if (confirmPasswordValue !== newPasswordValue) {
        const label = document.getElementById('confPasswordLabel');
        const formControl = confirmPassword.parentElement;
        formControl.className = 'textfield failed';
        label.innerHTML = 'New password and confirm password do not match';
        errorCount++;
    } else {
        const formControl = confirmPassword.parentElement;
        const label = document.getElementById('confPasswordLabel');
        formControl.className = 'textfield success';
        label.innerHTML = '';
    }

    if (errorCount === 0) {
        return true;
    } else {
        return false;
    }
}

changePassForm.addEventListener('submit', function (e) {
    if (!checkFields()) {
        e.preventDefault();
    }
});
