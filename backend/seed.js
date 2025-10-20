const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fabulous-gadgets', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);

// Sample products data
const productsData = [
  // Phones
  {
    name: 'iPhone 15 Pro Max',
    detailedName: 'Apple iPhone 15 Pro Max 512GB - Nano Sim - Natural Titanium',
    price: '2,080,000',
    originalPrice: '2,200,000',
    image: '/src/assets/img/iphone-15-promax.jpg',
    category: 'phone',
    brand: 'Apple',
    specs: {
      display: '6.7" Super Retina XDR',
      chip: 'A17 Pro',
      camera: 'Triple 48MP + 12MP + 12MP',
      battery: '4422 mAh',
      storage: '512GB',
      color: 'Natural Titanium'
    },
    details: 'The most advanced iPhone with titanium design and A17 Pro chip.',
    stock: 15,
    isFeatured: true,
    tags: ['premium', 'camera', 'performance']
  },
  {
    name: 'iPhone 14',
    detailedName: 'Apple iPhone 14 128GB - Nano Sim - Midnight',
    price: '1,200,000',
    originalPrice: '1,350,000',
    image: '/src/assets/img/iphone-15-promax.jpg',
    category: 'phone',
    brand: 'Apple',
    specs: {
      display: '6.1" Super Retina XDR',
      chip: 'A15 Bionic',
      camera: 'Dual 12MP',
      battery: '3279 mAh',
      storage: '128GB',
      color: 'Midnight'
    },
    details: 'Powerful iPhone with A15 Bionic chip and advanced camera system.',
    stock: 25,
    isFeatured: true,
    tags: ['reliable', 'camera', 'value']
  },
  {
    name: 'Samsung Galaxy A05',
    detailedName: 'Samsung Galaxy A05 64GB - Android 13 - Silver',
    price: '113,999',
    image: '/src/assets/img/samsunga05.jpg',
    category: 'phone',
    brand: 'Samsung',
    specs: {
      display: '6.7" HD+ PLS LCD',
      chip: 'Helio G85',
      camera: '48MP + 2MP',
      battery: '5000 mAh',
      storage: '64GB',
      color: 'Silver'
    },
    details: 'Affordable Samsung smartphone with great battery life.',
    stock: 50,
    isFeatured: false,
    tags: ['budget', 'battery', 'android']
  },
  {
    name: 'Samsung Galaxy S23',
    detailedName: 'Samsung Galaxy S23 256GB - Phantom Black',
    price: '1,450,000',
    originalPrice: '1,600,000',
    image: '/src/assets/img/samsunga05.jpg',
    category: 'phone',
    brand: 'Samsung',
    specs: {
      display: '6.1" Dynamic AMOLED 2X',
      chip: 'Snapdragon 8 Gen 2',
      camera: '50MP + 12MP + 10MP',
      battery: '3900 mAh',
      storage: '256GB',
      color: 'Phantom Black'
    },
    details: 'Flagship Samsung smartphone with premium features.',
    stock: 20,
    isFeatured: true,
    tags: ['flagship', 'camera', 'premium']
  },
  {
    name: 'Tecno Spark 20',
    detailedName: 'Tecno Spark 20 (KJ5) 128GB + 4GB RAM - Black',
    price: '151,500',
    image: '/src/assets/img/spark20.jpg',
    category: 'phone',
    brand: 'Tecno',
    specs: {
      display: '6.6" HD+ IPS LCD',
      chip: 'Helio G85',
      camera: '50MP + AI Lens',
      battery: '5000 mAh',
      storage: '128GB',
      ram: '4GB',
      color: 'Black'
    },
    details: 'Budget-friendly smartphone with AI camera features.',
    stock: 40,
    isFeatured: false,
    tags: ['budget', 'ai-camera', 'android']
  },
  {
    name: 'Tecno Camon 20',
    detailedName: 'Tecno Camon 20 256GB + 8GB RAM - Glacier Glow',
    price: '185,000',
    image: '/src/assets/img/spark20.jpg',
    category: 'phone',
    brand: 'Tecno',
    specs: {
      display: '6.67" AMOLED',
      chip: 'MediaTek Helio G99',
      camera: '64MP + 2MP + QVGA',
      battery: '5000 mAh',
      storage: '256GB',
      ram: '8GB',
      color: 'Glacier Glow'
    },
    details: 'Mid-range smartphone with AMOLED display and great camera.',
    stock: 30,
    isFeatured: true,
    tags: ['mid-range', 'amoled', 'camera']
  },

  // Laptops
  {
    name: 'HP Envy x360',
    detailedName: 'HP Envy x360 15.6" Touchscreen Laptop - AMD Ryzen 7',
    price: '850,000',
    originalPrice: '950,000',
    image: '/src/assets/img/hp-elitebook.jpg',
    category: 'laptop',
    brand: 'HP',
    specs: {
      processor: 'AMD Ryzen 7 5825U',
      memory: '16GB DDR4',
      storage: '512GB SSD',
      display: '15.6" FHD Touchscreen',
      graphics: 'AMD Radeon Graphics',
      os: 'Windows 11'
    },
    details: 'Versatile 2-in-1 laptop with touchscreen and powerful AMD processor.',
    stock: 12,
    isFeatured: true,
    tags: ['2-in-1', 'touchscreen', 'amd']
  },
  {
    name: 'HP Pavilion',
    detailedName: 'HP Pavilion 14" Laptop - Intel Core i5',
    price: '720,000',
    image: '/src/assets/img/hp-elitebook.jpg',
    category: 'laptop',
    brand: 'HP',
    specs: {
      processor: 'Intel Core i5-1135G7',
      memory: '8GB DDR4',
      storage: '256GB SSD',
      display: '14" FHD',
      graphics: 'Intel Iris Xe',
      os: 'Windows 11'
    },
    details: 'Reliable laptop perfect for everyday computing tasks.',
    stock: 18,
    isFeatured: false,
    tags: ['reliable', 'intel', 'compact']
  },
  {
    name: 'Dell XPS 13',
    detailedName: 'Dell XPS 13 13.4" Laptop - Intel Core i7',
    price: '1,150,000',
    originalPrice: '1,300,000',
    image: '/src/assets/img/hp-elitebook.jpg',
    category: 'laptop',
    brand: 'Dell',
    specs: {
      processor: 'Intel Core i7-1195G7',
      memory: '16GB LPDDR4x',
      storage: '512GB SSD',
      display: '13.4" FHD+',
      graphics: 'Intel Iris Xe',
      os: 'Windows 11'
    },
    details: 'Premium ultrabook with stunning display and powerful performance.',
    stock: 8,
    isFeatured: true,
    tags: ['premium', 'ultrabook', 'display']
  },
  {
    name: 'Lenovo IdeaPad',
    detailedName: 'Lenovo IdeaPad 5 14" Laptop - AMD Ryzen 5',
    price: '680,000',
    image: '/src/assets/img/hp-elitebook.jpg',
    category: 'laptop',
    brand: 'Lenovo',
    specs: {
      processor: 'AMD Ryzen 5 5500U',
      memory: '8GB DDR4',
      storage: '512GB SSD',
      display: '14" FHD',
      graphics: 'AMD Radeon Graphics',
      os: 'Windows 11'
    },
    details: 'Great value laptop with AMD processor and solid performance.',
    stock: 22,
    isFeatured: false,
    tags: ['value', 'amd', 'reliable']
  },

  // Accessories
  {
    name: 'JBL Headphones',
    detailedName: 'JBL Tune 750BTNC Wireless Noise Cancelling Headphones',
    price: '45,000',
    originalPrice: '55,000',
    image: '/src/assets/img/Headphone-1.jpg',
    category: 'accessory',
    brand: 'JBL',
    specs: {
      type: 'Over-ear',
      connectivity: 'Bluetooth 5.0',
      battery: '15 hours',
      noiseCancelling: 'Yes',
      microphone: 'Built-in'
    },
    details: 'Premium wireless headphones with active noise cancellation.',
    stock: 35,
    isFeatured: true,
    tags: ['wireless', 'noise-cancelling', 'premium']
  },
  {
    name: 'JBL Speaker',
    detailedName: 'JBL Charge 5 Portable Bluetooth Speaker',
    price: '65,000',
    image: '/src/assets/img/jbl-speaker.jpg',
    category: 'accessory',
    brand: 'JBL',
    specs: {
      type: 'Portable Speaker',
      connectivity: 'Bluetooth 5.1',
      battery: '20 hours',
      waterproof: 'IP67',
      powerbank: 'Yes'
    },
    details: 'Portable speaker with excellent sound quality and waterproof design.',
    stock: 28,
    isFeatured: true,
    tags: ['portable', 'waterproof', 'powerbank']
  },
  {
    name: 'Smartwatch',
    detailedName: 'Samsung Galaxy Watch 6 Classic 47mm',
    price: '180,000',
    originalPrice: '200,000',
    image: '/src/assets/img/Smartwatch-1.jpg',
    category: 'accessory',
    brand: 'Samsung',
    specs: {
      display: '1.5" Super AMOLED',
      connectivity: 'Bluetooth, Wi-Fi, LTE',
      battery: '2 days',
      waterproof: 'IP68',
      health: 'Heart rate, SpO2, ECG'
    },
    details: 'Advanced smartwatch with health monitoring and LTE connectivity.',
    stock: 15,
    isFeatured: true,
    tags: ['smartwatch', 'health', 'lte']
  },
  {
    name: 'Power Bank',
    detailedName: 'Anker PowerCore 10000 Portable Charger',
    price: '25,000',
    image: '/src/assets/img/Powerbank-1.jpg',
    category: 'accessory',
    brand: 'Anker',
    specs: {
      capacity: '10000mAh',
      output: '5V/2A',
      input: '5V/2A',
      ports: '2 USB-A',
      led: '4 LED indicators'
    },
    details: 'Compact and reliable power bank for your devices.',
    stock: 50,
    isFeatured: false,
    tags: ['portable', 'reliable', 'compact']
  },
  {
    name: 'Phone Charger',
    detailedName: 'Apple Lightning to USB-C Cable 2m',
    price: '8,500',
    image: '/src/assets/img/Phone_charger-1.jpg',
    category: 'accessory',
    brand: 'Apple',
    specs: {
      connector: 'Lightning to USB-C',
      length: '2 meters',
      compatibility: 'iPhone, iPad',
      material: 'Braided'
    },
    details: 'Official Apple charging cable with braided design.',
    stock: 100,
    isFeatured: false,
    tags: ['official', 'durable', 'apple']
  },
  {
    name: 'Tripod',
    detailedName: 'Manfrotto Compact Action Tripod',
    price: '35,000',
    image: '/src/assets/img/Tripod-1.jpg',
    category: 'accessory',
    brand: 'Manfrotto',
    specs: {
      height: '150cm max',
      weight: '1.2kg',
      load: '4kg',
      material: 'Aluminum',
      head: 'Ball head included'
    },
    details: 'Professional tripod for photography and videography.',
    stock: 20,
    isFeatured: false,
    tags: ['professional', 'aluminum', 'versatile']
  }
];

// Sample users data
const usersData = [
  {
    username: 'admin',
    email: 'admin@fabulousgadgets.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user'
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    console.log('👥 Creating users...');
    for (const userData of usersData) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      await user.save();
    }
    console.log(`✅ Created ${usersData.length} users`);

    // Create products
    console.log('📱 Creating products...');
    for (const productData of productsData) {
      const product = new Product(productData);
      await product.save();
    }
    console.log(`✅ Created ${productsData.length} products`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Users: ${usersData.length}`);
    console.log(`- Products: ${productsData.length}`);
    console.log('\n🔑 Admin credentials:');
    console.log('Username: admin');
    console.log('Email: admin@fabulousgadgets.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run seeding
seedDatabase();
