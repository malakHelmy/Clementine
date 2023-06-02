var closeIcons = document.querySelectorAll('.ri-close-fill');
let wishlistWrap = document.querySelector('.wishlist-wrap');

// closeIcons.forEach((closeIcon) => {
//     closeIcon.addEventListener('click', async () => {
//         var wishprodID = closeIcon.dataset.wishid;
//         console.log(wishprodID);
//         const response = await fetch('/remove-from-wishlist', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ wishprodID }),
//         });
//     });
// });

$(document).on('click', '.ri-close-fill', async function () {
    var wishprodID = $(this).data('wishid');
    fetch('/remove-wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: wishprodID }),
    })
        .then((res) => res.json())
        .then((data) => {
            wishlistWrap.innerHTML = '';
            let payload = data.payload;

            payload.forEach((items) => {
                if (items.countInStock > 0) {
                    wishlistWrap.innerHTML += `<div class="prod">
                    <div class="wishlist-items">
                        <div class="product-card">
                            <div class="product-image">
                                <a alt="" class="ri-close-fill" id="close-icon-${items._id}"
                                    data-wishid="${items._id}">
                                </a>
                                <a href="/product/${items._id}">
                                    <img src="./Images/${items.image}" class="product-thumb" alt="">
                                </a>
                                <button class="btn" data-cartitem="${items._id}">
                                            Add to cart
                                    </button>
                            </div>
                            <div class="product-info">
                                <h2 class="product-brand">
                                    ${items.name}
                                </h2>
                                <p class="product-short-des">
                                        In stock 
                                </p>
                                <span class="price">
                                    ${items.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>`;
                } else {
                    wishlistWrap.innerHTML += `<div class="prod">
                    <div class="wishlist-items">
                        <div class="product-card">
                            <div class="product-image">
                                <a alt="" class="ri-close-fill" id="close-icon-${items._id}"
                                    data-wishid="${items._id}" onclick="addCloseIconEventListeners()">
                                </a>
                                <a href="/product/${items._id}">
                                    <img src="./Images/${items.image}" class="product-thumb" alt="">
                                </a>
                                <button class="btn" data-cartitem="${items._id}">
                                            Add to cart
                                    </button>
                            </div>
                            <div class="product-info">
                                <h2 class="product-brand">
                                    ${items.name}
                                </h2>
                                <p class="product-short-des">
                                        Out of stock 
                                </p>
                                <span class="price">
                                    ${items.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>`;
                }
            });
        });
});

$(document).on('click', '.wishlist-btn', async function () {
    var prodID = $(this).data('productid');
    fetch('/add-wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prodID }),
    })
        .then((res) => res.json())
        .then((data) => {
            wishlistWrap.innerHTML = '';
            let payload = data.payload;

            payload.forEach((items) => {
                if (items.countInStock > 0) {
                    wishlistWrap.innerHTML += `<div class="prod">
                    <div class="wishlist-items">
                        <div class="product-card">
                            <div class="product-image">
                                <a alt="" class="ri-close-fill" id="close-icon-${items._id}"
                                    data-wishid="${items._id}">
                                </a>
                                <a href="/product/${items._id}">
                                    <img src="./Images/${items.image}" class="product-thumb" alt="">
                                </a>
                                <button class="btn" data-cartitem="${items._id}">
                                            Add to cart
                                    </button>
                            </div>
                            <div class="product-info">
                                <h2 class="product-brand">
                                    ${items.name}
                                </h2>
                                <p class="product-short-des">
                                        In stock 
                                </p>
                                <span class="price">
                                    ${items.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>`;
                } else {
                    wishlistWrap.innerHTML += `<div class="prod">
                    <div class="wishlist-items">
                        <div class="product-card">
                            <div class="product-image">
                                <a alt="" class="ri-close-fill" id="close-icon-${items._id}"
                                    data-wishid="${items._id}" onclick="addCloseIconEventListeners()">
                                </a>
                                <a href="/product/${items._id}">
                                    <img src="./Images/${items.image}" class="product-thumb" alt="">
                                </a>
                                <button class="btn" data-cartitem="${items._id}">
                                            Add to cart
                                    </button>
                            </div>
                            <div class="product-info">
                                <h2 class="product-brand">
                                    ${items.name}
                                </h2>
                                <p class="product-short-des">
                                        Out of stock 
                                </p>
                                <span class="price">
                                    ${items.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>`;
                }
            });
        });
});
