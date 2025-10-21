// data/laptops.js
import hpLogo from '../assets/img/hp-laptops_300x400.png';
import dellLogo from '../assets/img/dell-laptop_300x400.png';
import lenovoLogo from '../assets/img/lenovo-laptops_300x400.png';
import hpImage from '../assets/img/hp-elitebook.jpg';

const laptopBrands = {
  hp: {
    name: 'HP',
    id: 'hp',
    logo: hpLogo,
    products: [
      {
        id: 'hp-envy-x360',
        name: 'HP Envy x360',
        detailedName: 'HP Envy x360 15.6" Touchscreen Laptop - AMD Ryzen 7',
        price: '850,000',
        image: hpImage,
        rating: 4.6,
        reviews: 145,
        inStock: true,
        featured: true,
        specs: {
          processor: 'AMD Ryzen 7 5825U',
          memory: '16GB DDR4',
          storage: '512GB SSD',
          display: '15.6" FHD Touchscreen'
        },
        description: 'Versatile 2-in-1 laptop with powerful AMD Ryzen processor and stunning touchscreen display.'
      },
      {
        id: 'hp-pavilion',
        name: 'HP Pavilion',
        detailedName: 'HP Pavilion 14" Laptop - Intel Core i5',
        price: '720,000',
        image: hpImage,
        rating: 4.4,
        reviews: 203,
        inStock: true,
        specs: {
          processor: 'Intel Core i5-1135G7',
          memory: '8GB DDR4',
          storage: '256GB SSD',
          display: '14" FHD'
        },
        description: 'Sleek and portable laptop perfect for work and entertainment with long battery life.'
      },
      {
        id: 'hp-spectre-x360',
        name: 'HP Spectre x360',
        detailedName: 'HP Spectre x360 14" 2-in-1 Laptop - Intel Core i7',
        price: '1,450,000',
        image: hpImage,
        rating: 4.8,
        reviews: 87,
        inStock: true,
        featured: true,
        specs: {
          processor: 'Intel Core i7-1255U',
          memory: '16GB LPDDR4x',
          storage: '1TB SSD',
          display: '13.5" 3K2K OLED Touchscreen'
        },
        description: 'Premium 2-in-1 with stunning OLED display and gem-cut design. Perfect for creators.'
      },
      {
        id: 'hp-victus-15',
        name: 'HP Victus 15',
        detailedName: 'HP Victus 15 Gaming Laptop - RTX 3050',
        price: '1,150,000',
        image: hpImage,
        rating: 4.5,
        reviews: 167,
        inStock: true,
        specs: {
          processor: 'Intel Core i5-12450H',
          memory: '8GB DDR4',
          storage: '512GB SSD',
          display: '15.6" FHD 144Hz',
          graphics: 'NVIDIA GeForce RTX 3050'
        },
        description: 'Affordable gaming laptop with RTX graphics and high refresh rate display.'
      }
    ]
  },
  dell: {
    name: 'Dell',
    id: 'dell',
    logo: dellLogo,
    products: [
      {
        id: 'dell-xps-13',
        name: 'Dell XPS 13',
        detailedName: 'Dell XPS 13 13.4" Laptop - Intel Core i7',
        price: '1,150,000',
        image: hpImage,
        rating: 4.7,
        reviews: 234,
        inStock: true,
        featured: true,
        specs: {
          processor: 'Intel Core i7-1195G7',
          memory: '16GB LPDDR4x',
          storage: '512GB SSD',
          display: '13.4" FHD+'
        },
        description: 'Ultra-premium laptop with InfinityEdge display and exceptional build quality.'
      },
      {
        id: 'dell-inspiron-15',
        name: 'Dell Inspiron 15',
        detailedName: 'Dell Inspiron 15 3000 Laptop - Intel Core i3',
        price: '485,000',
        image: hpImage,
        rating: 4.2,
        reviews: 312,
        inStock: true,
        specs: {
          processor: 'Intel Core i3-1115G4',
          memory: '8GB DDR4',
          storage: '256GB SSD',
          display: '15.6" HD'
        },
        description: 'Reliable everyday laptop for students and professionals at an affordable price.'
      },
      {
        id: 'dell-g15',
        name: 'Dell G15 Gaming',
        detailedName: 'Dell G15 Gaming Laptop - RTX 4050',
        price: '1,650,000',
        image: hpImage,
        rating: 4.6,
        reviews: 156,
        inStock: true,
        specs: {
          processor: 'Intel Core i7-13650HX',
          memory: '16GB DDR5',
          storage: '512GB SSD',
          display: '15.6" FHD 165Hz',
          graphics: 'NVIDIA GeForce RTX 4050'
        },
        description: 'Powerful gaming laptop with latest RTX 40-series graphics and high refresh display.'
      }
    ]
  },
  lenovo: {
    name: 'Lenovo',
    id: 'lenovo',
    logo: lenovoLogo,
    products: [
      {
        id: 'lenovo-ideapad',
        name: 'Lenovo IdeaPad',
        detailedName: 'Lenovo IdeaPad 5 14" Laptop - AMD Ryzen 5',
        price: '680,000',
        image: hpImage,
        rating: 4.5,
        reviews: 289,
        inStock: true,
        specs: {
          processor: 'AMD Ryzen 5 5500U',
          memory: '8GB DDR4',
          storage: '512GB SSD',
          display: '14" FHD'
        },
        description: 'Stylish and practical laptop with excellent performance for everyday computing.'
      },
      {
        id: 'lenovo-thinkpad-e14',
        name: 'Lenovo ThinkPad E14',
        detailedName: 'Lenovo ThinkPad E14 Gen 4 - Intel Core i5',
        price: '825,000',
        image: hpImage,
        rating: 4.6,
        reviews: 178,
        inStock: true,
        featured: true,
        specs: {
          processor: 'Intel Core i5-1235U',
          memory: '16GB DDR4',
          storage: '512GB SSD',
          display: '14" FHD IPS'
        },
        description: 'Business-class laptop with legendary ThinkPad reliability and security features.'
      },
      {
        id: 'lenovo-legion-5',
        name: 'Lenovo Legion 5',
        detailedName: 'Lenovo Legion 5 Gaming Laptop - RTX 3060',
        price: '1,450,000',
        image: hpImage,
        rating: 4.7,
        reviews: 201,
        inStock: true,
        specs: {
          processor: 'AMD Ryzen 7 5800H',
          memory: '16GB DDR4',
          storage: '512GB SSD',
          display: '15.6" FHD 165Hz',
          graphics: 'NVIDIA GeForce RTX 3060'
        },
        description: 'High-performance gaming laptop with excellent cooling and RGB keyboard.'
      },
      {
        id: 'lenovo-yoga-9i',
        name: 'Lenovo Yoga 9i',
        detailedName: 'Lenovo Yoga 9i 2-in-1 14" - Intel Core i7',
        price: '1,750,000',
        image: hpImage,
        rating: 4.8,
        reviews: 94,
        inStock: true,
        featured: true,
        specs: {
          processor: 'Intel Core i7-1260P',
          memory: '16GB LPDDR5',
          storage: '1TB SSD',
          display: '14" 2.8K OLED Touchscreen'
        },
        description: 'Premium 2-in-1 with stunning OLED display and rotating soundbar hinge.'
      }
    ]
  }
};

export const getLaptopBrands = () => Object.values(laptopBrands).map(({ name, id, logo, products }) => ({ name, id, logo, products }));

export const getAllLaptopProducts = () => {
  return Object.values(laptopBrands)
    .flatMap(brand => brand.products)
    .map(product => ({
      ...product,
      type: 'laptop',
    }));
};

export const getBrandById = (id) => laptopBrands[id];

export const getProductById = (brandId, productId) => {
  const brand = laptopBrands[brandId];
  if (!brand) return null;
  return brand.products.find(product => product.id === productId);
};