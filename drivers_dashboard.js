// Simulated 
const orders = [
    { id: 1, customerName: 'John Doe', items: ['Pizza', 'Salad'], distance: '10 Miles', wage: 15 },
    { id: 2, customerName: 'Jane Smith', items: ['Burger', 'Fries'], distance: '10 Miles', wage: 12 },
    { id: 3, customerName: 'Alice Johnson', items: ['Steak', 'Mashed Potatoes'], distance: '10 Miles', wage: 14 },
    { id: 4, customerName: 'Bob Brown', items: ['Sushi', 'Edamame'], distance: '10 Miles', wage: 13 },
    { id: 5, customerName: 'Emma Davis', items: ['Tacos', 'Guacamole'], distance: '10 Miles', wage: 11 },
    { id: 6, customerName: 'Michael Wilson', items: ['Pasta', 'Garlic Bread'], distance: '10 Miles', wage: 16 },
    { id: 7, customerName: 'Olivia Martinez', items: ['Sandwich', 'Chips'], distance: '10 Miles', wage: 10 },
    { id: 8, customerName: 'William Garcia', items: ['Chicken Wings', 'Celery Sticks'], distance: '10 Miles', wage: 14 },
    { id: 9, customerName: 'Sophia Rodriguez', items: ['Sushi', 'Miso Soup'], distance: '10 Miles', wage: 13 },
    { id: 10, customerName: 'James Lee', items: ['Ramen', 'Gyoza'], distance: '10 Miles', wage: 15 }
];


function displayOrders() {
    const ordersContainer = document.querySelector('.orders-container');
    ordersContainer.innerHTML = '';

    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order');
        orderDiv.dataset.orderId = order.id;
        orderDiv.innerHTML = `
            <h2>Order #${order.id}</h2>
            <p>Customer Name: ${order.customerName}</p>
            <p>Trip Distance: ${order.distance}</p>

            <p>Order Items: ${order.items.join(', ')}</p>
            <p>Wage:${"$"+order.wage}</p>
            <button class="accept-btn">Accept</button>
            <button class="deny-btn">Deny</button>
        `;
        ordersContainer.appendChild(orderDiv);
    });
}

// Initial display of orders
displayOrders();

// Function to handle accepting an order
function acceptOrder(orderId) {
    // Redirect the driver to another page upon accepting an order
    window.location.href = 'DrivesAccepted.html'; 
}

// Function to handle denying an order
function denyOrder(orderId) {
    // Remove the order from the array
    const index = orders.findIndex(order => order.id == orderId);
    if (index !== -1) {
        orders.splice(index, 1);
    }
    // Remove the order from the The list 

    const orderElement = document.querySelector(`.order[data-order-id="${orderId}"]`);
    if (orderElement) {
        orderElement.remove();
    }
}

//  accept and deny buttons
document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('accept-btn')) {
        const orderId = target.parentNode.dataset.orderId;
        acceptOrder(orderId);
    } else if (target.classList.contains('deny-btn')) {
        const orderId = target.parentNode.dataset.orderId;
        denyOrder(orderId);
    }
});

