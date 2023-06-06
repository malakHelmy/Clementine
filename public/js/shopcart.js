let shopwrap = document.querySelector('.shopcart-wrapper');

$(document).on('click', '.remove-btn', async function () {
    var remID = $(this).data('rem');
    
   

    fetch('/cart/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id:remID }),
    })
    .then((res) => res.json())
    .then((data) => {

        shopwrap.innerHTML = '';
        let productCount = 0;
        let price = 0;
        let payload = data.payload;
        if (payload != undefined && payload.items != '') {
            productCount = payload.items.length;
            shopwrap.innerHTML += `<h1 class="cart-header">your shopping bag (${productCount} items)</h1>
            <div class="prod">
                <div class="cart-items">`;
            payload.items.forEach((items) => {
                if (items.quantity > 0) {
                    price += items.price * items.quantity;
                    shopwrap.innerHTML += `
                        <div class="cart-box">
                            <img src="/Images/${
                                items.image
                            }" alt="earring 8">
                            <div class="prod-content">
                                <h3>
                                    ${
                                        items.name
                                    }<button class="remove-btn"><i
                                                class="ri-close-line"></i></button>
                                </h3>
                                <h4 class="price">
                                   EGP ${items.price * items.quantity}
                                </h4>


                                <div class="btn-wrapper">
                                    <a class="checkoutminus" data-minid="${
                                        items.id
                                    }">
                                        <span class="minus">
                                            -
                                        </span>
                                    </a>
                                    <span class="num">
                                        ${items.quantity}
                                    </span>
                                    <a class="checkoutplus" data-plusid="${
                                        items.id
                                    }">
                                        <span class="add">
                                            +
                                        </span>
                                    </a>
                                </div>
                                <button class="wishlist-btn" data-productid="${
                                    items.id
                                }">Add to
                                    Wishlist
                                </button>
                            </div>
                        </div>`;
                }
            });
            shopwrap.innerHTML += `</div> <div class="right-bar">
            <p><span>Subtotal</span><span class="subtotal"> EGP ${price} </span></p>
            <p><span>Shipping</span> <span>EGP100</span></p>
            <hr>
            <p><span>Total</span> <span class="totalafter">EGP ${
                price + 100
            } </span></p>
            <button onclick="location.href='/checkout'"
                class="checkout-btn">CHECKOUT</button>

            <div class="payment-method">
                <p></p>
                <hr>
                Checkout quickly and securely with
                <br>
                <img src="/Images/cash.svg" alt="">
                <img src="/Images/visa.svg" alt="">
                <img src="/Images/mastercard.svg" alt="">
                 </div>
             </div>
        </div>`;
        } else {
            shopwrap += `<div class="prod"> <h1 class="cart-header">your shopping bag is empty</h1> <div class="cart-items"> </div> 
            <div class="right-bar">
                            <p><span>Subtotal</span><span class="subtotal"> EGP ${price} </span></p>
                            <p><span>Shipping</span> <span>EGP100</span></p>
                            <hr>
                            <p><span>Total</span> <span class="totalafter">EGP ${
                                price + 100
                            } </span></p>
                            <button onclick="location.href='/checkout'"
                                class="checkout-btn">CHECKOUT</button>

                            <div class="payment-method">
                                <p></p>
                                <hr>
                                Checkout quickly and securely with
                                <br>
                                <img src="/Images/cash.svg" alt="">
                                <img src="/Images/visa.svg" alt="">
                                <img src="/Images/mastercard.svg" alt="">
                            </div>
                        </div>
            </div>`;
        }



    });
});






