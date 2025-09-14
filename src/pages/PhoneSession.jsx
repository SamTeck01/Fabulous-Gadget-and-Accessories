import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../components/deals/ProductCard';
import { getBrandById } from '../data/phones';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function PhoneSession() {
  const { brand } = useParams();
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from API:
        // const data = await fetchBrandProducts(brand);
        const data = getBrandById(brand);
        if (!data) throw new Error('Brand not found');
        setBrandData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [brand]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!brandData) return <div className="text-center py-10">Brand not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <img 
          src={brandData.logo} 
          alt={brandData.name} 
          className="h-16 mr-4"
        />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {brandData.name} Phones
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brandData.products.map(product => (
          <ProductCard 
            key={product.id} 
            product={{...product, brand: brand}} 
            type="phone"
          />
        ))}
      </div>
    </div>
  );
}