$(document).ready(function() {
    $("#changePassForm").on('submit', function(e) {
        e.preventDefault();

        // Get form field values
        const oldPassword = $('#oldPassword').val();
        const newPassword = $('#newPassword').val();
        const confirmPassword = $('#confirmPassword').val();

        // Validate old password using AJAX
        $.ajax({
            url: '/validate_old_password',
            method: 'POST',
            data: { oldPassword: oldPassword },
            success: function(response) {
                if (response.valid) {
                    // Old password is valid, proceed with checking and updating the new password
                    if (newPassword === confirmPassword) {
                        // New password and confirm password match, proceed with updating
                        $.ajax({
                            url: '/change_password',
                            method: 'POST',
                            data: { newPassword: newPassword },
                            success: function(response) {
                                // Password updated successfully
                                alert('Password updated successfully');
                            },
                            error: function(err) {
                                // Error occurred while updating password
                                alert('Error updating password');
                            }
                        });
                    } else {
                        // New password and confirm password do not match
                        alert('New password and confirm password do not match');
                    }
                } else {
                    // Old password is invalid
                    alert('Invalid old password');
                }
            },
            error: function(err) {
                // Error occurred while validating old password
                alert('Error validating old password');
            }
        });
    });
});