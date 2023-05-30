const buttons = document.querySelectorAll('.img-item button img');

// Get the img-showcase element
var imgShowcase = document.querySelector('.img-showcase img');

// Add a click event listener to each button
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Get the image path from the button's data attribute
        var imgPath = button.dataset.imgpath;
        // Set the src attribute of the img-showcase element to the selected image path
        imgShowcase.setAttribute('src', '/Images/' + imgPath);
    });
});

const white = document.getElementById('fav');
const dark = document.getElementById('darkfav');

white.addEventListener('click', async () => {
    var prodID = white.dataset.productid;
    const response = await fetch('/add-to-wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prodID }),
    });
});

dark.addEventListener('click', async () => {
    var wishprodID = dark.dataset.productid;
    console.log(wishprodID); // Log the value of prodID to the console

    const response = await fetch('/remove-from-wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wishprodID }),
    });
});
