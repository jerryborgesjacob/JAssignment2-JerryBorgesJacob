const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
const mongoURI = 'mongodb+srv://Jerry:test@http5222jerry.sovrwdw.mongodb.net/StoreDB?retryWrites=true&w=majority&appName=HTTP5222Jerry';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


  //  enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });


// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String,
  });
  
  const Product = mongoose.model('Product', productSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
    products: Array,
    user: Object,
    totalPrice: Number,
    status: String,
});

const Order = mongoose.model('Order', orderSchema);

app.get('/', (req, res) => {
  res.send('Welcome to the e-commerce API!');
});


// API Endpoints
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
  });
  
  app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  });
  
  app.get('/api/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
  });
  
  app.put('/api/products/:id', async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  });
  
  app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
  });
  
  app.get('/api/orders', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
  });
  
  // Endpoint to create a new order
  app.post('/api/orders', async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error });
    }
  });
  
  // Endpoint to add a new product
  app.post('/api/products', async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error adding product', error });
    }
  });
  
  // Start server
  try {
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }