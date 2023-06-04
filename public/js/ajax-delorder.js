let timeoutbug = null;


function deleteOrder(orderID) {
    const form = event.target.closest('form'); //.closest=> to find nearest ancestor element 
    if (form) {
        const orderID = form.orderID.value;

        fetch(`/ordersdash/${productId}?ajax=true`, {
            method: 'DELETE',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },

        })
            .then(response => {
                console.log(response); //to check if its a valid json format
                return response.json();
            })
            .then(data => {
                if (data.message === "Order deleted successfully") {
                    const targetProdRow = event.target.closest('tr');
                    targetProdRow.parentElement.removeChild(targetProdRow);
                    const succmsg = document.getElementById('successmsg');
                    succmsg.textContent = 'Order successfully deleted.';
                    succmsg.classList.add('show'); //mn css
                    clearTimeout(timeoutbug); //attempting to fix timeout overridden bug
                    timeoutbug = setTimeout(hidemsg, 3000);
                } else {
                    const errmsg = document.getElementById('errmsgdel');
                    errmsg.textContent = error.message;
                    errmsg.classList.add('show');
                    clearTimeout(timeoutbug);
                    timeoutbug = setTimeout(hidemsg, 3000);
                    throw new Error('Failed to delete order, please try again.');
                }
            })

            .catch(error => {
                console.error('Error:', error);
                const errmsg = document.getElementById('errmsgdel');
                errmsg.textContent = error.message;
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
    if (errmsg.classList.contains('show')) { //checks lw css of .show mwgod
        errmsg.classList.remove('show');
    }
    if (succmsg.classList.contains('show')) {
        succmsg.classList.remove('show');
    }
}

setTimeout(hidemsg, 3000);
