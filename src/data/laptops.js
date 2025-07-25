// data/laptops.js
const laptopBrands = {
  hp: {
    name: 'HP',
    id: 'hp',
    logo: '/img/hp-logo.png',
    products: [
      {
        id: 'hp-envy-x360',
        name: 'HP Envy x360',
        detailedName: 'HP Envy x360 15.6" Touchscreen Laptop - AMD Ryzen 7',
        price: '850,000',
        image: '/img/hp-envy-x360.jpg',
        specs: {
          processor: 'AMD Ryzen 7 5825U',
          memory: '16GB DDR4',
          storage: '512GB SSD',
          display: '15.6" FHD Touchscreen'
        }
      },
      {
        id: 'hp-pavilion',
        name: 'HP Pavilion',
        detailedName: 'HP Pavilion 14" Laptop - Intel Core i5',
        price: '720,000',
        image: '/img/hp-pavilion.jpg',
        specs: {
          processor: 'Intel Core i5-1135G7',
          memory: '8GB DDR4',
          storage: '256GB SSD',
          display: '14" FHD'
        }
      }
    ]
  },
  dell: {
    name: 'Dell',
    id: 'dell',
    logo: '/img/dell-logo.png',
    products: [
      {
        id: 'dell-xps-13',
        name: 'Dell XPS 13',
        detailedName: 'Dell XPS 13 13.4" Laptop - Intel Core i7',
        price: '1,150,000',
        image: '/img/dell-xps-13.jpg',
        specs: {
          processor: 'Intel Core i7-1195G7',
          memory: '16GB LPDDR4x',
          storage: '512GB SSD',
          display: '13.4" FHD+'
        }
      }
    ]
  },
  lenovo: {
    name: 'Lenovo',
    id: 'lenovo',
    logo: '/img/lenovo-logo.png',
    products: [
      {
        id: 'lenovo-ideapad',
        name: 'Lenovo IdeaPad',
        detailedName: 'Lenovo IdeaPad 5 14" Laptop - AMD Ryzen 5',
        price: '680,000',
        image: '/img/lenovo-ideapad.jpg',
        specs: {
          processor: 'AMD Ryzen 5 5500U',
          memory: '8GB DDR4',
          storage: '512GB SSD',
          display: '14" FHD'
        }
      }
    ]
  }
};

export const getLaptopBrands = () => Object.values(laptopBrands).map(({ name, id, logo }) => ({ name, id, logo }));

export const getBrandById = (id) => laptopBrands[id];

export const getProductById = (brandId, productId) => {
  const brand = laptopBrands[brandId];
  if (!brand) return null;
  return brand.products.find(product => product.id === productId);
};