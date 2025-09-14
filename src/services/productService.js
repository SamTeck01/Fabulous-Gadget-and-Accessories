import apiService from './api';

class ProductService {
  async getAllProducts(params = {}) {
    try {
      const response = await apiService.getProducts(params);
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to local data if API fails
      return this.getLocalProducts(params);
    }
  }

  async getProductById(id) {
    try {
      return await apiService.getProduct(id);
    } catch (error) {
      console.error('Error fetching product:', error);
      // Fallback to local data
      return this.getLocalProductById(id);
    }
  }

  async searchProducts(query, filters = {}) {
    try {
      const params = {
        search: query,
        ...filters,
        page: 1,
        limit: 50
      };
      return await apiService.getProducts(params);
    } catch (error) {
      console.error('Error searching products:', error);
      return this.searchLocalProducts(query, filters);
    }
  }

  // Fallback methods using local data
  getLocalProducts(params = {}) {
    // Import local data functions
    const { getFeaturedProducts } = require('../data/phones');
    const { getAllLaptopProducts } = require('../data/laptops');
    
    const phoneProducts = getFeaturedProducts().map(p => ({ ...p, type: 'phone', category: 'phone' }));
    const laptopProducts = getAllLaptopProducts().map(p => ({ ...p, type: 'laptop', category: 'laptop' }));
    
    let allProducts = [...phoneProducts, ...laptopProducts];

    // Apply filters
    if (params.category) {
      allProducts = allProducts.filter(p => p.category === params.category);
    }
    if (params.brand) {
      allProducts = allProducts.filter(p => p.brand === params.brand);
    }
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      allProducts = allProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.detailedName.toLowerCase().includes(searchTerm)
      );
    }

    // Pagination
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = allProducts.slice(startIndex, endIndex);

    return {
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(allProducts.length / limit),
        totalProducts: allProducts.length
      }
    };
  }

  getLocalProductById(id) {
    const { getFeaturedProducts } = require('../data/phones');
    const { getAllLaptopProducts } = require('../data/laptops');
    
    const phoneProducts = getFeaturedProducts();
    const laptopProducts = getAllLaptopProducts();
    
    const allProducts = [...phoneProducts, ...laptopProducts];
    return allProducts.find(p => p.id === id);
  }

  searchLocalProducts(query, filters = {}) {
    const { getFeaturedProducts } = require('../data/phones');
    const { getAllLaptopProducts } = require('../data/laptops');
    
    const phoneProducts = getFeaturedProducts().map(p => ({ ...p, type: 'phone', category: 'phone' }));
    const laptopProducts = getAllLaptopProducts().map(p => ({ ...p, type: 'laptop', category: 'laptop' }));
    
    let allProducts = [...phoneProducts, ...laptopProducts];

    // Apply search
    const searchTerm = query.toLowerCase();
    allProducts = allProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.detailedName.toLowerCase().includes(searchTerm)
    );

    // Apply filters
    if (filters.category) {
      allProducts = allProducts.filter(p => p.category === filters.category);
    }
    if (filters.brand) {
      allProducts = allProducts.filter(p => p.brand === filters.brand);
    }

    return {
      products: allProducts,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalProducts: allProducts.length
      }
    };
  }

  // Admin methods
  async createProduct(productData) {
    try {
      return await apiService.createProduct(productData);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(id, productData) {
    try {
      return await apiService.updateProduct(id, productData);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      return await apiService.deleteProduct(id);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}

export default new ProductService();
