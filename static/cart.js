let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseFloat(button.getAttribute('data-price'));
            const itemImage = button.getAttribute('data-image');

            addToCart(itemName, itemPrice, itemImage);
            displayCart();
        });
    });

    // Call displayCart on page load to show items in the cart
    displayCart();
});

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
    } else {
        cart.push({ name, price, image, quantity: 1 }); // Add new item to cart
    }
}

function displayCart() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item'; // Changed to avoid duplicate class name
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: <span class="item-quantity">${item.quantity}</span></p>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    updateTotalPrice();

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            removeFromCart(itemName);
            displayCart();
        });
    });
}

function updateTotalPrice() {
    const totalContainer = document.getElementById('total');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalContainer.innerText = total.toFixed(2); // Update total price display
}

function removeFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        cart[itemIndex].quantity -= 1; // Decrement quantity
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1); // Remove item if quantity is zero
        }
    }
}

// Ensure other parts of your code do not conflict with the main cart functionality

    // Group items by restaurant
    const groupedItems = cartItems.reduce((acc, item) => {
        if (!acc[item.restaurant]) {
            acc[item.restaurant] = [];
        }
        acc[item.restaurant].push(item);
        return acc;
    }, {});

    // Display items grouped by restaurant
    for (const restaurant in groupedItems) {
        const items = groupedItems[restaurant];
        const restaurantTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        total += restaurantTotal;

        const restaurantDiv = document.createElement('div');
        restaurantDiv.innerHTML = `<h3>${restaurant}</h3>`;
        items.forEach(item => {
            restaurantDiv.innerHTML += `<p>${item.name} - $${item.price} x ${item.quantity}</p>`;
        });
        restaurantDiv.innerHTML += `<strong>Subtotal: $${restaurantTotal.toFixed(2)}</strong>`;
        restaurantDiv.innerHTML += `<button class="group-order-btn" data-restaurant="${restaurant}" data-total="${restaurantTotal}">Order from ${restaurant}</button>`;
        cartItemsContainer.appendChild(restaurantDiv);
    }

    document.getElementById('cart-total').innerText = total.toFixed(2);


// Function to open the group order modal
function openGroupOrderModal(restaurant, total) {
    const modal = document.getElementById('group-order-modal');
    const groupOrderItemsContainer = document.getElementById('group-order-items');
    groupOrderItemsContainer.innerHTML = ''; // Clear previous items

    // Display items for the selected restaurant
    const itemsForRestaurant = cartItems.filter(item => item.restaurant === restaurant);
    itemsForRestaurant.forEach(item => {
        groupOrderItemsContainer.innerHTML += `<p>${item.name} - $${item.price} x ${item.quantity}</p>`;
    });
    groupOrderItemsContainer.innerHTML += `<strong>Total for ${restaurant}: $${total.toFixed(2)}</strong>`;

    modal.style.display = "block"; // Show the modal
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('group-order-modal');
    modal.style.display = "none"; // Hide the modal
}

// Function to handle the checkout process
function handleCheckout() {
    alert("Group order confirmed! Proceeding to payment.");
    // Here you would typically handle the payment process for the selected restaurants
    // For example, you might send the cartItems to your backend for processing
}

// Event listeners for buttons
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();

    // Handle group order button clicks
    document.getElementById('cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('group-order-btn')) {
            const restaurant = event.target.getAttribute('data-restaurant');
            const total = parseFloat(event.target.getAttribute('data-total'));
            openGroupOrderModal(restaurant, total);
        }
    });

    // Close modal when the close button is clicked
    document.querySelector('.close').addEventListener('click', closeModal);

    // Close modal when clicking outside of the modal
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('group-order-modal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Handle confirm group order button click
    document.getElementById('confirm-group-order').addEventListener('click', () => {
        handleCheckout();
        closeModal();
    });
});

// Call displayCart on page load to show items in the cart
window.onload = displayCart();