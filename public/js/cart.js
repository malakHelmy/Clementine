/*Drop down cart start*/

$('#cart-icon').on('click', function () {
    $('.cart-window').fadeToggle('slow');
});

function closesidebar() {
    $('.cart-window').fadeOut(700);
}

let cartwrap = document.querySelector('.cart-wrapper');

// $(document).ready(function () {
//     $("#removebtn").on('click', function (e) {
//         e.preventDefault();
//         console.log('y')
//     let c=0;
//         $.ajax({
//             url: '/cart/remove',
//             method: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify({ inputs: data }),
//             success: function (response) {
                 
//             },
//             error:function(err){
//             }
//         });
//     });
// });


$(document).on('click', '.ri-close-line', async function () {
    var c = $(this).data('cartpro');
    fetch('/cart/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {payload:c} ),
    })
        .then((res) => res.json())
        .then((data) => {
            cartwrap.innerHTML = '';
            cartwrap.innerHTML = ` <h2 class="ShopBag">My Shopping Bag</h2>
            <div class="line"></div>`;
                let payload = data.payload;
                var price = 0;
                if (payload != undefined && payload.items != '') {
                    payload.items.forEach((items) => {
                        if (items.quantity > 0) {
                            cartwrap.innerHTML += `<div class="cart-item">
                            <a id="remove" data-cartpro=${items.id} class="ri-close-line"> </a>
                        <img src="/Images/${items.image}" alt="">
                        <div class="details">
                            <div class="name">
                            ${items.name}
                            </div>
                            <div class="btn-wrapper">
                                <a class="cartminus"
                                    data-minusid="${items.id}">
                                    <span class="minus">
                                        -
                                    </span>
                                </a>
                                <span class="num">
                                  ${items.quantity}
                                </span>
                                <a class="cartplus"
                                    data-addid="${items.id}">
                                    <span class="add" >
                                        +
                                    </span>
                                </a>
                            </div>
                            <button class="wishlist-btn"
                                data-productid="${items.id}">Add to
                                Wishlist
                            </button>
                            <div class="price"> Price: ${
                                items.price * items.quantity
                            }
                            </div>
                        </div>
                    </div>`;
                            price += items.price * items.quantity;
                        }
                    });
                    $('.cart-window').fadeToggle('slow');
                } else {
                    cartwrap.innerHTML += ` <div class="cart-item">

            <div class="empty">Your cart is empty</div>
        </div>`;
            }

                cartwrap.innerHTML += `<div class="total">
            <div class="shipping">
                    <p><span>Subtotal</span> <span>EGP <span id="total-before">
                        ${price}</span></span></p>
                    <p><span>Shipping</span> <span>EGP<span>100</span></span>
                    </p>
            </div>
            <p><span>Total</span> <span>EGP <span id="total-after">
                                ${price + 100}
                </span></span>
            </p>
        </div>
        <div class="checkout-btn">
            <button class="checkout" onclick="location.href='/cart'">CHECKOUT</button>
        </div>`;
            });

        });
$(document).on('click', '.cartplus', async function () {
    var plusID = $(this).data('addid');
    fetch('/cart/plus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: plusID }),
    })
        .then((res) => res.json())
        .then((data) => {
            cartwrap.innerHTML = '';
            cartwrap.innerHTML = ` <h2 class="ShopBag">My Shopping Bag</h2>
            <div class="line"></div>`;
            let payload = data.payload;
            var price = 0;
            if (payload != undefined && payload.items != '') {
                payload.items.forEach((items) => {
                    if (items.quantity > 0) {
                        cartwrap.innerHTML += `<div class="cart-item">
                         <a id="remove" data-cartpro=${items.id} class="ri-close-line"> </a>
                        <img src="/Images/${items.image}" alt="">
                        <div class="details">
                            <div class="name">
                            ${items.name}
                            </div>
                            <div class="btn-wrapper">
                                <a class="cartminus"
                                    data-minusid="${items.id}">
                                    <span class="minus">
                                        -
                                    </span>
                                </a>
                                <span class="num">
                                  ${items.quantity}
                                </span>
                                <a class="cartplus"
                                    data-addid="${items.id}">
                                    <span class="add" >
                                        +
                                    </span>
                                </a>
                            </div>
                            <button class="wishlist-btn"
                                data-productid="${items.id}"
                                onclick="wishlist()">Add to
                                Wishlist
                            </button>
                            <div class="price"> Price: ${
                                items.price * items.quantity
                            }
                            </div>
                        </div>
                    </div>`;
                        price += items.price * items.quantity;
                    }
                });
            } else {
                cartwrap.innerHTML += ` <div class="cart-item">

                <div class="empty">Your cart is empty</div>
            </div>`;
            }

            cartwrap.innerHTML += `<div class="total">
            <div class="shipping">
                    <p><span>Subtotal</span> <span>EGP <span id="total-before">
                        ${price}</span></span></p>
                    <p><span>Shipping</span> <span>EGP<span>100</span></span>
                    </p>
            </div>
            <p><span>Total</span> <span>EGP <span id="total-after">
                                ${price + 100}
                </span></span>
            </p>
        </div>
        <div class="checkout-btn">
            <button class="checkout" onclick="location.href='/cart'">CHECKOUT</button>
        </div>`;
        });
});

