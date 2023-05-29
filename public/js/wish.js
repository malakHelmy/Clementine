const closeIcons = document.querySelectorAll('.ri-close-fill');

closeIcons.forEach(icon => {
  icon.addEventListener('click', async () => {
    var prodID = icon.dataset.wishid;
    console.log(prodID); // Log the value of prodID to the console

    const response = await fetch('/remove-from-wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prodID })
    });
  });
});