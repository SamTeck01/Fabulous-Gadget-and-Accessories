// components/home/CategoryGrid.jsx
import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Headphones, BatteryFull, Speaker, Plug, Clock, Usb } from 'lucide-react';

const categories = [
  { name: 'Phones', to: '/phone-deals', icon: <Smartphone size={24} /> },
  { name: 'Laptops', to: '/laptop-deals', icon: <Laptop size={24} /> },
  { name: 'Power Banks', to: '/powerbank-deals', icon: <BatteryFull size={24} /> },
  { name: 'Headphones', to: '/headphone-deals', icon: <Headphones size={24} /> },
  { name: 'Speakers', to: '/speaker-deals', icon: <Speaker size={24} /> },
  { name: 'Chargers', to: '/charger-deals', icon: <Plug size={24} /> },
  { name: 'Smart Watches', to: '/smartwatch-deals', icon: <Clock size={24} /> },
  { name: 'Flash Drives', to: '/flashdrive-deals', icon: <Usb size={24} /> },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.to}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
        >
          <div className="text-gold2 mb-2">{category.icon}</div>
          <h3 className="text-center font-medium text-gray-800 dark:text-white">
            {category.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}