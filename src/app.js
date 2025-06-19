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
app.post('/customers', customerController.create.bind(customerController));
app.get('/customers', customerController.getAll.bind(customerController));
app.get('/customers/count', customerController.count.bind(customerController));
app.get('/customers/name/:name', customerController.getByName.bind(customerController));
app.get('/customers/:id', customerController.getById.bind(customerController));
app.put('/customers/:id', customerController.update.bind(customerController));
app.delete('/customers/:id', customerController.delete.bind(customerController));

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