# 🛍️ Fabulous Gadgets - E-Commerce Platform

A modern, full-featured e-commerce platform for electronics and gadgets built with React, Vite, and TailwindCSS.

![Fabulous Gadgets](./src/assets/img/fabulous-logo.png)

## ✨ Features

### 🛒 **Shopping Experience**
- **Product Catalog**: Browse phones, laptops, and accessories
- **Advanced Search**: Real-time search with filters
- **Product Details**: Comprehensive product information with ratings and reviews
- **Shopping Cart**: Add, remove, and manage cart items
- **Wishlist**: Save favorite products for later
- **Checkout Flow**: Complete order process with form validation
- **Order Confirmation**: Detailed order summary and tracking

### 🎨 **User Interface**
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Dark Mode**: Toggle between light and dark themes
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth loading indicators
- **Image Optimization**: Lazy loading for better performance
- **Swiper Carousels**: Beautiful product showcases

### 🔐 **Authentication & Admin**
- **User Authentication**: Login and registration
- **Admin Dashboard**: Product and order management
- **Role-Based Access**: User and admin permissions

### 📊 **Product Management**
- **15+ Phone Models**: Apple, Samsung, Tecno with detailed specs
- **15+ Laptop Models**: HP, Dell, Lenovo with ratings
- **Product Ratings**: Star ratings and review counts
- **Stock Management**: Real-time inventory tracking
- **Featured Products**: Highlighted best sellers

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.19.0 or higher recommended)
- npm or yarn
- MongoDB (optional, for backend)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Fabulous-Gadget-and-Accessories
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Fabulous Gadgets
VITE_WHATSAPP_NUMBER=+2341234567890
VITE_SUPPORT_EMAIL=support@fabulousgadgets.com
```

4. **Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Backend Setup (Optional)

1. **Navigate to backend directory**
```bash
cd backend
npm install
```

2. **Setup MongoDB**
- Install MongoDB locally or use MongoDB Atlas
- Update `MONGODB_URI` in `backend/.env`

3. **Seed the database**
```bash
node seed.js
```

4. **Start the backend server**
```bash
npm start
```

Backend will run on `http://localhost:5000`

## 📁 Project Structure

```
Fabulous-Gadget-and-Accessories/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable React components
│   │   ├── common/      # Shared components (Header, Footer, etc.)
│   │   ├── deals/       # Product cards and grids
│   │   ├── home/        # Homepage components
│   │   └── auth/        # Authentication components
│   ├── context/         # React Context providers
│   │   ├── CartContext.jsx
│   │   ├── WishlistContext.jsx
│   │   ├── ToastContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── AuthContext.jsx
│   ├── data/            # Static product data
│   │   ├── phones.js
│   │   └── laptops.js
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── PhoneDeals.jsx
│   │   ├── LaptopDeals.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── Wishlist.jsx
│   │   └── SearchResults.jsx
│   ├── services/        # API services
│   │   ├── api.js
│   │   └── productService.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── backend/             # Node.js/Express backend
│   ├── server.js
│   ├── seed.js
│   └── README.md
├── public/              # Public assets
├── .env.example         # Environment variables template
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **React Router DOM 7** - Routing
- **TailwindCSS 4** - Styling
- **Lucide React** - Icons
- **Swiper** - Carousels
- **React Helmet** - SEO meta tags

### Backend (Optional)
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📱 Key Features Implemented

### ✅ Critical Features
- [x] Backend API integration ready
- [x] Fixed image paths with proper imports
- [x] Complete checkout flow with validation
- [x] Order confirmation page
- [x] Toast notification system
- [x] Wishlist functionality
- [x] Loading states
- [x] Error handling

### ✅ High Priority Features
- [x] Expanded product data (30+ products)
- [x] Product ratings and reviews count
- [x] Responsive design optimizations
- [x] Search functionality
- [x] Product filters
- [x] Dark mode support

### ✅ Medium Priority Features
- [x] User authentication UI
- [x] SEO optimization with React Helmet
- [x] Environment configuration
- [x] Cart persistence (localStorage)
- [x] Wishlist persistence (localStorage)

### ✅ Additional Features
- [x] WhatsApp integration
- [x] Newsletter signup form
- [x] Product categorization
- [x] Brand filtering
- [x] Mobile-first design
- [x] Accessibility improvements

## 🎯 Usage

### Shopping Flow
1. **Browse Products**: Navigate to Phone Deals or Laptop Deals
2. **View Details**: Click on any product to see full specifications
3. **Add to Cart**: Click "Add to Cart" button
4. **Manage Cart**: View cart modal, adjust quantities
5. **Wishlist**: Save products for later with heart icon
6. **Checkout**: Fill in shipping and payment details
7. **Confirm Order**: Review order confirmation

### Admin Access
1. Navigate to `/admin-login`
2. Default credentials (if using seeded data):
   - Username: `admin`
   - Password: `admin123`
3. Manage products and orders from admin dashboard

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | Application name | `Fabulous Gadgets` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp contact | `+2341234567890` |
| `VITE_SUPPORT_EMAIL` | Support email | `support@fabulousgadgets.com` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | `false` |

## 📦 Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🧪 Testing

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Backend Deployment (Heroku/Railway)
1. Navigate to `backend` directory
2. Follow platform-specific deployment guide
3. Set environment variables
4. Update `VITE_API_BASE_URL` in frontend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support:
- Email: support@fabulousgadgets.com
- WhatsApp: +234 800 000 0000
- Create an issue in the repository

## 🙏 Acknowledgments

- Product images from various manufacturers
- Icons from Lucide React
- UI inspiration from modern e-commerce platforms

## 📈 Future Enhancements

- [ ] Payment gateway integration (Paystack/Flutterwave)
- [ ] Email notifications
- [ ] Product comparison tool
- [ ] User reviews and ratings submission
- [ ] Live chat support
- [ ] Multi-currency support
- [ ] Advanced analytics dashboard
- [ ] Bulk product upload
- [ ] Inventory management
- [ ] Sales reports and charts

---

**Built with ❤️ by the Fabulous Gadgets Team**
