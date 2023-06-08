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
