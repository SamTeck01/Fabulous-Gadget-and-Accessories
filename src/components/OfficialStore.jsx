import React from 'react';

function OfficialStore({ categories, onCategoryClick }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Official Store</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map(({ id, img, name }) => (
          <div
            key={id}
            className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
            onClick={() => onCategoryClick(id)}
          >
            <img
              src={img}
              alt={name}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
            <p className="text-center mt-2 font-semibold text-yellow-600">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OfficialStore;
