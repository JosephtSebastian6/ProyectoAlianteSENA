// src/components/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Importa tu imagen aquí. Asegúrate de que la ruta sea correcta.
import trabajadoresImg from '../assets/trabajadores.jpg'; // O la ruta correcta a tu imagen

function Landing() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Superposición de fondo para textura/patrón sutil */}
      <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>

      {/* Contenido principal con animaciones */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center justify-center text-center" // Añadimos text-center
      >
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight drop-shadow-lg">
          Bienvenido a <span className="text-indigo-400">ALIANTE</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 font-light max-w-2xl">
          Donde la elegancia se encuentra con la exclusividad. Tu pasión por el lujo empieza aquí.
        </p>
        <Link
          to="/home"
          className="relative inline-flex items-center justify-center p-0.5 mb-8 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-7 py-3 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0 text-lg font-semibold">
            Entrar al sitio
          </span>
        </Link>
      </motion.div>

      {/* Imagen de trabajadores con animación y estilo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }} // Aparece un poco después del texto
        className="z-10 mt-12 w-full max-w-2xl md:max-w-4xl" // Controla el ancho de la imagen
      >
        <img
          src={trabajadoresImg}
          alt="Equipo de trabajadores de Aliante"
          className="rounded-xl shadow-2xl border border-gray-700 mx-auto transform hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </motion.div>

      {/* Opcional: Animación sutil para un elemento visual de fondo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 right-10 text-9xl text-gray-700 opacity-10 rotate-12 -z-0"
      >
        &#9813; {/* Un rey de ajedrez, o puedes cambiarlo por un ícono */}
      </motion.div>
    </div>
  );
}

export default Landing;