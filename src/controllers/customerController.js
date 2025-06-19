const customerService = require('../model/customerService');

class CustomerController {
  // POST /customers
  async create(req, res) {
    try {
      const customer = await customerService.createCustomer(req.body);
      res.status(201).json({
        success: true,
        data: customer,
        message: 'Customer created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // GET /customers
  async getAll(req, res) {
    try {
      const customers = await customerService.getAllCustomers();
      res.json({
        success: true,
        data: customers,
        total: customers.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // GET /customers/:id
  async getById(req, res) {
    try {
      const customer = await customerService.getCustomerById(req.params.id);
      if (customer) {
        res.json({
          success: true,
          data: customer
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Customer not found'
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // GET /customers/name/:name
  async getByName(req, res) {
    try {
      const customers = await customerService.getCustomersByName(req.params.name);
      res.json({
        success: true,
        data: customers,
        total: customers.length
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // PUT /customers/:id
  async update(req, res) {
    try {
      const customer = await customerService.updateCustomer(req.params.id, req.body);
      if (customer) {
        res.json({
          success: true,
          data: customer,
          message: 'Customer updated successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Customer not found'
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // DELETE /customers/:id
  async delete(req, res) {
    try {
      const deleted = await customerService.deleteCustomer(req.params.id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({
          success: false,
          message: 'Customer not found'
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // GET /customers/count
  async count(req, res) {
    try {
      const total = await customerService.countCustomers();
      res.json({
        success: true,
        total: total
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new CustomerController();