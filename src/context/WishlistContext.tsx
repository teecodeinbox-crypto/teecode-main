import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface WishlistContextType {
  wishlist: Product[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('teecode_wishlist');
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse teecode wishlist from local storage', e);
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('teecode_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save teecode wishlist', e);
    }
  }, [wishlist]);

  const isWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isWishlisted, toggleWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