$(document).on('click', '.cartminus', async function () {
    var minusID = $(this).data('minusid');
    fetch('/cart/minus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: minusID }),
    })
        .then((res) => res.json())
        .then((data) => {
            cartwrap.innerHTML = '';
            cartwrap.innerHTML = ` <h2 class="ShopBag">My Shopping Bag</h2>
                <div class="line"></div>`;
            let payload = data.payload;
            var price = 0;
            if (payload != undefined && payload.items != '') {
                payload.items.forEach((items) => {
                    if (items.quantity > 0) {
                        cartwrap.innerHTML += `<div class="cart-item">
                        <a class="remove-btn" id="remove" data-cartpro=${items.id}>
                        <i class="ri-close-line"></i>
                        </a>
                            <img src="/Images/${items.image}" alt="">
                            <div class="details">
                                <div class="name">
                                ${items.name}
                                </div>
                                <div class="btn-wrapper">
                                    <a class="cartminus"
                                        data-minusid="${items.id}">
                                        <span class="minus">
                                            -
                                        </span>
                                    </a>
                                    <span class="num">
                                      ${items.quantity}
                                    </span>
                                    <a class="cartplus"
                                        data-addid="${items.id}">
                                        <span class="add" >
                                            +
                                        </span>
                                    </a>
                                </div>
                                <button class="wishlist-btn"
                                    data-productid="${items.id}"
                                    onclick="wishlist()">Add to
                                    Wishlist
                                </button>
                                <div class="price"> Price: ${
                                    items.price * items.quantity
                                }
                                </div>
                            </div>
                        </div>`;
                        price += items.price * items.quantity;
                    }
                });
            } else {
                cartwrap.innerHTML += ` <div class="cart-item">

                    <div class="empty">Your cart is empty</div>
                </div>`;
            }

            cartwrap.innerHTML += `<div class="total">
                <div class="shipping">
                        <p><span>Subtotal</span> <span>EGP <span id="total-before">
                            ${price}</span></span></p>
                        <p><span>Shipping</span> <span>EGP<span>100</span></span>
                        </p>
                </div>
                <p><span>Total</span> <span>EGP <span id="total-after">
                                    ${price + 100}
                    </span></span>
                </p>
            </div>
            <div class="checkout-btn">
                <button class="checkout" onclick="location.href='/cart'">CHECKOUT</button>
            </div>`;
        });
});

const addtocart = document.querySelectorAll('.btn');
addtocart.forEach((cart) => {
    cart.addEventListener('click', async () => {
        var cartProd = cart.dataset.cartitem;
        fetch('/cart/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload: cartProd }),
        })
            .then((res) => res.json())
            .then((data) => {
                cartwrap.innerHTML = ` <h2 class="ShopBag">My Shopping Bag</h2>
            <div class="line"></div>`;
                let payload = data.payload;
                var price = 0;
                if (payload != undefined && payload.items != '') {
                    payload.items.forEach((items) => {
                        if (items.quantity > 0) {
                            cartwrap.innerHTML += `<div class="cart-item">
                                                        <a id="remove" data-cartpro=${items.id} class="ri-close-line"> </a>

                        <img src="/Images/${items.image}" alt="">
                        <div class="details">
                            <div class="name">
                            ${items.name}
                            </div>
                            <div class="btn-wrapper">
                                <a class="cartminus"
                                    data-minusid="${items.id}">
                                    <span class="minus">
                                        -
                                    </span>
                                </a>
                                <span class="num">
                                  ${items.quantity}
                                </span>
                                <a class="cartplus"
                                    data-addid="${items.id}">
                                    <span class="add" >
                                        +
                                    </span>
                                </a>
                            </div>
                            <button class="wishlist-btn"
                                data-productid="${items.id}">Add to
                                Wishlist
                            </button>
                            <div class="price"> Price: ${
                                items.price * items.quantity
                            }
                            </div>
                        </div>
                    </div>`;
                            price += items.price * items.quantity;
                        }
                    });
                    $('.cart-window').fadeToggle('slow');
                } else {
                    cartwrap.innerHTML += ` <div class="cart-item">

                <div class="empty">Your cart is empty</div>
            </div>`;
                }

                cartwrap.innerHTML += `<div class="total">
            <div class="shipping">
                    <p><span>Subtotal</span> <span>EGP <span id="total-before">
                        ${price}</span></span></p>
                    <p><span>Shipping</span> <span>EGP<span>100</span></span>
                    </p>
            </div>
            <p><span>Total</span> <span>EGP <span id="total-after">
                                ${price + 100}
                </span></span>
            </p>
        </div>
        <div class="checkout-btn">
            <button class="checkout" onclick="location.href='/cart'">CHECKOUT</button>
        </div>`;
            });
    });
});

