
const express = require('express');
const bodyParser = require('body-parser');
const cors=require ("cors");
const jwt = require('jsonwebtoken');

const {
  createSchemaAndTables,
  signup,
  login,
  createCustomerData,
  getAllCustomerData,
  getCustomerDataById,
  updateCustomerDataById,
  deleteCustomerDataById
} = require('./db');
const config = require('./config');


const app = express();
app.use(cors());
app.use(express.json());
const port = 5500;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create schema and tables if they don't exist
createSchemaAndTables();

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
  
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
      }
  console.log(decoded);
      req.user = decoded;
      next();
    });
  };

// Route: /signup
app.post('/signup', signup);

// Route: /login
app.post('/login', login);

// Protected routes (require token authentication)
// app.use(authenticateToken);

//insert customer
app.post('/customer',createCustomerData);
// Route: Get all customer data
app.get('/customer', getAllCustomerData);

// Route: Get customer data by ID
app.get('/customer/:id', getCustomerDataById);

// Route: Update customer data by ID
app.put('/customer/:id', updateCustomerDataById);

// Route: Delete customer data by ID
app.delete('/customer/:id', deleteCustomerDataById);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
