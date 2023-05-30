
const wishlistIcons = document.querySelectorAll('.ri-heart-line');

var select = document.getElementById('sort');
var value = select.options[select.selectedIndex].value;
console.log(value);
console.log("ah");


wishlistIcons.forEach(icon => {
  icon.addEventListener('click', async () => {
    var prodID = icon.dataset.productid;

    const response = await fetch('/add-to-wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prodID })
    });
  });
});