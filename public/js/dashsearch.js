
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
    
}

function delete_product(){
    var table = document.getElementById("product_list");
    var rowCount = table_rows.length;
    while(table_rows.length > 0) {
        table.deleteRow(0);
      }
 }
 

 function del() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase();
        while(table_rows.length > 0) {
            table_rows.deleteRow(0);
          }
    });
    
}