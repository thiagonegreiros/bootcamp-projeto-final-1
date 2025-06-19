const database = require('./database');
const Customer = require('./customer');

class CustomerRepository {
  constructor() {
    this.db = database.getDatabase();
  }

  // Create customer
  create(customer) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO customers (name, email) VALUES (?, ?)';
      this.db.run(sql, [customer.name, customer.email], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...customer });
        }
      });
    });
  }

  // Find all customers
  findAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM customers ORDER BY created_at DESC';
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const customers = rows.map(row => new Customer(row.id, row.name, row.email, row.created_at));
          resolve(customers);
        }
      });
    });
  }

  // Find customer by ID
  findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM customers WHERE id = ?';
      this.db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(new Customer(row.id, row.name, row.email, row.created_at));
        } else {
          resolve(null);
        }
      });
    });
  }

  // Find customers by name
  findByName(name) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM customers WHERE name LIKE ?';
      this.db.all(sql, [`%${name}%`], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const customers = rows.map(row => new Customer(row.id, row.name, row.email, row.created_at));
          resolve(customers);
        }
      });
    });
  }

  // Update customer
  update(id, customer) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE customers SET name = ?, email = ? WHERE id = ?';
      this.db.run(sql, [customer.name, customer.email, id], function(err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          resolve(null);
        } else {
          resolve({ id, ...customer });
        }
      });
    });
  }

  // Delete customer
  delete(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM customers WHERE id = ?';
      this.db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  // Count customers
  count() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT COUNT(*) as total FROM customers';
      this.db.get(sql, [], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.total);
        }
      });
    });
  }
}

module.exports = new CustomerRepository();