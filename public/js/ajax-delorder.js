function confirmDelete(event) {
    event.preventDefault();
    var confirmationDialog = document.getElementById("confirmationDialog");
    confirmationDialog.style.display = "block";
  
    var confirmForm = document.getElementById("confirmForm");
    var cancelButton = document.getElementById("cancelButton");
  
    cancelButton.onclick = function() {
      confirmationDialog.style.display = "none";
    }
  
    confirmForm.onsubmit = function() {
      var orderID = event.target.elements.orderID.value;
      confirmForm.elements.orderID.value = orderID;
      confirmationDialog.style.display = "none";
    }
  
    return false;
}