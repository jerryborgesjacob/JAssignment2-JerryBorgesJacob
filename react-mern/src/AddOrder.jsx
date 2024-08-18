import React, { useState } from 'react';

function AddOrder() {
    const [products, setProducts] = useState('');
    const [user, setUser] = useState({
        name: '',
        email: '',
        address: '',
    });
    const [totalPrice, setTotalPrice] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const order = {
            products: products.split(',').map(product => ({ productId: product.trim(), quantity: 1 })), // Assuming 1 quantity for simplicity
            user,
            totalPrice,
            status
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            if (response.ok) {
                alert('Order added successfully!');
                setProducts('');
                setUser({ name: '', email: '', address: '' });
                setTotalPrice('');
                setStatus('');
            } else {
                alert('Failed to add order');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding order');
        }
    };

    const handleUserChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Product IDs (comma-separated):</label>
                <input
                    type="text"
                    value={products}
                    onChange={(e) => setProducts(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>User Name:</label>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleUserChange}
                    required
                />
            </div>
            <div>
                <label>User Email:</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleUserChange}
                    required
                />
            </div>
            <div>
                <label>User Address:</label>
                <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleUserChange}
                    required
                />
            </div>
            <div>
                <label>Total Price:</label>
                <input
                    type="number"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Status:</label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Order</button>
        </form>
    );
}

export default AddOrder;
