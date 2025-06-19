# Customer API – MVC Example
### Author: Thiago Negreiros

This project is the final exam for the Software Architecture module at XP.
It is a simple RESTful API that demonstrates the Model-View-Controller (MVC) architecture using Node.js and SQLite, without any web frameworks. The API manages customer data and is intended for educational purposes to illustrate the MVC pattern in backend development.

## File Structure

```
src/
├── model/
│   ├── customer.js
│   ├── customerRepository.js
│   ├── customerService.js
│   └── database.js
├── view/
│   └── README.md
├── controller/
│   └── customerController.js
└── app.js
```

### Create Customer
```bash
curl -X POST http://localhost:3000/customers \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@email.com"}'
```


### List all Customers
```bash
curl http://localhost:3000/customers
```


### Get Customer by ID
```bash
curl http://localhost:3000/customers/1
```

### Get Customer by name
```bash
curl http://localhost:3000/customers/name/John
```

### Update Customer
```bash
curl -X PUT http://localhost:3000/customers/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name", "email": "updated@email.com"}'
```

### Delete Customer
```bash
curl -X DELETE http://localhost:3000/customers/1
```

