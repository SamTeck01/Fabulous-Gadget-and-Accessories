# Fabulous Gadgets Backend

A comprehensive backend API for the Fabulous Gadgets e-commerce application built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Password hashing with bcryptjs
  - User registration and login

- **Product Management**
  - CRUD operations for products
  - Product categories and brands
  - Image upload support
  - Search and filtering
  - Featured products
  - Stock management

- **Order Management**
  - Order creation and tracking
  - Order status updates
  - Payment status tracking
  - Order history

- **Admin Dashboard**
  - Product management
  - Order management
  - User management
  - Analytics and statistics

- **Security Features**
  - Rate limiting
  - Input validation
  - CORS protection
  - Helmet security headers
  - Error handling

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer
- **Validation**: express-validator
- **Logging**: Morgan

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the environment example file and configure your variables:

```bash
cp env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/fabulous-gadgets

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=5000

# Environment
NODE_ENV=development

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads

# Admin Credentials (for initial setup)
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@fabulousgadgets.com
ADMIN_PASSWORD=admin123
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For local MongoDB
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod
```

### 4. Seed the Database (Optional)

Populate the database with sample data:

```bash
node seed.js
```

This will create:
- Admin user (admin/admin123)
- Sample users
- Sample products (phones, laptops, accessories)

### 5. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/:id` | Get product by ID | No |
| GET | `/api/products/featured` | Get featured products | No |
| GET | `/api/categories` | Get product categories | No |
| GET | `/api/brands` | Get product brands | No |
| POST | `/api/admin/products` | Create product | Admin |
| PUT | `/api/admin/products/:id` | Update product | Admin |
| DELETE | `/api/admin/products/:id` | Delete product | Admin |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/orders` | Create order | User |
| GET | `/api/orders` | Get user orders | User |
| GET | `/api/orders/:id` | Get order by ID | User |
| GET | `/api/admin/orders` | Get all orders | Admin |
| PUT | `/api/admin/orders/:id` | Update order | Admin |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/stats` | Get dashboard statistics | Admin |

### Utility Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/fabulous-gadgets` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:3000,http://localhost:5173` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` (15 minutes) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |
| `MAX_FILE_SIZE` | Max file upload size | `5242880` (5MB) |
| `UPLOAD_PATH` | File upload directory | `uploads` |

## 📁 Project Structure

```
backend/
├── server.js          # Main server file
├── seed.js            # Database seeding script
├── package.json       # Dependencies and scripts
├── .env              # Environment variables
├── env.example       # Environment variables template
├── uploads/          # File upload directory
└── README.md         # This file
```

## 🔒 Security Features

- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Validates all incoming data
- **CORS Protection**: Configurable cross-origin requests
- **Helmet**: Security headers
- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **File Upload Security**: File type and size validation

## 🚀 Deployment

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start server.js --name "fabulous-gadgets-api"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Using Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run health check
curl http://localhost:5000/api/health

# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## 📝 API Examples

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Products

```bash
curl http://localhost:5000/api/products?category=phone&page=1&limit=10
```

### Create Order

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "items": [{"productId": "PRODUCT_ID", "quantity": 1, "price": "100000"}],
    "total": "100000",
    "shippingAddress": {
      "name": "John Doe",
      "address": "123 Main St",
      "city": "Lagos",
      "state": "Lagos",
      "zipCode": "100001",
      "phone": "+2341234567890"
    }
  }'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@fabulousgadgets.com or create an issue in the repository.