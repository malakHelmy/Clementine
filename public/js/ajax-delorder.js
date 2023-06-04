function deleteOrder(orderID) {
    const form = event.target.closest('form');
    if (form) {
      const orderID = form.orderID.value;
  
      fetch(`/ordersdash/${orderID}?ajax=true`, {
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
            succmsg.classList.add('show');
            setTimeout(() => {
              succmsg.classList.remove('show');
            }, 3000);
          } else {
            const errmsg = document.getElementById('errmsgdel');
            errmsg.textContent = error.message;
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
      const confirmDelete = confirm('Are you sure you want to delete this order?');
      if (confirmDelete) {
        deleteOrder(deleteButton.dataset.orderId);
      }
    }
  });