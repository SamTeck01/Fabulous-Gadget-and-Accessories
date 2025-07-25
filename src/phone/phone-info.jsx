import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactWhatsapp from 'react-whatsapp';
import { Helmet } from 'react-helmet';

const RippleEffect = ({ children }) => {
  const [rippleActive, setRippleActive] = useState(false);

  const handleMouseEnter = (event) => {
    if (rippleActive) return;

    setRippleActive(true);

    const ripple = document.createElement('span');
    const size = Math.max(event.currentTarget.clientWidth, event.currentTarget.clientHeight);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.classList.add('ripple');

    event.currentTarget.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
      setRippleActive(false);
    });
  };

  return (
    <div className="relative overflow-hidden" onMouseEnter={handleMouseEnter}>
      {children}
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(253, 224, 71, 0.5);
          animation: ripple-animation 0.6s linear;
          pointer-events: none;
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
        }
        @keyframes ripple-animation {
          from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.75;
          }
          to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

function PhoneInfo({ soleTrending }) {
  const urlUpdated = window.location.href;

  return (
    <>
      <Helmet>
        <title>{soleTrending.detailedName}</title>
        <meta property="og:title" content={soleTrending.detailedName} />
        <meta property="og:image" content={soleTrending.image} />
        <meta property="og:url" content={urlUpdated} />
      </Helmet>

      <section className="flex flex-wrap p-4 mb-4 mt-2">
        <div className="w-full md:w-1/3">
          <img src={soleTrending.image} alt="Phone" className="w-full rounded" />
        </div>

        <div className="w-full md:w-2/3 md:pl-5">
          <p className="text-xl font-semibold mb-2">{soleTrending.detailedName}</p>

          <div className="mb-4 border-b border-gray-300 pb-2 text-sm text-gray-600">
            Brand:{' '}
            <Link
              to={`/phone-deals/${soleTrending.brand}`}
              className="capitalize text-yellow-600 hover:underline"
            >
              {soleTrending.brand}
            </Link>{' '}
            |{' '}
            <Link
              to={`/phone-deals/${soleTrending.brand}`}
              className="capitalize text-yellow-600 hover:underline"
            >
              Similar products from {soleTrending.brand}
            </Link>
          </div>

          <p className="text-2xl font-bold text-yellow-600 mb-4">{soleTrending.price}</p>

          <RippleEffect>
            <ReactWhatsapp
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
              number="+2349032751123"
              message={`Hello, I'm interested in purchasing the *${soleTrending.name}* from you, which I see is priced at ₦${soleTrending.price}. \n ${urlUpdated}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.52 3.48A11.91 11.91 0 0012 0C5.37 0 0 5.37 0 12a11.91 11.91 0 001.48 6.52L0 24l5.48-1.48A11.91 11.91 0 0012 24c6.63 0 12-5.37 12-12a11.91 11.91 0 00-3.48-8.52zM12 21.5a9.5 9.5 0 01-4.84-1.38l-.35-.21-3.25.88.88-3.25-.21-.35A9.5 9.5 0 012.5 12 9.5 9.5 0 0112 2.5 9.5 9.5 0 0121.5 12 9.5 9.5 0 0112 21.5z" />
                <path d="M17.5 14.5c-.2 0-1.12-.54-1.3-.6-.18-.06-.3-.09-.43.09s-.49.6-.6.72c-.11.12-.22.13-.42.04a5.3 5.3 0 01-1.56-.96 5.94 5.94 0 01-1.1-1.37c-.11-.18 0-.28.08-.37.08-.08.18-.22.27-.33.09-.11.12-.18.18-.3.06-.12 0-.22-.04-.3-.06-.08-.43-1.04-.59-1.42-.15-.37-.3-.32-.43-.32-.12 0-.26 0-.4 0a.9.9 0 00-.66.3c-.22.22-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64a14.1 14.1 0 001.88.8c.79.32 1.5.26 2.06.16.63-.12 1.92-.78 2.2-1.53.28-.75.28-1.39.2-1.53-.08-.14-.3-.22-.5-.3z" />
              </svg>
              Order Now
            </ReactWhatsapp>
          </RippleEffect>
        </div>
      </section>
    </>
  );
}

export default PhoneInfo;
