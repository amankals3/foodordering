let members = [];
let orderItems = [];

document.getElementById('addMemberBtn').addEventListener('click', addMember);

function addMember() {
    const membersContainer = document.getElementById('membersContainer');
    const memberInput = document.createElement('input');
    memberInput.type = 'text';
    memberInput.className = 'input-field';
    memberInput.placeholder = `Member ${members.length + 1}`;
    memberInput.addEventListener('input', (e) => {
        members[members.length] = e.target.value;
    });
    membersContainer.appendChild(memberInput);
}

function addOrderItem(item) {
    orderItems.push(item);
    updateCart();
    updateOrderSummary();
}

document.getElementById('submitOrderBtn').addEventListener('click', submitOrder);

function submitOrder() {
    const groupName = document.getElementById('groupName').value;
    const orderData = {
        groupName,
        members,
        orderItems
    };

    // Here you would typically send the orderData to your server
    console.log('Order Submitted:', orderData);
    alert('Order submitted successfully!');
}