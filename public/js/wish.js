var closeIcons = document.querySelectorAll('.ri-close-fill');
let wishlistWrap = document.querySelector('.wishlist-wrap');

// closeIcons.forEach((closeIcon) => {
//     closeIcon.addEventListener('click', async () => {
//         var wishprodID = closeIcon.dataset.wishid;
//         console.log(wishprodID); // Log the value of prodID to the console

//         const response = await fetch('/remove-from-wishlist', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ wishprodID }),
//         });
//     });
// });

closeIcons.forEach((closeIcon) => {
    closeIcon.addEventListener('click', async () => {
        var wishprodID = closeIcon.dataset.wishid;
        fetch('/remove-wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload: wishprodID }),
        })
            .then((res) => res.json())
            .then((data) => {
                wishlistWrap.innerHTML = ''; // Clear the contents of the wishlistWrap element
                let payload = data.payload;
                // Update the wishlist page with the new list of products
                payload.forEach((items) => {
                    if (items.countInStock > 0) {
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
                                <form action="/cart/${items._id}" method="post">
                                    <input type="submit" value="Add to cart" class="card-btn">
                                </form>
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
                                <form action="/cart/${items._id}" method="post">
                                    <input type="submit" value="Add to cart" class="card-btn">
                                </form>
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
});

async function addCloseIconEventListeners() {
    const closeIcons = wishlistWrap.querySelectorAll('.ri-close-fill');
    closeIcons.forEach((closeIcon) => {
        closeIcon.addEventListener('click', async () => {
            var wishprodID = closeIcon.dataset.wishid;
            fetch('/remove-wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ payload: wishprodID }),
            })
                .then((res) => res.json())
                .then((data) => {
                    wishlistWrap.innerHTML = ''; // Clear the contents of the wishlistWrap element
                    let payload = data.payload;
                    // Update the wishlist page with the new list of products
                    payload.forEach((items) => {
                        if (items.countInStock > 0) {
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
                                    <form action="/cart/${items._id}" method="post">
                                        <input type="submit" value="Add to cart" class="card-btn">
                                    </form>
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
                                    <form action="/cart/${items._id}" method="post">
                                        <input type="submit" value="Add to cart" class="card-btn">
                                    </form>
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
        })})
}
