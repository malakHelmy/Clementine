$(document).ready(function() {
    $("#changePassForm").on('submit', function(e) {
        e.preventDefault();

        const oldPassword = $('#oldPassword').val();
        const newPassword = $('#newPassword').val();
        const confirmPassword = $('#confirmPassword').val();

        $.ajax({
            url: '/validate_old_password',
            method: 'POST',
            data: { oldPassword: oldPassword },
            success: function(response) {
                if (response.valid) {
                  
                    if (newPassword === confirmPassword) {
                        $.ajax({
                            url: '/change_password',
                            method: 'POST',
                            data: { newPassword: newPassword },
                            success: function(response) {
                                toastr.success(response, 'Success', { closeButton: true });
                            },
                            error: function(err) {
                                alert('Error updating password');
                            }
                        });
                    } else {
                        alert('New password and confirm password do not match');
                    }
                } else {
                    alert('Invalid old password');
                }
            },
            error: function(err) {
                alert('Error validating old password');
            }
        });
    });
});
