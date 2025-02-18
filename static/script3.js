// JavaScript to handle adding items to the cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-name');
        alert(`${itemName} has been added to your cart!`);
    });
});