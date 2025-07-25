// components/common/RippleButton.jsx
import { useRef } from 'react';

export default function RippleButton({ children, onClick, className = '' }) {
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    const button = buttonRef.current;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.7);
          transform: scale(0);
          animation: ripple 600ms linear;
          pointer-events: none;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}