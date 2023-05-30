const closeIcons = document.querySelectorAll('.ri-close-fill');

closeIcons.forEach(closeIcon => {
  closeIcon.addEventListener('click', async () => {
    var wishprodID = closeIcon.dataset.wishid;
    console.log(wishprodID); // Log the value of prodID to the console

    const response = await fetch('/remove-from-wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ wishprodID })
    });
  });
});