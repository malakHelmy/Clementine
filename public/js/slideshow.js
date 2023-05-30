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

let imgs = [document.getElementById('darkfav'), document.getElementById('fav')];
const white = document.getElementById('fav');
const dark = document.getElementById('darkfav');

async function add() {
    var prodID = white.dataset.wishid;
    document
        .getElementById('fav')
        .setAttribute('src', '/Images/darkfav.png');
    const response = await fetch('/add-to-wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prodID }),
    });
}

async function remove() {
    var wishprodID = dark.dataset.removeid;
    document
        .getElementById('darkfav')
        .setAttribute('src', '/Images/whiteheart.png');
    const response = await fetch('/remove-from-wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wishprodID }),
    });
}
