const phoneBrands = {
  apple: {
    name: 'Apple',
    id: 'apple',
    logo: '/img/apple_260x144.png',
    products: [
      {
        id: 'iphone-15-promax',
        name: 'iPhone 15 Pro Max',
        detailedName: 'Apple iPhone 15 Pro Max 512GB - Nano Sim - Natural Titanium',
        price: '2,080,000',
        image: '/img/iphone-15-promax.jpg',
        specs: {
          display: '6.7" Super Retina XDR',
          chip: 'A17 Pro',
          camera: 'Triple 48MP + 12MP + 12MP',
          battery: '4422 mAh'
        }
      },
      {
        id: 'iphone-14',
        name: 'iPhone 14',
        detailedName: 'Apple iPhone 14 128GB - Nano Sim - Midnight',
        price: '1,200,000',
        image: '/img/iphone-14.jpg',
        specs: {
          display: '6.1" Super Retina XDR',
          chip: 'A15 Bionic',
          camera: 'Dual 12MP',
          battery: '3279 mAh'
        }
      }
    ]
  },

  samsung: {
    name: 'Samsung',
    id: 'samsung',
    logo: '/img/samsung_260x144v2.png',
    products: [
      {
        id: 'galaxy-a05',
        name: 'Samsung Galaxy A05',
        detailedName: 'Samsung Galaxy A05 64GB - Android 13 - Silver',
        price: '113,999',
        image: '/img/samsunga05.jpg',
        specs: {
          display: '6.7" HD+ PLS LCD',
          chip: 'Helio G85',
          camera: '48MP + 2MP',
          battery: '5000 mAh'
        }
      },
      {
        id: 'galaxy-s23',
        name: 'Samsung Galaxy S23',
        detailedName: 'Samsung Galaxy S23 256GB - Phantom Black',
        price: '1,450,000',
        image: '/img/galaxy-s23.jpg',
        specs: {
          display: '6.1" Dynamic AMOLED 2X',
          chip: 'Snapdragon 8 Gen 2',
          camera: '50MP + 12MP + 10MP',
          battery: '3900 mAh'
        }
      }
    ]
  },

  tecno: {
    name: 'Tecno',
    id: 'tecno',
    logo: '/img/tecno_260x144.png',
    products: [
      {
        id: 'spark-20',
        name: 'Tecno Spark 20',
        detailedName: 'Tecno Spark 20 (KJ5) 128GB + 4GB RAM - Black',
        price: '151,500',
        image: '/img/spark20.jpg',
        specs: {
          display: '6.6" HD+ IPS LCD',
          chip: 'Helio G85',
          camera: '50MP + AI Lens',
          battery: '5000 mAh'
        }
      },
      {
        id: 'camon-20',
        name: 'Tecno Camon 20',
        detailedName: 'Tecno Camon 20 256GB + 8GB RAM - Glacier Glow',
        price: '185,000',
        image: '/img/camon20.jpg',
        specs: {
          display: '6.67" AMOLED',
          chip: 'MediaTek Helio G99',
          camera: '64MP + 2MP + QVGA',
          battery: '5000 mAh'
        }
      }
    ]
  }
};

export const getFeaturedProducts = () => {
  return Object.values(phoneBrands)
    .flatMap(brand => brand.products)
    .map(product => ({
      ...product,
      type: 'phone',
    }));
};

export const getBrands = () => Object.values(phoneBrands).map(({ name, id, logo }) => ({ name, id, logo }));

export const getBrandById = (id) => phoneBrands[id];

export const getProductById = (brandId, productId) => {
  const brand = phoneBrands[brandId];
  if (!brand) return null;
  return brand.products.find(product => product.id === productId);
};