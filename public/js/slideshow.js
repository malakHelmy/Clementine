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

var popup = document.getElementById('popup');

$(document).on('click', '.fav', async function () {
    var prodID = $(this).data('wishid');
    document.getElementById('fav').setAttribute('src', '/Images/darkfav.png');
    fetch('/add-to-wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prodID }),
    })
        .then((res) => res.json())
        .then((data) => {
            let product = data.product;
            popup.classList.add('open-popup');
            popup.innerHTML = ``;
            popup.innerHTML += `You have added <span> ${product.name} </span>to your wishlist`;
            setTimeout(function () {
                popup.className = 'popup';
            }, 3000);
        });
});

$(document).on('click', '.darkfav', async function () {
    var wishprodID = $(this).data('wishid');
    document
        .getElementById('darkfav')
        .setAttribute('src', '/Images/whiteheart.png');
    fetch('/remove-from-wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wishprodID }),
    });
});
