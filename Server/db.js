// db.js

const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const config = require('./config');

const connection = mysql.createConnection({
  host: config.hostname,
  port: config.port,
  user: config.user,
  password: config.password // Replace 'your_database_name' with your actual database name
});

const createSchemaAndTables = () => {
  connection.query('CREATE SCHEMA IF NOT EXISTS Customer', (err) => {
    if (err) {
      console.error('Error creating schema: ', err);
      return;
    }
    console.log('Schema created: Customer');

    // Create User table
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS Customer.User (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        userRole VARCHAR(255) NOT NULL
      )
    `;
    connection.query(createUserTableQuery, (err) => {
      if (err) {
        console.error('Error creating User table: ', err);
        return;
      }
      console.log('Table created: User');
    });

    // Create CustomerData table
    const createCustomerDataTableQuery = `
      CREATE TABLE IF NOT EXISTS Customer.CustomerData (
        id INT AUTO_INCREMENT PRIMARY KEY,
        OrderDate DATE NOT NULL,
        Company VARCHAR(255) NOT NULL,
        Owner VARCHAR(255) NOT NULL,
        Item VARCHAR(255) NOT NULL,
        Quantity INT NOT NULL,
        Weight FLOAT NOT NULL,
        RequestForShipment VARCHAR(255) NOT NULL,
        TrackingId VARCHAR(255) NOT NULL,
        ShipmentSize VARCHAR(255) NOT NULL,
        BoxCount INT NOT NULL,
        Specification TEXT NOT NULL,
        ChecklistQuantity INT NOT NULL,
        userID VARCHAR(255) NOT NULL
      )
    `;
    connection.query(createCustomerDataTableQuery, (err) => {
      if (err) {
        console.error('Error creating CustomerData table: ', err);
        return;
      }
      console.log('Table created: CustomerData');
    });
  });
};

const insertUser = (username, email, password, userRole) => {
  const insertUserQuery = `
    INSERT INTO Customer.User (username, email, password, userRole)
    VALUES (?, ?, ?, ?)
  `;
  connection.query(insertUserQuery, [username, email, password, userRole], (err, results) => {
    if (err) {
      console.error('Error inserting user: ', err);
      return;
    }
    console.log('User inserted successfully!');
    console.log('Inserted User ID:', results.insertId);
  });
};

const insertCustomerData = (
  orderDate,
  company,
  owner,
  item,
  quantity,
  weight,
  requestForShipment,
  trackingId,
  shipmentSize,
  boxCount,
  specification,
  checklistQuantity,
  userID
) => {
  const insertCustomerDataQuery = `
    INSERT INTO Customer.CustomerData (
      OrderDate,
      Company,
      Owner,
      Item,
      Quantity,
      Weight,
      RequestForShipment,
      TrackingId,
      ShipmentSize,
      BoxCount,
      Specification,
      ChecklistQuantity,
      userID
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  connection.query(
    insertCustomerDataQuery,
    [
      orderDate,
      company,
      owner,
      item,
      quantity,
      weight,
      requestForShipment,
      trackingId,
      shipmentSize,
      boxCount,
      specification,
      checklistQuantity,
      userID
    ],
    (err, results) => {
      if (err) {
        console.error('Error inserting customer data: ', err);
        return;
      }
      console.log('Customer data inserted successfully!');
      console.log('Inserted CustomerData ID:', results.insertId);
    }
  );
};

const signup = (req, res) => {
  console.log(req.body)
  const { username, email, password, userRole } = req.body;

  // Insert user into the User table
  insertUser(username, email, password, userRole);

  // Generate token
  const token = jwt.sign({ username }, config.secretKey);

  // Send response with token and user data
  res.json({
    success: true,
    message: 'Signup successful!',
    token,
    user: {
      username,
      email,
      userRole
    }
  });
};

const login = (req, res) => {
  // console.log(req.body)
  const { email, password } = req.body;
  // Perform login logic (e.g., validate credentials)
  const getUserQuery = `
    SELECT * FROM Customer.User WHERE email = ? AND password = ?
  `;
  connection.query(getUserQuery, [email, password], (err, results) => {
    if (err) {
      console.error('Error retrieving user: ', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
      return;
    }

    // Generate token
    const token = jwt.sign({ email }, config.secretKey);

    // Send response with token and user data
    res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        username: results[0].username,
        email: results[0].email,
        userRole: results[0].userRole
      }
    });
  });
};


const createCustomerData = (req, res) => {
  console.log(req.body)
  const {
    OrderDate,
    Company,
    Owner,
    Item,
    Quantity,
    Weight,
    RequestForShipment,
    TrackingId,
    ShipmentSize,
    BoxCount,
    Specification,
    ChecklistQuantity,
    userID
  } = req.body;

  connection.query(
    `
    INSERT INTO Customer.CustomerData (
      OrderDate,
      Company,
      Owner,
      Item,
      Quantity,
      Weight,
      RequestForShipment,
      TrackingId,
      ShipmentSize,
      BoxCount,
      Specification,
      ChecklistQuantity,
      userID
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      OrderDate,
      Company,
      Owner,
      Item,
      Quantity,
      Weight,
      RequestForShipment,
      TrackingId,
      ShipmentSize,
      BoxCount,
      Specification,
      ChecklistQuantity,
      userID
    ],
    (err, results) => {
      if (err) {
        console.error('Error inserting customer data: ', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      res.json({
        success: true,
        message: 'Customer data inserted successfully',
        insertedCustomerId: results.insertId
      });
    }
  );
};

const getAllCustomerData = (req, res) => {
  connection.query('SELECT * FROM Customer.CustomerData', (err, results) => {
    if (err) {
      console.error('Error retrieving customer data: ', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    res.json({ success: true, data: results });
  });
};

const getCustomerDataById = (req, res) => {
  const customerId = req.params.id;

  connection.query(
    'SELECT * FROM Customer.CustomerData WHERE userID = ?',
    [customerId],
    (err, results) => {
      if (err) {
        console.error('Error retrieving customer data: ', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ success: false, message: 'Customer data not found' });
        return;
      }

      res.json({ success: true, data: results[0] });
    }
  );
};

const updateCustomerDataById = (req, res) => {
  const customerId = req.params.id;
  const {
    OrderDate,
    Company,
    Owner,
    Item,
    Quantity,
    Weight,
    RequestForShipment,
    TrackingId,
    ShipmentSize,
    BoxCount,
    Specification,
    ChecklistQuantity,
    userID
  } = req.body;

  connection.query(
    `
    UPDATE Customer.CustomerData
    SET
      OrderDate = ?,
      Company = ?,
      Owner = ?,
      Item = ?,
      Quantity = ?,
      Weight = ?,
      RequestForShipment = ?,
      TrackingId = ?,
      ShipmentSize = ?,
      BoxCount = ?,
      Specification = ?,
      ChecklistQuantity = ?,
      userID = ?
    WHERE userID = ?
  `,
    [
      OrderDate,
      Company,
      Owner,
      Item,
      Quantity,
      Weight,
      RequestForShipment,
      TrackingId,
      ShipmentSize,
      BoxCount,
      Specification,
      ChecklistQuantity,
      userID,
      customerId
      
    ],
    (err, results) => {
      if (err) {
        console.error('Error updating customer data: ', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ success: false, message: 'Customer data not found' });
        return;
      }

      res.json({ success: true, message: 'Customer data updated successfully' });
    }
  );
};

const deleteCustomerDataById = (req, res) => {
  const customerId = req.params.id;

  const deleteCustomerDataQuery = `
    DELETE FROM Customer.CustomerData
    WHERE id = ?
  `;
  connection.query(deleteCustomerDataQuery, [customerId], (err, results) => {
    if (err) {
      console.error('Error deleting customer data: ', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Customer data not found' });
      return;
    }

    res.json({ success: true, message: 'Customer data deleted successfully' });
  });
};

module.exports = {
  connection,
  createSchemaAndTables,
  insertUser,
  insertCustomerData,
  signup,
  login,
  createCustomerData,
  getAllCustomerData,
  getCustomerDataById,
  updateCustomerDataById,
  deleteCustomerDataById
};
