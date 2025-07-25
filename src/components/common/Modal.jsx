import React from 'react';
import ReactDOM from 'react-dom';
import PhoneInfo from '../phone/phone-info';
import LaptopInfo from '../laptop/laptop-info';

function Modal({ open, soleTrending, onClose, type = 'phone' }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4">
      <div 
        className="relative bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-yellow-600"
        onClick={(e) => e.stopPropagation()}
      >
        {type === 'phone' ? (
          <PhoneInfo soleTrending={soleTrending} />
        ) : (
          <LaptopInfo soleTrending={soleTrending} />
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-500 hover:text-yellow-300 transition"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.getElementById('portal')
  );
}

export default Modal;