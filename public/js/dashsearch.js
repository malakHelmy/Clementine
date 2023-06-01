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
    const customerId = event.target.getAttribute('data-customer-id'); //from ejs to send data leh
    if (confirm('Are you sure you want to delete this customer?')) {
        fetch(`/editcustdash/${customerId}`, { 
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    const targetcustrow = event.target.closest('tr');
                    targetcustrow.parentElement.removeChild(targetcustrow);
                } else {
                    throw new Error('Failed to delete customer, please try again.');
                }
            })
            .catch(error => {
                console.error(error);
                alert('Failed to delete customer, please try again.');
            });
    }
}

const deleteButtons = document.querySelectorAll('.delete-customer');
deleteButtons.forEach(button => { //to target ay customer mn table
    button.addEventListener('click', deleteCustomer);
});