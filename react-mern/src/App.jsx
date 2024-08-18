import React, { useState, useEffect } from 'react';
import AddProduct from './AddProduct';
import Nav from './components/Nav';
import OrderList from './OrderList';
import AddOrder from './AddOrder';
import Header from './components/Header';

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
            console.log(products);
            
            
    }, [])
    ;

    return (
        <div>
            <Header />
        <div className="App">
            <Nav />
            <h1>Product List</h1>
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
        <h1>Add a New Product</h1>
        <AddProduct />
    </div>
    </div>
    <div className="App">
            <h1>Add a New Order</h1>
            <AddOrder />

            <h1>Orders</h1>
            <OrderList />
        </div>
        
        
        
        </div>    
    );


}

export default App;
