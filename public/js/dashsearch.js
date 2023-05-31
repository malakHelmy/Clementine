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

function showPopup(customerId) {
    document.getElementById("customerId").value = customerId;
    document.getElementById("popup-container").style.display = "block";
}
function hidePopup() {
    document.getElementById("customerId").value = "";
    document.getElementById("popup-container").style.display = "none";
}
function deleteCustomer(customerId) {
    document.querySelector(`form[action="/editcustdash/${customerId}"]`).submit();
}