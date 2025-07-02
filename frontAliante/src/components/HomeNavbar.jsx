// src/components/HomeNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from './AuthContext'; 
function HomeNavbar() {
  const { isAuthenticated, logout } = useAuth(); // <-- Obtén isAuthenticated y logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">

        <Link to="/" className="text-white text-2xl font-bold hover:text-gray-300 transition duration-300">
          ALIANTE
        </Link>

        {/* Botones de acción (Iniciar Sesión / Cerrar Sesión / De Nosotros) */}
        <div className="flex space-x-4">
          {!isAuthenticated ? ( // <-- Si NO está autenticado
            <>
              <Link
                to="/login"
                className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700 transition duration-300"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/about-us"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md text-sm transition duration-300"
              >
                De Nosotros
              </Link>
            </>
          ) : ( // <-- Si SÍ está autenticado
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-sm transition duration-300"
              >
                Cerrar Sesión
              </button>
              <Link
                to="/about-us" // Puedes mantener el botón "De Nosotros" siempre visible
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md text-sm transition duration-300"
              >
                De Nosotros
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default HomeNavbar;