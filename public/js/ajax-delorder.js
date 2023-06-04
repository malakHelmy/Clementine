// orders.js
const deleteForms = document.querySelectorAll('.delete-form');
deleteForms.forEach(form => {
  const deleteButton = form.querySelector('.delete-order');
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    const productId = form.querySelector('[name="productId"]').value;
    const confirmDelete = confirm('Are you sure you want to delete this order?');
    if (confirmDelete) {
      deleteOrder(productId);
    }
  });
});

function deleteOrder(productId) {
  fetch(`/ordersdash/${productId}?ajax=true`, {
    method: 'POST',
  })
  .then(response => {
    if (response.ok) {
      const order = document.querySelector(`[data-order-id="${productId}"]`);
      order.remove();
    } else {
      alert('Failed to delete order');
    }
  })
  .catch(error => {
    alert('Network error');
  });
}