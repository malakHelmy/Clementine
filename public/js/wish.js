const closeIcons = document.querySelectorAll('.ri-close-fill');

closeIcons.forEach((closeIcon) => {
    closeIcon.addEventListener('click', async () => {
        var wishprodID = closeIcon.dataset.wishid;
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

// $('.ri-close-fill').on('click', function () {
//     const wishId = $(this).data('wishid');
//     $.ajax({
//         url: '/remove-from-wishlist',
//         type: 'POST',
//         body: JSON.stringify({ payload: wishId })
//             .then((res) => res.json())
//             .then((data) => {
//                 let products = data.payload;
//                 // Update the wishlist page with the new list of products
//                 $('.wishlist-wrap').empty();
//                 $('.wishlist-wrap').append(products);
//             }),
//     });
// });
