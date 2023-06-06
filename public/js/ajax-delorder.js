function confirmDelete(event, orderID) {
    event.preventDefault();
    console.log("Order ID:", orderID);

    var confirmationDialog = document.getElementById("confirmationDialog");
    confirmationDialog.style.display = "block";

    var confirmForm = document.getElementById("deleteForm");
    var cancelButton = document.getElementById("cancelButton");

    cancelButton.onclick = function() {
        confirmationDialog.style.display = "none";
    }

    var confirmButton = document.getElementById("confirmButton");
    confirmButton.onclick = function(event) {
        event.preventDefault();
        console.log("Delete confirmed");

        confirmForm.elements.orderID.value = orderID;
        confirmationDialog.style.display = "none";

        
        fetch('/ordersdash/' + orderID, {
            method: 'POST',
            body: confirmForm
        })
        .then(response => {
            console.log("Server response:", response);
            if (response.ok) {
                console.log("Order deleted");
                window.location.href = '/ordersdash';
            } else {
                throw new Error('Failed to delete order');
            }
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });

        return false;
    }

    // Stop the form from submitting before the confirmation dialog is displayed
    confirmForm.addEventListener("submit", function(event) {
        event.stopPropagation();
    });

    return false;
}