// src/context/CartContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error("Error al cargar carrito desde localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error al guardar carrito en localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // CAMBIO CLAVE: Usa product.producto_id para buscar y añadir, ya que es el ID único del backend
      const existingItem = prevItems.find(item => item.id === product.producto_id); 
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.producto_id // También aquí usamos product.producto_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { 
            id: product.producto_id, // Guarda el id del backend como 'id' en el carrito
            name: product.nombre, 
            price: product.precio, 
            quantity: 1, 
            imageUrl: product.imageUrl 
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price); 
      const quantity = item.quantity;
      return total + (isNaN(price) ? 0 : (price * quantity)); 
    }, 0).toFixed(2);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
