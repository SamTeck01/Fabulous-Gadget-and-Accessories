import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import WhatsAppButton from './WhatsappButton';

export default function ProductInfo({ product, onClose }) {
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, []);
  if (!product) return null;


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div 
          className="fixed inset-0 transition-opacity" 
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black opacity-75"></div>
        </div>

        {/* Modal Content */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {/* Product Images */}
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-4">
                <Swiper
                  spaceBetween={10}
                  navigation={true}
                  modules={[Navigation, Thumbs]}
                  className="rounded-lg"
                >
                  {[product.image, ...(product.additionalImages || [])].map((img, index) => (
                    <SwiperSlide key={index}>
                      <img 
                        src={img} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-64 sm:h-80 object-contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Product Details */}
              <div className="w-full sm:w-1/2">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {product.name}
                </h2>
                <p className="text-lg text-light-orange font-bold mb-4">
                  ₦{product.price}
                </p>

                {/* Specifications */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Specifications
                  </h3>
                  <ul className="space-y-2">
                    {Object.entries(product.specs || {}).map(([key, value]) => (
                      <li key={key} className="flex">
                        <span className="text-gray-600 dark:text-gray-400 font-medium w-32">
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </span>
                        <span className="text-gray-800 dark:text-gray-200">
                          {value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-6">
                  <WhatsAppButton 
                    product={product} 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
                  />
                  <button className="flex-1 bg-light-orange hover:bg-dark-orange text-white py-2 px-4 rounded-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}