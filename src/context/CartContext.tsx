import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  cartTotal: number;
  cartItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, color: string) => void;
  updateQuantity: (idx: number, quantity: number) => void;
  removeItem: (idx: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('teecode_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse teecode cart from local storage', e);
    }
  }, []);

  // Save cart to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('teecode_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save teecode cart', e);
    }
  }, [cart]);

  const addToCart = (product: Product, size: string, color: string) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx] = {
          ...newCart[existingIdx],
          quantity: newCart[existingIdx].quantity + 1,
        };
        return newCart;
      } else {
        return [...prevCart, { product, selectedSize: size, selectedColor: color, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (idx: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[idx] = { ...newCart[idx], quantity };
      return newCart;
    });
  };

  const removeItem = (idx: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== idx));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        cartItemsCount,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
