import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../constants';

interface CartItem extends MenuItem {
  quantity: number;
  customization?: {
    spiciness?: string;
    onion?: boolean;
    cheese?: boolean;
    sugar?: string;
    notes?: string;
  };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, customization?: CartItem['customization']) => void;
  removeFromCart: (itemId: string, customization?: CartItem['customization']) => void;
  updateQuantity: (itemId: string, delta: number, customization?: CartItem['customization']) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const getUniqueId = (itemId: string, customization?: CartItem['customization']) => {
    if (!customization) return itemId;
    return `${itemId}-${JSON.stringify(customization)}`;
  };

  const addToCart = (item: MenuItem, customization?: CartItem['customization']) => {
    setItems((prev) => {
      const uniqueId = getUniqueId(item.id, customization);
      const existingKey = prev.findIndex((i) => getUniqueId(i.id, i.customization) === uniqueId);
      
      if (existingKey > -1) {
        return prev.map((i, idx) => (idx === existingKey ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1, customization }];
    });
  };

  const removeFromCart = (itemId: string, customization?: CartItem['customization']) => {
    const uniqueId = getUniqueId(itemId, customization);
    setItems((prev) => prev.filter((i) => getUniqueId(i.id, i.customization) !== uniqueId));
  };

  const updateQuantity = (itemId: string, delta: number, customization?: CartItem['customization']) => {
    const uniqueId = getUniqueId(itemId, customization);
    setItems((prev) =>
      prev.map((i) => {
        if (getUniqueId(i.id, i.customization) === uniqueId) {
          const newQty = Math.max(0, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      }).filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
