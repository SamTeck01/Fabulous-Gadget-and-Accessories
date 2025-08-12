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
        image: iphone15promax,
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
    logo: samsung_260x144v2,
    products: [
      {
        id: 'galaxy-a05',
        name: 'Samsung Galaxy A05',
        detailedName: 'Samsung Galaxy A05 64GB - Android 13 - Silver',
        price: '113,999',
        image: samsunga05,
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
        image: samsunga05,
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
    logo: tecno,
    products: [
      {
        id: 'spark-20',
        name: 'Tecno Spark 20',
        detailedName: 'Tecno Spark 20 (KJ5) 128GB + 4GB RAM - Black',
        price: '151,500',
        image: spark20,
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
        image: spark20,
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

export const getNewArrivals = () => {
  return Object.values(phoneBrands)
    .flatMap(brand => brand.products)
    .sort((a, b) => new Date(b.detailedName) - new Date(a.detailedName))
    .slice(0, 4)
    .map(product => ({
      ...product,
      type: 'phone',
    }));
}

export const getTopBrandProducts =()=> {
  return Object.values(phoneBrands)
    .flatMap(brand => brand.products)
    .map(product => ({
      ...product,
      type: 'phone',
    }));
} 

export const getBrandById = (id) => phoneBrands[id];

export const getProductById = (brandId, productId) => {
  const brand = phoneBrands[brandId];
  if (!brand) return null;
  return brand.products.find(product => product.id === productId);
};