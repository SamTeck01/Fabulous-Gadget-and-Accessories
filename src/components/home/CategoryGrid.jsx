// components/home/CategoryGrid.jsx
import { Link } from 'react-router-dom';
import { SmartPhone01Icon, LaptopIcon, HeadphonesIcon, BatteryFullIcon, Speaker01Icon, Plug01Icon, Clock01Icon, UsbIcon } from 'hugeicons-react';

const categories = [
  { name: 'Phones', to: '/phone-deals', icon: <SmartPhone01Icon size={24} /> },
  { name: 'Laptops', to: '/laptop-deals', icon: <LaptopIcon size={24} /> },
  { name: 'Power Banks', to: '/powerbank-deals', icon: <BatteryFullIcon size={24} /> },
  { name: 'Headphones', to: '/headphone-deals', icon: <HeadphonesIcon size={24} /> },
  { name: 'Speakers', to: '/speaker-deals', icon: <Speaker01Icon size={24} /> },
  { name: 'Chargers', to: '/charger-deals', icon: <Plug01Icon size={24} /> },
  { name: 'Smart Watches', to: '/smartwatch-deals', icon: <Clock01Icon size={24} /> },
  { name: 'Flash Drives', to: '/flashdrive-deals', icon: <UsbIcon size={24} /> },
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