
import HeroCarousel from '../components/home/HeroCarousel';
import CategoryGrid from '../components/home/CategoryGrid';
import DealCard from '../components/deals/DealCard';
import { getFeaturedProducts } from '../data/phones'; // Changed import to existing data file

/*import dealPhone from '../assets/img/Artboard_1_copy_2.png';
import dealLaptop from '../assets/img/Artboard_1_copy_3.png';
import dealPowerbank from '../assets/img/Powerbank-1.jpg';
import dealHeadphone from '../assets/img/Headphone-1.jpg';
import dealSpeaker from '../assets/img/Portable_speaker-1.jpg';
import dealCharger from '../assets/img/Phone_charger-1.jpg';
import dealSmartwatch from '../assets/img/Smartwatch-1.jpg';
import dealFlashdrive from '../assets/img/clipper.jpg';

const deals = [
  { name: 'Phone deals', to: '/phone-deals', img: dealPhone },
  { name: 'Laptops deals', to: '/laptop-deals', img: dealLaptop },
  { name: 'Power Banks deals', to: '/powerbank-deals', img: dealPowerbank },
  { name: 'Head Phones deals', to: '/headphone-deals', img: dealHeadphone },
  { name: 'Speaker deals', to: '/speaker-deals', img: dealSpeaker },
  { name: 'Charger deals', to: '/charger-deals', img: dealCharger },
  { name: 'Smart Watch deals', to: '/smartwatch-deals', img: dealSmartwatch },
  { name: 'Flash Drives deals', to: '/flashdrive-deals', img: dealFlashdrive },
];*/

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Shop by Category
        </h2>
        <CategoryGrid />
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <DealCard 
              key={product.id} 
              product={product} 
              type={product.type}
            />
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="bg-light-orange dark:bg-dark-orange text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Special Offers</h2>
          <p className="text-xl mb-6">
            Get 10% off on all accessories this week!
          </p>
          <button className="bg-white text-light-orange px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
}