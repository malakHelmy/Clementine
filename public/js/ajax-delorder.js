const deleteButtons = document.querySelectorAll('.delete-order');
deleteButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const form = event.target.closest('form');
    const orderId = form.querySelector('[name="orderId"]').value;
    deleteOrder(orderId);
  });
});

function deleteOrder(orderId) {
    fetch(`/ordersdash/${orderId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        // If the deletion was successful, remove the order from the DOM
        const order = document.querySelector(`[data-order-id="${orderId}"]`);
        order.remove();
      } else {
        // If there was an error, display an error message
        const errmsgdel = document.querySelector('#errmsgdel');
        errmsgdel.textContent = 'Failed to delete order';
      }
    })
    .catch(error => {
      // If there was a network error, display an error message
      const errmsgdel = document.querySelector('#errmsgdel');
      errmsgdel.textContent = 'Network error';
    });
  }