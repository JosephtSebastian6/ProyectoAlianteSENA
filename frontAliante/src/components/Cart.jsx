// src/pages/Cart.jsx

import React from 'react';
import { useCart } from '../components/CartContext'; // Corregida la ruta a 'context'
import { Link } from 'react-router-dom'; 

function Cart() {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart();

  return (
    <div className="container mx-auto p-4 md:p-8 mt-4"> 
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Tu Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-600">
          <p className="text-lg">Tu carrito está vacío. ¡Explora nuestros productos!</p>
          <Link to="/productos" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Ver Productos</Link>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4"> 
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center">
                  {item.imageUrl && ( 
                    <img
                      src={item.imageUrl}
                      alt={item.name || 'Producto'} 
                      className="w-16 h-16 object-cover rounded-md mr-4"
                      // CAMBIO CLAVE: Usar item.id (que ahora es producto_id) para generar un placeholder más único
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://via.placeholder.com/64?text=${item.id || Math.random()}`; }} 
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{item.name || 'Producto sin nombre'}</h2> 
                    <p className="text-gray-600">${parseFloat(item.price).toFixed(2)} x {item.quantity}</p> 
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t-2 border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              Total: ${getCartTotal()}
            </h3>
            <div className="space-x-4">
              <button
                onClick={clearCart}
                className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition duration-200"
              >
                Vaciar Carrito
              </button>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
