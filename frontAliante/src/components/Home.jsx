import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Importa tus imágenes de logo de marca reales aquí.
import brandLogoA from '../assets/Marca A.png'; //
import brandLogoB from '../assets/Marca B.png'; //
import brandLogoC from '../assets/Marca c.png'; //
import brandLogoD from '../assets/Marca D.png'; //
import brandLogoE from '../assets/Marca E.png'; //
import brandLogoF from '../assets/Marca F.png'; //
import brandLogoG from '../assets/Marca G.png'; //

// Importaciones de otras imágenes. ¡Asegúrate de que estas rutas sean correctas!
import brandImage from '../assets/logo.png'; // // RUTA CORREGIDA
import imagen5 from '../assets/imagen5.jpg'; //
import imagen4 from '../assets/imagen 4.jpg'; //
import imagen3 from '../assets/imagen3.jpg'; //
import camion2 from '../assets/camion 2.jpg'; //
import camiones from '../assets/camiones.jpg'; //


function Home() {
  // Array con los logos de marca
  const brandLogos = [
    { id: 1, name: 'Skoda', src: brandLogoA }, //
    { id: 2, name: 'Ford', src: brandLogoB }, //
    { id: 3, name: 'BMW', src: brandLogoC }, //
    { id: 4, name: 'Volkswagen', src: brandLogoD }, //
    { id: 5, name: 'Mercedes-Benz', src: brandLogoE }, //
    { id: 6, name: 'Volvo', src: brandLogoF }, //
    { id: 7, name: 'Chevrolet', src: brandLogoG }, //
  ];

  // Array con las imágenes de la galería de productos. ¡AÑADIDA PROPIEDAD 'name'!
  const productImages = [
    { id: 1, src: camion2, alt: 'Camión de lujo con detalles rojos y blancos', name: 'Espejo Cromado' }, //
    { id: 2, src: camiones, alt: 'Camión de lujo con iluminación LED roja nocturna', name: 'Faros LED' }, //
    { id: 3, src: imagen5, alt: 'Parachoques trasero de camión cromado con luces LED', name: 'Parachoques Reforzado' }, //
    { id: 4, src: imagen4, alt: 'Accesorios cromados para vehículos en taller', name: 'Sistema de Frenos' }, //
    { id: 5, src: imagen3, alt: 'Piezas cilíndricas de acero inoxidable en taller', name: 'Cilindros de Acero' }, //
  ];

  return (
    // Se cambió p-8 a px-0 para eliminar el padding horizontal del div más externo
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 to-white text-gray-800 flex flex-col items-center px-0 overflow-hidden">
      {/* Superposición de fondo sutil */}
      <div className="absolute inset-0 bg-pattern-lines opacity-5 z-0"></div>

      {/* Sección principal de bienvenida y logo */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        // Se eliminó max-w-4xl y mx-auto. Se agregó px-8 para padding interno.
        className="z-10 text-center w-full px-8 my-12 md:my-16"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-indigo-700 leading-tight mb-4 drop-shadow-md">
          ¡Bienvenido a <span className="text-indigo-500">ALIANTE</span>!
        </h2>
        {/* Se cambió max-w-2xl a w-full y se agregó px-4 para padding interno. */}
        <p className="text-xl md:text-2xl text-gray-700 font-light mb-8 w-full px-4">
          Tu plataforma de gestión de pedidos: rápida, eficaz y diseñada para la exclusividad.
        </p>
        <motion.img
          src={brandImage}
          alt="Logo de la marca Aliante"
          className="mx-auto h-56 md:h-72 w-auto rounded-xl shadow-xl border border-gray-300 transform hover:scale-105 transition-transform duration-500 ease-in-out"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <p className="mt-10 text-lg text-gray-600">
          Usa la barra de navegación para explorar nuestras colecciones y servicios exclusivos.
        </p>
      </motion.div>

      {/* Sección de Galería de Productos (AHORA CON RECUADROS Y NOMBRES) */}
      {/* Se eliminó max-w-7xl y mx-auto, se agregó px-4 para padding interno */}
      <div className="w-full mt-20 mb-16 px-4">
        <h3 className="text-4xl font-bold text-center text-gray-900 mb-12 drop-shadow-sm">
          Nuestra <span className="text-purple-600">Galería de Lujo</span>
        </h3>
        {/* Se agregó un contenedor con max-w para controlar el ancho máximo de la cuadrícula para una mejor legibilidad, manteniendo la sección a todo el ancho */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mx-auto max-w-7xl">
          {productImages.map((image, index) => (
            <motion.div
              key={image.id}
              // Clases para el recuadro general: fondo blanco, bordes, sombra, redondeo
              className="relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden group transform hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover rounded-t-lg" // Solo bordes superiores redondeados de la imagen
              />
              {/* Contenedor para el nombre del producto */}
              <div className="p-4 flex flex-col items-center"> {/* Padding y centrado */}
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{image.name}</h4> {/* Muestra el nombre */}
                {/* Puedes añadir una descripción más detallada si la incluyes en productImages */}
                {/* <p className="text-gray-600 text-center text-sm">{image.description}</p> */}
              </div>

              {/* Este div es el overlay que oscurece la imagen y muestra el 'alt' al hacer hover */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold text-center px-4">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sección de Marcas (CARRUSEL SIN FLECHAS) */}
      {/* Se eliminó max-w-6xl y mx-auto, se agregó px-4 para padding interno */}
      <div className="w-full mt-20 mb-16 px-4 relative">
        <h3 className="text-4xl font-bold text-center text-gray-900 mb-12 drop-shadow-sm">
          Nuestras <span className="text-blue-600">Marcas</span>
        </h3>

        {/* Contenedor del carrusel deslizable - el scrollbar-hide puede ser necesario dependiendo de Tailwind */}
        {/* Se agregó un contenedor con max-w para controlar el ancho máximo del carrusel para una mejor legibilidad */}
        <div
          className="flex overflow-x-auto scrollbar-hide space-x-6 p-4 rounded-lg bg-gray-50 border border-gray-200 justify-center mx-auto max-w-6xl"
        >
          {brandLogos.map((logo, index) => (
            <motion.div
              key={logo.id}
              className="flex-shrink-0 p-4 bg-white rounded-lg shadow-md flex items-center justify-center h-28 w-36 md:h-32 md:w-40 transform hover:scale-110 transition-transform duration-300 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sección de Información Rápida (con Quiénes Somos como enlace) */}
      {/* Se eliminó max-w-6xl y mx-auto, se agregó px-4 para padding interno */}
      <div className="w-full mt-16 mb-20 px-4">
        <h3 className="text-4xl font-bold text-center text-gray-900 mb-12 drop-shadow-sm">
          ¿Necesitas <span className="text-green-600">Ayuda</span>?
        </h3>
        {/* Se agregó un contenedor con max-w para controlar el ancho máximo de la cuadrícula para una mejor legibilidad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/about-us" // RUTA CORREGIDA según tu App.jsx
              className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 h-full justify-between group"
            >
              <div className="bg-indigo-100 p-4 rounded-full mb-4 text-indigo-600 group-hover:bg-indigo-200 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-5m-5 0h5m-5 0a5 5 0 0110 0M12 15V3m0 0a3 3 0 013 3M12 3a3 3 0 00-3 3m-3 9h10a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-2xl font-semibold mb-2 text-gray-900 group-hover:text-indigo-700 transition-colors duration-300">¿Quiénes Somos?</h4>
              <p className="text-gray-600 text-center flex-grow">Conoce nuestra misión, visión y valores.</p>
            </Link>
          </motion.div>

          {/* Tarjeta de Contáctanos (puedes añadirle Link si lo deseas) */}
          <motion.div
            className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-green-100 p-4 rounded-full mb-4 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
              </svg>
            </div>
            <h4 className="text-2xl font-semibold mb-2 text-gray-900">Contáctanos</h4>
            <p className="text-gray-600 text-center">Estamos aquí para ayudarte. Llámanos o escríbenos.</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-red-100 p-4 rounded-full mb-4 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.893 5.262a2 2 0 002.214 0L21 8m-2 6V7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2z" />
              </svg>
            </div>
            <h4 className="text-2xl font-semibold mb-2 text-gray-900">Envíanos un Email</h4>
            <p className="text-gray-600 text-center">Te responderemos a la brevedad posible.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;