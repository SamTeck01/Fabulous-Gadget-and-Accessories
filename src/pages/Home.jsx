import HeroCarousel from '../components/home/HeroCarousel';
import DealCard from '../components/deals/DealCard';
import { getFeaturedProducts, getNewArrivals, getTopBrandProducts } from '../data/phones';
import { getFeaturedLaptops } from '../data/laptops';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import phone from '../assets/img/Artboard_1_copy_2.png';
import laptop from '../assets/img/Artboard_1_copy_3.png';
import accessories from '../assets/img/Artboard_1_copy_7.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ArrowLeft, ChevronLeft, ChevronRight, MoveLeft, PanelLeft, ToggleLeft } from 'lucide-react';

export default function Home() {
  // Combine featured phones and laptops for best selling
  const featuredPhones = getFeaturedProducts();
  const featuredLaptops = getFeaturedLaptops();
  const bestSelling = [...featuredPhones, ...featuredLaptops];
  
  const newArrivals = getNewArrivals();
  const topBrands = getTopBrandProducts();
  const categories = [
    { name: 'Laptops', image: laptop, link: '/laptop-deals' },
    { name: 'Phones', image: phone, link: '/phone-deals'},
    { name: 'Accessories', image: accessories, link: '/phone-deals' } // Default to phones for now
  ];

  return (
    <div className="bg-white dark:bg-dark-primary text-gray-900 dark:text-dark-text">
      {/* Hero */}
      <HeroCarousel />

      {/* Best Selling Product */}
      <section className="mx-auto px-4 py-10">
        <div className='container mx-auto'>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-dark-text">Best Selling Product</h2>
            <Link to="/phone-deals" className="text-sm hover:underline text-gold2 dark:text-dark-accent">
              View more
            </Link>
          </div>
        </div>  

        <div className='md:flex md:flex-row gap-2'>
          <button className="hidden md:block custom-prev cursor-pointer bg-transparent ">
            <ChevronLeft size={60} className='-mx-2' />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
            }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 12 }, // mobile peek
              375: { slidesPerView: 2, spaceBetween: 14 }, // large phones
              425: { slidesPerView: 2, spaceBetween: 16 }, // small tablets
              480: { slidesPerView: 2, spaceBetween: 14 }, // small tablets
              640: { slidesPerView: 2.5, spaceBetween: 16 }, // large phones / small tablets
              768: { slidesPerView: 3, spaceBetween: 18 }, // tablets
              1024: { slidesPerView: 4, spaceBetween: 20 }, // desktop
              1280: { slidesPerView: 5, spaceBetween: 24 }, // large desktop
            }}
            className="max-w-[95%] md:max-w-[90%] mx-auto"
          >
            {bestSelling.map((product) => (
              <SwiperSlide key={product.id}>
                <DealCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="hidden md:block custom-next cursor-pointer">
            <ChevronRight size={60} className='-mx-2'/>
          </button>
        </div>  
        
        {/* Custom Pagination */}
        <div className='flex justify-between md:justify-center mt-3'>
          <button className="block md:hidden custom-prev cursor-pointer bg-transparent ">
            <ChevronLeft size={50} className='-mx-2' />
          </button>

          <div className='bg-ash/40 w-fit h-fit px-4 py-1 rounded-2xl'>
            <div className="custom-pagination"/>
          </div>

          <button className="block md:hidden custom-next cursor-pointer">
            <ChevronRight size={50} className='-mx-2'/>
          </button>
        </div>  
      </section>

      {/* Discover Our Offers */}
      <section className="bg-gray-700 dark:bg-dark-secondary text-white py-10">
        <div className="container mx-auto px-4 flex flex-wrap justify-around gap-6 text-center">
          <div>
            <img src="/src/assets/img/Headphone-1.jpg" alt="Headphones" className="w-28 mx-auto" />
            <p className="mt-2">Headphones</p>
          </div>
          <div>
            <img src="/src/assets/img/iphone-15-promax.jpg" alt="Smartphones" className="w-28 mx-auto" />
            <p className="mt-2">Smartphones</p>
          </div>
          <div>
            <img src="/src/assets/img/hp-elitebook.jpg" alt="Laptops" className="w-28 mx-auto" />
            <p className="mt-2">Laptops</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 pt-10 ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-dark-text">Categories</h2>
            <Link to="/phone-deals" className="text-sm hover:underline text-gold2 dark:text-dark-accent">
              View more
            </Link>
          </div>
        <div className="grid grid-cols-3 gap-4">
          {categories?.map((cat, idx) => (
            <Link 
              key={idx} 
              to={cat.link}
              className="text-center rounded-lg overflow-hidden relative hover:shadow-xl cursor-pointer group"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-20 md:h-40 object-cover group-hover:shadow-md transition-shadow" />
              <div className='bg-ash/80 bottom-0 absolute w-full py-0.5 md:py-1.5'>
                <p className="text-white font-medium text-base">{cat.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">New Arrival</h2>
          <Link to="/phone-deals" className="text-sm hover:underline text-gold2">
            View more
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <DealCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Brand Products */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Top Branded Products </h2>
          <Link to="/phone-deals" className="text-sm hover:underline text-gold2">
            View more
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {topBrands.map(product => (
            <DealCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-800 dark:bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Sign up to Newsletter</h3>
          <p className="mb-6">Get latest news, updates and deals directly mailed to your inbox.</p>
          <form className="flex justify-center gap-2">
            <input type="email" placeholder="Your email address here" className="px-4 py-2 rounded-lg w-64 text-gold" />
            <button type="submit" className="bg-gold2 hover:bg-gold2/80 px-6 py-2 rounded-lg font-medium transition-colors">SIGN UP</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-6 text-center text-sm">
        <p>©2025 Gadgetshop. Shop With Us</p>
      </footer>
    </div>
  );
}
