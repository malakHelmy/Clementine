
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.close-popup');
const learnMoreLinks = document.querySelectorAll('.learn-more');

learnMoreLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const imageUrl = link.getAttribute('data-image');
        popup.querySelector('img').src = imageUrl;
        popup.style.display = 'block';
    });
});

closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});