$(document).on('click', '.checkoutplus', async function () {
    var plusID = $(this).data('plusid');
    fetch('/cart/plus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: plusID }),
    })
    .then((res) => res.json())
    .then((data) => {
        shopwrap.innerHTML = '';
        let productCount = 0;
        let price = 0;
        let payload = data.payload;
        if (payload != undefined && payload.items != '') {
            productCount = payload.items.length;
            shopwrap.innerHTML += `<h1 class="cart-header">your shopping bag (${productCount} items)</h1>
            <div class="prod">
                <div class="cart-items">`;
            payload.items.forEach((items) => {
                if (items.quantity > 0) {
                    price += items.price * items.quantity;
                    shopwrap.innerHTML += `
                        <div class="cart-box">
                            <img src="/Images/${
                                items.image
                            }" alt="earring 8">
                            <div class="prod-content">
                                <h3>
                                    ${
                                        items.name
                                    }<button class="remove-btn"><i
                                                class="ri-close-line"></i></button>
                                </h3>
                                <h4 class="price">
                                   EGP ${items.price * items.quantity}
                                </h4>


                                <div class="btn-wrapper">
                                    <a class="checkoutminus" data-minid="${
                                        items.id
                                    }">
                                        <span class="minus">
                                            -
                                        </span>
                                    </a>
                                    <span class="num">
                                        ${items.quantity}
                                    </span>
                                    <a class="checkoutplus" data-plusid="${
                                        items.id
                                    }">
                                        <span class="add">
                                            +
                                        </span>
                                    </a>
                                </div>
                                <button class="wishlist-btn" data-productid="${
                                    items.id
                                }">Add to
                                    Wishlist
                                </button>
                            </div>
                        </div>`;
                }
            });
            shopwrap.innerHTML += `</div> <div class="right-bar">
            <p><span>Subtotal</span><span class="subtotal"> EGP ${price} </span></p>
            <p><span>Shipping</span> <span>EGP100</span></p>
            <hr>
            <p><span>Total</span> <span class="totalafter">EGP ${
                price + 100
            } </span></p>
            <button onclick="location.href='/checkout'"
                class="checkout-btn">CHECKOUT</button>

            <div class="payment-method">
                <p></p>
                <hr>
                Checkout quickly and securely with
                <br>
                <img src="/Images/cash.svg" alt="">
                <img src="/Images/visa.svg" alt="">
                <img src="/Images/mastercard.svg" alt="">
                 </div>
             </div>
        </div>`;
        } else {
            shopwrap += `<div class="prod"> <h1 class="cart-header">your shopping bag is empty</h1> <div class="cart-items"> </div> 
            <div class="right-bar">
                            <p><span>Subtotal</span><span class="subtotal"> EGP ${price} </span></p>
                            <p><span>Shipping</span> <span>EGP100</span></p>
                            <hr>
                            <p><span>Total</span> <span class="totalafter">EGP ${
                                price + 100
                            } </span></p>
                            <button onclick="location.href='/checkout'"
                                class="checkout-btn">CHECKOUT</button>

                            <div class="payment-method">
                                <p></p>
                                <hr>
                                Checkout quickly and securely with
                                <br>
                                <img src="/Images/cash.svg" alt="">
                                <img src="/Images/visa.svg" alt="">
                                <img src="/Images/mastercard.svg" alt="">
                            </div>
                        </div>
            </div>`;
        }
    });
});

$(document).on('click', '.checkoutminus', async function () {
    var minusID = $(this).data('minid');
    fetch('/cart/minus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: minusID }),
    })
    .then((res) => res.json())
    .then((data) => {
        shopwrap.innerHTML = '';
        let productCount = 0;
        let price = 0;
        let payload = data.payload;
        if (payload != undefined && payload.items != '') {
            productCount = payload.items.length;
            shopwrap.innerHTML += `<h1 class="cart-header">your shopping bag (${productCount} items)</h1>
            <div class="prod">
                <div class="cart-items">`;
            payload.items.forEach((items) => {
                if (items.quantity > 0) {
                    price += items.price * items.quantity;
                    shopwrap.innerHTML += `
                        <div class="cart-box">
                            <img src="/Images/${
                                items.image
                            }">
                            <div class="prod-content">
                                <h3>
                                    ${
                                        items.name
                                    }<button class="remove-btn"><i
                                                class="ri-close-line"></i></button>
                                </h3>
                                <h4 class="price">
                                   EGP ${items.price * items.quantity}
                                </h4>


                                <div class="btn-wrapper">
                                    <a class="checkoutminus" data-minid="${
                                        items.id
                                    }">
                                        <span class="minus">
                                            -
                                        </span>
                                    </a>
                                    <span class="num">
                                        ${items.quantity}
                                    </span>
                                    <a class="checkoutplus" data-plusid="${
                                        items.id
                                    }">
                                        <span class="add">
                                            +
                                        </span>
                                    </a>
                                </div>
                                <button class="wishlist-btn" data-productid="${
                                    items.id
                                }">Add to
                                    Wishlist
                                </button>
                            </div>
                        </div>`;
                }
            });
            shopwrap.innerHTML += `</div> <div class="right-bar">
            <p><span>Subtotal</span><span class="subtotal"> EGP ${price} </span></p>
            <p><span>Shipping</span> <span>EGP100</span></p>
            <hr>
            <p><span>Total</span> <span class="totalafter">EGP ${price + 100} </span></p>
            <button onclick="location.href='/checkout'" class="checkout-btn">CHECKOUT</button>
            <div class="payment-method">
                <p></p>
                <hr>
                Checkout quickly and securely with
                <br>
                <img src="/Images/cash.svg" alt="">
                <img src="/Images/visa.svg" alt="">
                <img src="/Images/mastercard.svg" alt="">
                 </div>
             </div>
        </div>`;
        } else {
            shopwrap += `<div class="prod"> <h1 class="cart-header">your shopping bag is empty</h1> <div class="cart-items"> </div> 
            <div class="right-bar">
                            <p><span>Subtotal</span><span class="subtotal"> EGP ${price} </span></p>
                            <p><span>Shipping</span> <span>EGP100</span></p>
                            <hr>
                            <p><span>Total</span> <span class="totalafter">EGP ${price + 100} </span></p>
                            <button onclick="location.href='/checkout'"
                                class="checkout-btn">CHECKOUT</button>

                            <div class="payment-method">
                                <p></p>
                                <hr>
                                Checkout quickly and securely with
                                <br>
                                <img src="/Images/cash.svg" alt="">
                                <img src="/Images/visa.svg" alt="">
                                <img src="/Images/mastercard.svg" alt="">
                            </div>
                        </div>
            </div>`;
        }
    });
});