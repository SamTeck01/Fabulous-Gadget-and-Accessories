import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton({ product, className = '' }) {
  const whatsappNumber = '+2348123456789';
  
  const generateMessage = () => {
    return `Hello Fabulous Gadgets! I'm interested in the ${product.name} (₦${product.price}). Can you tell me more about it?`;
  };

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(generateMessage())}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`${className} transition-colors duration-300`}
    >
      <FaWhatsapp className="inline mr-2" size={20} />
      Chat on WhatsApp
    </button>
  );
}