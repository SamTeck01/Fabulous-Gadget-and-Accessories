import { useState, useRef, useEffect } from 'react';
import { ArrowDown01Icon } from 'hugeicons-react';

export default function ModernDropdown({ 
  value, 
  onChange, 
  options = [], 
  placeholder = 'Select option',
  icon: Icon,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:border-gold2 focus:outline-none focus:ring-2 focus:ring-gold2 focus:border-transparent transition-all"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-500 dark:text-gray-400" />}
          <span className="text-sm">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ArrowDown01Icon 
          size={16} 
          className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-slideDown max-h-64 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                value === option.value 
                  ? 'bg-gold2/10 text-gold2 font-medium' 
                  : 'text-gray-700 dark:text-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
