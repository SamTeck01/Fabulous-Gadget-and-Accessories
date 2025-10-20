const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000', 'http://localhost:5173'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Create uploads directory if it doesn't exist
const uploadsDir = process.env.UPLOAD_PATH || 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// MongoDB Connection with error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fabulous-gadgets', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
  // Initialize admin user after successful connection
  initializeAdminUser();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Database connection event handlers
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error during app termination:', error);
    process.exit(1);
  }
});

// Models
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  detailedName: { type: String, required: true, trim: true },
  price: { type: String, required: true },
  originalPrice: { type: String },
  image: { type: String, required: true },
  images: [{ type: String }],
  category: { type: String, enum: ['phone', 'laptop', 'accessory'], required: true },
  brand: { type: String, required: true, trim: true },
  specs: { type: Object },
  details: { type: String },
  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderNumber: { type: String, unique: true, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: String, required: true },
    productName: { type: String, required: true }
  }],
  total: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'], 
    default: 'pending' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed', 'refunded'], 
    default: 'pending' 
  },
  paymentMethod: { type: String },
  shippingAddress: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String }
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add indexes for better performance
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });
ProductSchema.index({ category: 1, brand: 1 });
ProductSchema.index({ name: 'text', detailedName: 'text' });
OrderSchema.index({ userId: 1 });
OrderSchema.index({ orderNumber: 1 });

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Order = mongoose.model('Order', OrderSchema);

// Initialize admin user
async function initializeAdminUser() {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
      const admin = new User({
        username: process.env.ADMIN_USERNAME || 'admin',
        email: process.env.ADMIN_EMAIL || 'admin@fabulousgadgets.com',
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Admin user created successfully');
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
}

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: 'Validation Error', errors });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ message: `${field} already exists` });
  }

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large' });
    }
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ 
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message 
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Fabulous Gadgets API is running!',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Auth Routes
app.post('/api/auth/register', [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], validateRequest, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/login', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], validateRequest, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username, isActive: true });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error);
  }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const { 
      category, 
      brand, 
      search, 
      page = 1, 
      limit = 12, 
      sort = 'createdAt',
      order = 'desc',
      minPrice,
      maxPrice,
      featured
    } = req.query;
    
    const query = { isActive: true };

    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (featured === 'true') query.isFeatured = true;
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { detailedName: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const products = await Product.find(query)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Featured products
app.get('/api/products/featured', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true, isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(8);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Product categories and brands
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

app.get('/api/brands', async (req, res) => {
  try {
    const brands = await Product.distinct('brand');
    res.json(brands);
  } catch (error) {
    next(error);
  }
});

// Admin Product Routes
app.post('/api/admin/products', authenticateToken, requireAdmin, upload.array('images', 5), [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('price').notEmpty().withMessage('Price is required'),
  body('category').isIn(['phone', 'laptop', 'accessory']).withMessage('Valid category is required'),
  body('brand').trim().notEmpty().withMessage('Brand is required')
], validateRequest, async (req, res) => {
  try {
    const productData = req.body;
    
    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map(file => `/uploads/${file.filename}`);
      if (!productData.image) {
        productData.image = productData.images[0];
      }
    }

    const product = new Product(productData);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    next(error);
  }
});

app.put('/api/admin/products/:id', authenticateToken, requireAdmin, upload.array('images', 5), async (req, res) => {
  try {
    const productData = req.body;
    
    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    productData.updatedAt = new Date();
    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    next(error);
  }
});

app.delete('/api/admin/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Order Routes
app.post('/api/orders', authenticateToken, [
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('shippingAddress.name').trim().notEmpty().withMessage('Shipping name is required'),
  body('shippingAddress.address').trim().notEmpty().withMessage('Shipping address is required'),
  body('shippingAddress.city').trim().notEmpty().withMessage('City is required'),
  body('shippingAddress.state').trim().notEmpty().withMessage('State is required'),
  body('shippingAddress.zipCode').trim().notEmpty().withMessage('ZIP code is required'),
  body('shippingAddress.phone').trim().notEmpty().withMessage('Phone number is required')
], validateRequest, async (req, res) => {
  try {
    // Generate unique order number
    const orderNumber = 'FG' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    const order = new Order({
      ...req.body,
      userId: req.user.userId,
      orderNumber
    });
    
    await order.save();
    await order.populate('items.productId');
    
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    next(error);
  }
});

app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .populate('items.productId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

app.get('/api/orders/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.userId })
      .populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// Admin Order Routes
app.get('/api/admin/orders', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate('items.productId')
      .populate('userId', 'username email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalOrders: total
      }
    });
  } catch (error) {
    next(error);
  }
});

app.put('/api/admin/orders/:id', authenticateToken, requireAdmin, [
  body('status').optional().isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
  body('paymentStatus').optional().isIn(['pending', 'paid', 'failed', 'refunded'])
], validateRequest, async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };
    const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate('items.productId')
      .populate('userId', 'username email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    next(error);
  }
});

// Stats Route for Admin Dashboard
app.get('/api/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ isActive: true });
    
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' }, paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: { $toDouble: '$total' } } } }
    ]);

    const recentOrders = await Order.find()
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
      .limit(5);

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders,
      ordersByStatus
    });
  } catch (error) {
    next(error);
  }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});