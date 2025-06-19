class Customer {
  constructor(id, name, email, created_at) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.created_at = created_at;
  }

  // Basic validations
  static validate(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must have at least 2 characters');
    }
    
    if (!data.email || !this.validateEmail(data.email)) {
      errors.push('Email must have a valid format');
    }
    
    return errors;
  }

  static validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}

module.exports = Customer;