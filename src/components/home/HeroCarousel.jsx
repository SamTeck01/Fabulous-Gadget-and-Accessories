import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import banner1 from '../../assets/img/OTW-340-1920820.png';
import banner2 from '../../assets/img/freepik-export-20240803150659TGc0.png';
import banner3 from '../../assets/img/freepik-export-202408031523174eMe.png';
import banner4 from '../../assets/img/banner-l1.png'; // Adjusted import path
import banner5 from '../../assets/img/freepik-export-20240803152820errY.png';
import banner6 from '../../assets/img/smartwatch-banner.png'; // Adjusted import path

export default function HeroCarousel() {
  const banners = [
    { src: banner1, alt: 'Banner 1' },
    { src: banner2, alt: 'Banner 2' },
    { src: banner3, alt: 'Banner 3' },
    { src: banner4, alt: 'Banner 4' },
    { src: banner5, alt: 'Banner 5' },
    { src: banner6, alt: 'Banner 6' },
  ];

  return (
    <div className="relative h-fit">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img 
              src={banner.src} 
              alt={banner.alt} 
              className="w-full h-fit md:max-h-[500px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
