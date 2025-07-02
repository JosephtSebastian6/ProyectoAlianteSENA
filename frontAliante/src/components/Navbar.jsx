import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

// Importa el icono de carrito de compras de Font Awesome (FaShoppingCart)
import { FaShoppingCart } from 'react-icons/fa'; 

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">

        <Link to="/home" className="text-white text-2xl font-bold hover:text-gray-300 transition duration-300">
          ALIANTE
        </Link>

        <ul className="flex space-x-6 items-center">
          <li><Link to="/home" className="text-gray-300 hover:text-white transition duration-300">Inicio</Link></li>
          <li><Link to="/productos" className="text-gray-300 hover:text-white transition duration-300">Productos</Link></li>
          <li><Link to="/clientes" className="text-gray-300 hover:text-white transition duration-300">Clientes</Link></li>
          <li><Link to="/ventas" className="text-gray-300 hover:text-white transition duration-300">Ventas</Link></li>
          <li><Link to="/detalle-ventas" className="text-gray-300 hover:text-white transition duration-300">Detalle de venta</Link></li>
          
          {/* ENLACE AL CARRITO CON ICONO Y CONTADOR */}
          <li>
            <Link to="/carrito" className="text-gray-300 hover:text-white transition duration-300 flex items-center">
              <FaShoppingCart className="mr-1 text-lg" /> {/* Aquí se usa el icono */}
              Carrito 
              {cartItems.length > 0 && (
                <span className="ml-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </li>

          {/* BOTÓN DE CERRAR SESIÓN */}
          {isAuthenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Cerrar Sesión
              </button>
            </li>
          )}
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;