const atc = document.querySelectorAll('.atc');
atc.forEach((cart) => {
    cart.addEventListener('click', async () => {
        var cartProd = cart.dataset.cartitem;
        fetch('/cart/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload: cartProd }),
        })
            .then((res) => res.json())
            .then((data) => {
                cartwrap.innerHTML = ` <h2 class="ShopBag">My Shopping Bag</h2>
            <div class="line"></div>`;
                let payload = data.payload;
                var price = 0;
                if (payload != undefined && payload.items != '') {
                    payload.items.forEach((items) => {
                        if (items.quantity > 0) {
                            cartwrap.innerHTML += `<div class="cart-item">
                                                        <a id="remove" data-cartpro=${items.id} class="ri-close-line"> </a>

                        <img src="/Images/${items.image}" alt="">
                        <div class="details">
                            <div class="name">
                            ${items.name}
                            </div>
                            <div class="btn-wrapper">
                                <a class="cartminus"
                                    data-minusid="${items.id}">
                                    <span class="minus">
                                        -
                                    </span>
                                </a>
                                <span class="num">
                                  ${items.quantity}
                                </span>
                                <a class="cartplus"
                                    data-addid="${items.id}">
                                    <span class="add" >
                                        +
                                    </span>
                                </a>
                            </div>
                            <button class="wishlist-btn"
                                data-productid="${items.id}">Add to
                                Wishlist
                            </button>
                            <div class="price"> Price: ${
                                items.price * items.quantity
                            }
                            </div>
                        </div>
                    </div>`;
                            price += items.price * items.quantity;
                        }
                    });
                    $('.cart-window').fadeToggle('slow');
                } else {
                    cartwrap.innerHTML += ` <div class="cart-item">

                <div class="empty">Your cart is empty</div>
            </div>`;
                }

                cartwrap.innerHTML += `<div class="total">
            <div class="shipping">
                    <p><span>Subtotal</span> <span>EGP <span id="total-before">
                        ${price}</span></span></p>
                    <p><span>Shipping</span> <span>EGP<span>100</span></span>
                    </p>
            </div>
            <p><span>Total</span> <span>EGP <span id="total-after">
                                ${price + 100}
                </span></span>
            </p>
        </div>
        <div class="checkout-btn">
            <button class="checkout" onclick="location.href='/cart'">CHECKOUT</button>
        </div>`;
            });
    });
});
const cartButton = document.querySelectorAll('.cartbtn');
cartButton.forEach((cart) => {
    cart.addEventListener('click', async () => {
        var cartProd = cart.dataset.cartitem;
        fetch('/cart/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload: cartProd }),
        })
            .then((res) => res.json())
            .then((data) => {
                cartwrap.innerHTML = ` <h2 class="ShopBag">My Shopping Bag</h2>
            <div class="line"></div>`;
                let payload = data.payload;
                var price = 0;
                if (payload != undefined && payload.items != '') {
                    payload.items.forEach((items) => {
                        if (items.quantity > 0) {
                            cartwrap.innerHTML += `<div class="cart-item">
                                                        <a id="remove" data-cartpro=${items.id} class="ri-close-line"> </a>

                        <img src="/Images/${items.image}" alt="">
                        <div class="details">
                            <div class="name">
                            ${items.name}
                            </div>
                            <div class="btn-wrapper">
                                <a class="cartminus"
                                    data-minusid="${items.id}">
                                    <span class="minus">
                                        -
                                    </span>
                                </a>
                                <span class="num">
                                  ${items.quantity}
                                </span>
                                <a class="cartplus"
                                    data-addid="${items.id}">
                                    <span class="add" >
                                        +
                                    </span>
                                </a>
                            </div>
                            <button class="wishlist-btn"
                                data-productid="${items.id}">Add to
                                Wishlist
                            </button>
                            <div class="price"> Price: ${
                                items.price * items.quantity
                            }
                            </div>
                        </div>
                    </div>`;
                            price += items.price * items.quantity;
                        }
                    });
                    $('.cart-window').fadeToggle('slow');
                } else {
                    cartwrap.innerHTML += ` <div class="cart-item">

                <div class="empty">Your cart is empty</div>
            </div>`;
                }

                cartwrap.innerHTML += `<div class="total">
            <div class="shipping">
                    <p><span>Subtotal</span> <span>EGP <span id="total-before">
                        ${price}</span></span></p>
                    <p><span>Shipping</span> <span>EGP<span>100</span></span>
                    </p>
            </div>
            <p><span>Total</span> <span>EGP <span id="total-after">
                                ${price + 100}
                </span></span>
            </p>
        </div>
        <div class="checkout-btn">
            <button class="checkout" onclick="location.href='/cart'">CHECKOUT</button>
        </div>`;
            });
    });
});

//checkout cart
