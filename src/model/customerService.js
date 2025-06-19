const customerRepository = require('./customerRepository');
const Customer = require('./customer');

class CustomerService {
  async createCustomer(customerData) {
    // Validate data
    const errors = Customer.validate(customerData);
    if (errors.length > 0) {
      throw new Error(`Invalid data: ${errors.join(', ')}`);
    }

    try {
      return await customerRepository.create(customerData);
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Email is already in use');
      }
      throw error;
    }
  }

  async getAllCustomers() {
    return await customerRepository.findAll();
  }

  async getCustomerById(id) {
    if (!id || isNaN(id)) {
      throw new Error('ID must be a valid number');
    }
    return await customerRepository.findById(id);
  }

  async getCustomersByName(name) {
    if (!name || name.trim().length < 1) {
      throw new Error('Name must have at least 1 character');
    }
    return await customerRepository.findByName(name.trim());
  }

  async updateCustomer(id, customerData) {
    if (!id || isNaN(id)) {
      throw new Error('ID must be a valid number');
    }

    // Validate data
    const errors = Customer.validate(customerData);
    if (errors.length > 0) {
      throw new Error(`Invalid data: ${errors.join(', ')}`);
    }

    try {
      return await customerRepository.update(id, customerData);
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Email is already in use');
      }
      throw error;
    }
  }

  async deleteCustomer(id) {
    if (!id || isNaN(id)) {
      throw new Error('ID must be a valid number');
    }
    return await customerRepository.delete(id);
  }

  async countCustomers() {
    return await customerRepository.count();
  }
}

module.exports = new CustomerService();