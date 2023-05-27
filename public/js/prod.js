
const wishlistIcon = document.getElementById('heart-icon');

wishlistIcon.addEventListener('click', async () => {

  const prodID = wishlistIcon.dataset.productid;

  const response = await fetch('/add-to-wishlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prodID })
  });
});