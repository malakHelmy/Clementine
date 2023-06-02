const search = document.querySelector('.search_orders input'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');

search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    });

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

function deleteCustomer(event) {
    const form = event.target.closest('form');
    if (form && confirm('Are you sure you want to delete this customer?')) {
        const customerId = form.customerId.value;
        fetch(`/editcustdash/${customerId}?ajax=true`, {
            method: 'POST',
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
            //ashan yearf en fetch is made using ajax
            //to indicate that a request is an ajax request p.s. not an offical http eader
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.message === "User deleted successfully") {
                    const targetcustrow = event.target.closest('tr');
                    targetcustrow.parentElement.removeChild(targetcustrow);
                } else {
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