const wishlistIcons = document.querySelectorAll('.ri-heart-line');

wishlistIcons.forEach((icon) => {
    icon.addEventListener('click', async () => {
        var prodID = icon.dataset.productid;
        document
            .getElementById('heart-icon-' + prodID)
            .setAttribute('class', 'ri-heart-fill');
        const response = await fetch('/add-to-wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prodID }),
        });
    });
});

const removeWish = document.querySelectorAll('.ri-heart-fill');

removeWish.forEach((closeIcon) => {
    closeIcon.addEventListener('click', async () => {
        var wishprodID = closeIcon.dataset.productid;
        document
            .getElementById('included-icon-' + wishprodID)
            .setAttribute('class', 'ri-heart-line');
        console.log(wishprodID); // Log the value of prodID to the console

        const response = await fetch('/remove-from-wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wishprodID }),
        });
    });
});
