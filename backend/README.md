# Fabulous Gadgets Backend API

A comprehensive backend API for the Fabulous Gadgets e-commerce application built with Express.js and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Product Management**: CRUD operations for products with search and filtering
- **Order Management**: Complete order processing system
- **Admin Panel**: Admin-specific routes for managing products and orders
- **Database Integration**: MongoDB with Mongoose ODM
- **Security**: Password hashing, JWT tokens, and role-based access control

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fabulous-gadgets-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/fabulous-gadgets
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with filtering and pagination)
- `GET /api/products/:id` - Get product by ID

### Admin Products
- `POST /api/admin/products` - Create new product (Admin only)
- `PUT /api/admin/products/:id` - Update product (Admin only)
- `DELETE /api/admin/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders

### Admin Orders
- `GET /api/admin/orders` - Get all orders (Admin only)
- `PUT /api/admin/orders/:id` - Update order status (Admin only)

### Admin Stats
- `GET /api/admin/stats` - Get dashboard statistics (Admin only)

### Health Check
- `GET /api/health` - API health check

## API Usage Examples

### Register User
```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123'
  })
});
```

### Login User
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'john_doe',
    password: 'password123'
  })
});
```

### Get Products with Filters
```javascript
const response = await fetch('http://localhost:5000/api/products?category=phone&search=iphone&page=1&limit=12');
```

### Create Order (with authentication)
```javascript
const response = await fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-jwt-token'
  },
  body: JSON.stringify({
    items: [
      {
        productId: 'product-id',
        quantity: 2,
        price: '50000'
      }
    ],
    total: '100000',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Lagos',
      state: 'Lagos',
      zipCode: '100001',
      phone: '+2341234567890'
    }
  })
});
```

## Database Schema

### User Schema
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date
}
```

### Product Schema
```javascript
{
  name: String (required),
  detailedName: String (required),
  price: String (required),
  image: String (required),
  category: String (enum: ['phone', 'laptop', 'accessory'], required),
  brand: String (required),
  specs: Object,
  details: String,
  stock: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date
}
```

### Order Schema
```javascript
{
  userId: ObjectId (ref: 'User'),
  items: [{
    productId: ObjectId (ref: 'Product'),
    quantity: Number (required),
    price: String (required)
  }],
  total: String (required),
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    phone: String
  },
  createdAt: Date
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer your-jwt-token
```

## Error Handling

The API returns consistent error responses:

```javascript
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Development

- **nodemon** is used for development to automatically restart the server on file changes
- **CORS** is enabled for cross-origin requests
- **dotenv** is used for environment variable management

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set a strong `JWT_SECRET`
4. Use a process manager like PM2
5. Set up proper logging and monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
