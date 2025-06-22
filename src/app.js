const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customerController = require('./controllers/customerController');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
// Path base: /v1/customer
app.post('/v1/customer', customerController.create.bind(customerController));
app.get('/v1/customer', customerController.getAll.bind(customerController));
app.get('/v1/customer/count', customerController.count.bind(customerController));
app.get('/v1/customer/name/:name', customerController.getByName.bind(customerController));
app.get('/v1/customer/:id', customerController.getById.bind(customerController));
app.put('/v1/customer/:id', customerController.update.bind(customerController));
app.delete('/v1/customer/:id', customerController.delete.bind(customerController));

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Customer MVC API is running!',
    endpoints: {
      'POST /customers': 'Create customer',
      'GET /customers': 'Get all customers',
      'GET /customers/:id': 'Get customer by ID',
      'GET /customers/name/:name': 'Get customers by name',
      'PUT /customers/:id': 'Update customer',
      'DELETE /customers/:id': 'Delete customer',
      'GET /customers/count': 'Count total customers'
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  const database = require('./model/database');
  database.close();
  process.exit(0);
});

module.exports = app;