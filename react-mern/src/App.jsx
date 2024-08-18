import React, { useState, useEffect } from 'react';
import AddProduct from './AddProduct';
import OrderList from './OrderList';
import AddOrder from './AddOrder';
import Header from './components/Header';
import './App.css';

function App() {
    const [products, setProducts] = useState([]);
    const [Orders, setOrders] = useState([]);

    useEffect(() => {
        
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
            console.log(products);
            
            
    }, [])

    useEffect(() => {
        
        fetch('http://localhost:5000/api/orders')
            .then(response => response.json())
            .then(data => setOrders(data));
            console.log(Orders);
            
            
    }, [])
    ;

    return (
        <>
        <Header />
        <div>
            
        <div className="App">
            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </li>
                ))}
            </ul>
            <div className="App">
        <h2>Add a New Product</h2>
        <AddProduct />
    </div>
    </div>
    <div className="App">
            <h2>Add a New Order</h2>
            <AddOrder />

            <h2>Orders</h2>
            <OrderList />
        </div>
    </div>    
    </>
    );

    
}

export default App;
