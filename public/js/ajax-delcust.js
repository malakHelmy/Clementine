let timeoutbug = null;

function deleteCustomer(event) {
    const form = event.target.closest('form');
    if (form && confirm('Are you sure you want to delete this customer?')) {
        const customerId = form.customerId.value;
        fetch(`/editcustdash/${customerId}?ajax=true`, {
            method: 'POST',
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
            //ashan yearf en fetch is made using ajax
            // p.s. not an offical http header
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.message === "User deleted successfully") {
                    const targetcustrow = event.target.closest('tr');
                    targetcustrow.parentElement.removeChild(targetcustrow);
                    const succmsg = document.getElementById('successmsg');
                    succmsg.textContent = 'Customer successfully deleted.';
                    succmsg.classList.add('show'); //mn css
                    clearTimeout(timeoutbug); //attempting to fix timeout overridden bug
                    timeoutbug = setTimeout(hidemsg, 3000);
                } else {
                    const errmsg = document.getElementById('errmsgdel');
                    errmsg.textContent = error.message;
                    errmsg.classList.add('show');
                    clearTimeout(timeoutbug);
                    timeoutbug = setTimeout(hidemsg, 3000);
                    throw new Error('Failed to delete customer, please try again.');
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
    const deleteButton = event.target.closest('.delete-customer');
    if (deleteButton) {
        event.preventDefault();
        deleteCustomer(event);
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