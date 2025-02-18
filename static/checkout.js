// Sample order data (this would typically come from your backend or previous page)
const orderItems = [
    { name: "Pizza", price: 10.00, quantity: 2 },
    { name: "Burger", price: 8.00, quantity: 1 },
    { name: "Sushi", price: 15.00, quantity: 1 },
];

// Function to display order items
function displayOrderItems() {
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = ''; // Clear previous items
    let total = 0;

    orderItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        orderItemsContainer.innerHTML += `<p>${item.name} - $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>`;
    });

    document.getElementById('order-total').innerText = total.toFixed(2);
}

// Function to handle payment confirmation
function handlePayment() {
    const paymentMethod = document.getElementById('payment-method').value;
    const totalAmount = document.getElementById('order-total').innerText;

    // Here you would typically send the payment information to your backend for processing
    alert(`Payment of $${totalAmount} confirmed using ${paymentMethod}. Thank you for your order!`);

    // Optionally, redirect to a confirmation page or clear the cart
    // window.location.href = 'confirmation.html'; // Uncomment to redirect
}

// Event listener for the confirm payment button
document.getElementById('confirm-payment').addEventListener('click', handlePayment);

// Display order items when the page loads
document.addEventListener('DOMContentLoaded', displayOrderItems);