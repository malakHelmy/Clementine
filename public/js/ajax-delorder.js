function confirmDelete(event) {
    event.preventDefault();
    var confirmationDialog = document.getElementById("confirmationDialog");
    confirmationDialog.style.display = "block";

    var confirmButton = document.getElementById("confirmButton");
    var cancelButton = document.getElementById("cancelButton");

    confirmButton.onclick = function () {
        confirmationDialog.style.display = "none";
        deleteOrder(event);
    }

    cancelButton.onclick = function () {
        confirmationDialog.style.display = "none";
    }
}

function deleteOrder(event) {
    const form = event.target.closest('form');
    if (form) {
        const orderID = form.dataset.orderId;

        fetch(`/ordersdash/${orderID}?ajax=true`, {
            method: 'DELETE',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete order, please try again.');
                }
                return response.json();
            })
            .then(data => {
                if (data.message === "Order deleted successfully") {
                    const targetProdRow = form.closest('tr');
                    targetProdRow.parentElement.removeChild(targetProdRow);
                    const succmsg = document.getElementById('successmsg');
                    succmsg.textContent = 'Order successfully deleted.';
                    succmsg.classList.add('show');
                    setTimeout(() => {
                        succmsg.classList.remove('show');
                    }, 3000);
                } else {
                    const errmsg = document.getElementById('errmsgdel');
                    errmsg.textContent = data.message;
                    errmsg.classList.add('show');
                    setTimeout(() => {
                        errmsg.classList.remove('show');
                    }, 3000);
                    throw new Error('Failed to delete order, please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                const errmsg = document.getElementById('errmsgdel');
                errmsg.textContent = error.message;
                errmsg.classList.add('show');
                setTimeout(() => {
                    errmsg.classList.remove('show');
                }, 3000);
            });
    }
}

document.addEventListener('click', event => {
    const deleteButton = event.target.closest('.delete-order');
    if (deleteButton) {
        event.preventDefault();
        confirmDelete(event);
    }
});

function hidemsg() {
    const errmsg = document.getElementById('errmsgdel');
    const succmsg = document.getElementById('successmsg');
    if (errmsg.classList.contains('show')) {
        errmsg.classList.remove('show');
    }
    if (succmsg.classList.contains('show')) {
        succmsg.classList.remove('show');
    }
}

setTimeout(hidemsg, 3000);