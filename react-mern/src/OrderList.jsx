import React, { useEffect, useState } from 'react';

function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('/api/orders')
            .then(response => response.json())
            .then(data => setOrders(data));
    }, []);

    return (
        <div>
            <h2>Order List</h2>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        <h3>Order ID: {order._id}</h3>
                        <p>User: {order.user.name} ({order.user.email})</p>
                        <p>Address: {order.user.address}</p>
                        <p>Total Price: ${order.totalPrice}</p>
                        <p>Status: {order.status}</p>
                        <ul>
                            {order.products.map((product, index) => (
                                <li key={index}>Product ID: {product.productId}, Quantity: {product.quantity}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderList;
