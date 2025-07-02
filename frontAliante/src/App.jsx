import React from 'react';

// Importa herramientas de React Router
import { Routes, Route, useLocation } from 'react-router-dom';

// Importa los estilos globales
import './App.css';

// Importa los componentes de tu aplicación
import Navbar from './components/Navbar';
import HomeNavbar from './components/HomeNavbar';
import Clientes from './components/Clientes';
import Productos from './components/Productos'; // <--- Este componente está ahora en otro archivo
import TabVentas from './components/TabVentas';
import DetalleVenta from './components/DetalleVenta';
import AboutUs from './components/AboutUs';
import Home from './components/Home';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';

// Importa el contexto de autenticación
import { AuthProvider, useAuth } from './components/AuthContext';

// Importa el contexto del carrito (¡CORRECCIÓN DE RUTA si estaba mal!)
// Asumo que CartContext.jsx está en src/components/CartContext.jsx
import { CartProvider } from './components/CartContext';

// Importa el componente del Carrit
// Asumo que Cart.jsx está en src/pages/Cart.jsx
import Cart from "./components/Cart";

// Componente principal de tu aplicación
function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Determina si mostrar HomeNavbar o Navbar
  const showHomeNavbar = ['/', '/login', '/about-us'].includes(location.pathname) || !isAuthenticated;
  const showMainNavbar = isAuthenticated && !['/', '/login'].includes(location.pathname);

  return (
    <>
      {showHomeNavbar && <HomeNavbar />}
      {showMainNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/productos" element={<Productos />} /> {/* Aquí usas el componente Productos */}
        <Route path="/detalle-ventas" element={<DetalleVenta />} />
        <Route path="/ventas" element={<TabVentas />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider> {/* Envuelve toda la aplicación con el AuthProvider */}
      <CartProvider> {/* Envuelve AppContent con CartProvider para que el carrito esté disponible */}
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;