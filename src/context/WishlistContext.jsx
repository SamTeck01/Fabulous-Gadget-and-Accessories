import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) return state;
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'TOGGLE_ITEM': {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }

    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };

    case 'SET_WISHLIST':
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      dispatch({ type: 'SET_WISHLIST', payload: JSON.parse(savedWishlist) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const value = {
    wishlistItems: state.items,
    addToWishlist: (product) => dispatch({ type: 'ADD_ITEM', payload: product }),
    removeFromWishlist: (productId) => dispatch({ type: 'REMOVE_ITEM', payload: productId }),
    toggleWishlist: (product) => dispatch({ type: 'TOGGLE_ITEM', payload: product }),
    isInWishlist: (productId) => state.items.some(item => item.id === productId),
    clearWishlist: () => dispatch({ type: 'CLEAR_WISHLIST' })
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
