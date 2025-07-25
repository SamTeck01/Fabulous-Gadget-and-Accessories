import React from 'react';

export default function SearchBar({ placeholder, value, onChange, className }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-orange ${className}`}
    />
  );
}
