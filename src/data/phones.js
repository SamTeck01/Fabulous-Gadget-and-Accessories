import apple from '../assets/img/apple_260x144.png';
import iphone15promax from '../assets/img/iphone-15-promax.jpg';
import samsunga05 from '../assets/img/samsunga05.jpg';
import samsung_260x144v2 from '../assets/img/samsung_260x144v2.png'; 
import tecno from '../assets/img/tecno_260x144.png';
import spark20 from '../assets/img/spark20.jpg';


const phoneBrands = {
  apple: {
    name: 'Apple',
    id: 'apple',
    logo: apple,
    products: [
      {
        id: 'iphone-15-promax',
        name: 'iPhone 15 Pro Max',
        detailedName: 'Apple iPhone 15 Pro Max 512GB - Nano Sim - Natural Titanium',
        price: '2,080,000',
        image: iphone15promax,
        rating: 4.9,
        reviews: 287,
        inStock: true,
        featured: true,
        specs: {
          display: '6.7" Super Retina XDR',
          chip: 'A17 Pro',
          camera: 'Triple 48MP + 12MP + 12MP',
          battery: '4422 mAh',
          storage: '512GB',
          ram: '8GB',
          os: 'iOS 17',
          connectivity: '5G, WiFi 6E, Bluetooth 5.3'
        },
        description: 'Forged in titanium with the most powerful iPhone chip ever. A17 Pro delivers exceptional performance with ProMotion technology and always-on display.',
        warranty: '1 Year Apple Limited Warranty',
        returnPolicy: '14 Days Return & Exchange',
        shipping: 'Free Shipping'
      },
      {
        id: 'iphone-14',
        name: 'iPhone 14',
        detailedName: 'Apple iPhone 14 128GB - Nano Sim - Midnight',
        price: '1,200,000',
        image: iphone15promax,
        rating: 4.7,
        reviews: 342,
        inStock: true,
        specs: {
          display: '6.1" Super Retina XDR',
          chip: 'A15 Bionic',
          camera: 'Dual 12MP',
          battery: '3279 mAh'
        },
        description: 'A total powerhouse with advanced camera system, all-day battery life, and emergency features.'
      },
      {
        id: 'iphone-13',
        name: 'iPhone 13',
        detailedName: 'Apple iPhone 13 128GB - Starlight',
        price: '950,000',
        image: iphone15promax,
        rating: 4.6,
        reviews: 521,
        inStock: true,
        specs: {
          display: '6.1" Super Retina XDR',
          chip: 'A15 Bionic',
          camera: 'Dual 12MP',
          battery: '3240 mAh'
        },
        description: 'Your new superpower. The most advanced dual-camera system ever on iPhone.'
      },
      {
        id: 'iphone-se-2022',
        name: 'iPhone SE (2022)',
        detailedName: 'Apple iPhone SE 64GB - (PRODUCT)RED',
        price: '580,000',
        image: iphone15promax,
        rating: 4.4,
        reviews: 198,
        inStock: true,
        specs: {
          display: '4.7" Retina HD',
          chip: 'A15 Bionic',
          camera: 'Single 12MP',
          battery: '2018 mAh'
        },
        description: 'Serious power. Serious value. Features the powerful A15 Bionic chip.'
      }
    ]
  },

  samsung: {
    name: 'Samsung',
    id: 'samsung',
    logo: samsung_260x144v2,
    products: [
      {
        id: 'galaxy-a05',
        name: 'Samsung Galaxy A05',
        detailedName: 'Samsung Galaxy A05 64GB - Android 13 - Silver',
        price: '113,999',
        image: samsunga05,
        rating: 4.2,
        reviews: 156,
        inStock: true,
        specs: {
          display: '6.7" HD+ PLS LCD',
          chip: 'Helio G85',
          camera: '48MP + 2MP',
          battery: '5000 mAh',
          storage: '64GB',
          ram: '4GB',
          os: 'Android 13',
          connectivity: '4G LTE, WiFi, Bluetooth 5.0'
        },
        description: 'Affordable smartphone with large display and long-lasting battery for everyday use. Perfect for basic tasks and entertainment.',
        warranty: '1 Year Samsung Warranty',
        returnPolicy: '7 Days Return & Exchange',
        shipping: 'Standard Shipping - ₦2,500'
      },
      {
        id: 'galaxy-s23',
        name: 'Samsung Galaxy S23',
        detailedName: 'Samsung Galaxy S23 256GB - Phantom Black',
        price: '1,450,000',
        image: samsunga05,
        rating: 4.8,
        reviews: 423,
        inStock: true,
        featured: true,
        specs: {
          display: '6.1" Dynamic AMOLED 2X',
          chip: 'Snapdragon 8 Gen 2',
          camera: '50MP + 12MP + 10MP',
          battery: '3900 mAh'
        },
        description: 'Epic performance with Snapdragon 8 Gen 2. Capture stunning photos in any light.'
      },
      {
        id: 'galaxy-a54',
        name: 'Samsung Galaxy A54',
        detailedName: 'Samsung Galaxy A54 5G 256GB - Awesome Violet',
        price: '485,000',
        image: samsunga05,
        rating: 4.5,
        reviews: 312,
        inStock: true,
        specs: {
          display: '6.4" Super AMOLED',
          chip: 'Exynos 1380',
          camera: '50MP + 12MP + 5MP',
          battery: '5000 mAh'
        },
        description: 'Awesome in every way. Premium design with powerful performance and 5G connectivity.'
      },
      {
        id: 'galaxy-z-flip5',
        name: 'Samsung Galaxy Z Flip5',
        detailedName: 'Samsung Galaxy Z Flip5 512GB - Mint',
        price: '1,850,000',
        image: samsunga05,
        rating: 4.7,
        reviews: 189,
        inStock: true,
        featured: true,
        specs: {
          display: '6.7" Foldable Dynamic AMOLED',
          chip: 'Snapdragon 8 Gen 2',
          camera: 'Dual 12MP',
          battery: '3700 mAh'
        },
        description: 'Unfold your world. The most compact foldable phone with a larger cover screen.'
      }
    ]
  },

  tecno: {
    name: 'Tecno',
    id: 'tecno',
    logo: tecno,
    products: [
      {
        id: 'spark-20',
        name: 'Tecno Spark 20',
        detailedName: 'Tecno Spark 20 (KJ5) 128GB + 4GB RAM - Black',
        price: '151,500',
        image: spark20,
        rating: 4.1,
        reviews: 234,
        inStock: true,
        specs: {
          display: '6.6" HD+ IPS LCD',
          chip: 'Helio G85',
          camera: '50MP + AI Lens',
          battery: '5000 mAh'
        },
        description: 'Spark your creativity with 50MP camera and massive 5000mAh battery.'
      },
      {
        id: 'camon-20',
        name: 'Tecno Camon 20',
        detailedName: 'Tecno Camon 20 256GB + 8GB RAM - Glacier Glow',
        price: '185,000',
        image: spark20,
        rating: 4.3,
        reviews: 178,
        inStock: true,
        specs: {
          display: '6.67" AMOLED',
          chip: 'MediaTek Helio G99',
          camera: '64MP + 2MP + QVGA',
          battery: '5000 mAh'
        },
        description: 'Capture stunning photos with 64MP RGBW camera and vibrant AMOLED display.'
      },
      {
        id: 'phantom-x2',
        name: 'Tecno Phantom X2',
        detailedName: 'Tecno Phantom X2 5G 256GB - Stardust Grey',
        price: '425,000',
        image: spark20,
        rating: 4.4,
        reviews: 92,
        inStock: true,
        featured: true,
        specs: {
          display: '6.8" AMOLED',
          chip: 'MediaTek Dimensity 9000',
          camera: '64MP + 13MP + 2MP',
          battery: '5160 mAh'
        },
        description: 'Premium flagship with 5G connectivity and professional-grade camera system.'
      }
    ]
  }
};

export const getFeaturedProducts = () => {
  return Object.values(phoneBrands)
    .flatMap(brand => brand.products.filter(product => product.featured).map(product => ({
      ...product,
      brand: brand.id,
      type: 'phone',
    })));
};

export const getBrands = () => Object.values(phoneBrands).map(({ name, id, logo }) => ({ name, id, logo }));

export const getNewArrivals = () => {
  return Object.values(phoneBrands)
    .flatMap(brand => brand.products.map(product => ({
      ...product,
      brand: brand.id,
      type: 'phone',
    })))
    .sort((a, b) => new Date(b.detailedName) - new Date(a.detailedName))
    .slice(0, 4);
}

export const getTopBrandProducts =()=> {
  return Object.values(phoneBrands)
    .flatMap(brand => brand.products.map(product => ({
      ...product,
      brand: brand.id,
      type: 'phone',
    })));
} 

export const getBrandById = (id) => phoneBrands[id];

export const getProductById = (brandId, productId) => {
  const brand = phoneBrands[brandId];
  if (!brand) return null;
  return brand.products.find(product => product.id === productId);
};