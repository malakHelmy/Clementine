let timeoutbug = null;

function confirmDelete(event) {
    event.preventDefault();
    var confirmationDialog = document.getElementById("confirmationDialog");
    confirmationDialog.style.display = "block";
  
    var confirmButton = document.getElementById("confirmButton");
    var cancelButton = document.getElementById("cancelButton");
  
    confirmButton.onclick = function() {
      confirmationDialog.style.display = "none";
      deleteCustomer(event);
    }
  
    cancelButton.onclick = function() {
      confirmationDialog.style.display = "none";
    }
    return false;
  }
  
  function deleteCustomer(event) {
    const form = event.target.closest('form');
    if (form) {
      const customerId = form.customerId.value;
      fetch(`/editcustdash/${customerId}?ajax=true`, {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
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
          succmsg.classList.add('show');
          setTimeout(hidemsg, 3000);
        } else {
          const errmsg = document.getElementById('errmsgdel');
          errmsg.textContent = error.message;
          errmsg.classList.add('show');
          setTimeout(hidemsg, 3000);
          throw new Error('Failed to delete customer, please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        const errmsg = document.getElementById('errmsgdel');
        errmsg.textContent = error.message;
        errmsg.classList.add('show');
        setTimeout(hidemsg, 3000);
      });
    }
  }
  
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