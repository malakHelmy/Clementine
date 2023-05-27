
const wishlistIcons = document.querySelectorAll('.ri-heart-line');

wishlistIcons.forEach(icon => {
  icon.addEventListener('click', async () => {
    var prodID = icon.dataset.productid;

    const response = await fetch('/add-to-wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prodID })
    });
  });
});