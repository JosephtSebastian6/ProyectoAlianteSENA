// src/components/AboutUs.jsx
import React from 'react';

function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Nuestra Historia en ALIANTE 
        </h1>

        {/* Sección de Quiénes Somos / Nuestra Pasión */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-indigo-500 pb-2">
            Pasión Familiar por la Excelencia Automotriz
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Somos aliante, una microempresa familiar nacida del amor y la dedicación por los automóviles de lujo. Desde hace 5 años, nuestra familia ha compartido una profunda pasión por la ingeniería, el diseño y la exclusividad que solo los vehículos de alta gama pueden ofrecer. No somos solo vendedores; somos entusiastas, conocedores y, sobre todo, una familia que entiende el verdadero valor de un automóvil excepcional.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Nuestro compromiso es simple: ofrecer a nuestros clientes una selección inigualable de vehículos de lujo y una experiencia de compra tan exclusiva y personalizada como el propio coche que buscan.
          </p>
        </section>

        {/* Sección de Nuestra Historia / Orígenes */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2">
            Un Legado de Calidad y Confianza
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nuestra historia comenzó en 2020 con , quien, con una visión clara y un taller modesto, empezó a importar y restaurar vehículos clásicos y de lujo. Lo que inició como un pasatiempo se convirtió rápidamente en un negocio próspero, impulsado por la calidad de nuestro servicio y la confianza de nuestros clientes.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Hoy, Aliante es el resultado de años de experiencia, conocimiento transmitido de padres a hijos, y un compromiso inquebrantable con la satisfacción del cliente. Cada vehículo que llega a nuestro inventario es cuidadosamente inspeccionado y seleccionado, garantizando que cumple con los más altos estándares de lujo y rendimiento.
          </p>
        </section>

        {/* Sección de Nuestros Valores */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
            Nuestros Valores Fundamentales
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li><span className="font-medium text-indigo-600">Integridad:</span> Operamos con la máxima honestidad y transparencia en cada transacción.</li>
            <li><span className="font-medium text-indigo-600">Calidad:</span> Solo ofrecemos vehículos que cumplen con nuestros estrictos estándares de lujo y excelencia.</li>
            <li><span className="font-medium text-indigo-600">Pasión:</span> Nuestro amor por los automóviles es el motor de todo lo que hacemos.</li>
            <li><span className="font-medium text-indigo-600">Servicio Personalizado:</span> Cada cliente es único, y su experiencia de compra también debe serlo.</li>
            <li><span className="font-medium text-indigo-600">Legado Familiar:</span> Construimos sobre una base de confianza y experiencia transmitida a través de generaciones.</li>
          </ul>
        </section>

        {/* Sección de Equipo (Opcional - si quieres presentar a los miembros de la familia) */}
        {/*
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-red-500 pb-2">
            Conoce a la Familia [Tu Apellido/Nombre de la Empresa]
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="/assets/owner1.jpg" alt="Nombre del Miembro 1" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold text-gray-900">Juan Pérez</h3>
              <p className="text-indigo-600 text-sm">Fundador y Visionario</p>
              <p className="text-gray-600 text-sm mt-2">Con décadas de experiencia en el sector automotriz de lujo.</p>
            </div>
            <div className="text-center">
              <img src="/assets/owner2.jpg" alt="Nombre del Miembro 2" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold text-gray-900">María Pérez</h3>
              <p className="text-teal-600 text-sm">Directora de Ventas y Atención al Cliente</p>
              <p className="text-gray-600 text-sm mt-2">Asegura que cada cliente reciba una atención impecable.</p>
            </div>
            <div className="text-center">
              <img src="/assets/owner3.jpg" alt="Nombre del Miembro 3" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold text-gray-900">Carlos Pérez</h3>
              <p className="text-purple-600 text-sm">Especialista en Adquisiciones y Peritaje</p>
              <p className="text-gray-600 text-sm mt-2">Experto en identificar los vehículos más exclusivos del mercado.</p>
            </div>
          </div>
        </section>
        */}

        {/* Sección de Contacto */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-500 pb-2">
            Visítanos o Contáctanos
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Estamos ubicados en 
            Ven y descubre nuestra exclusiva colección o contáctanos para una consulta personalizada.
          </p>
          <a
            href="mailto:ventas@tudominio.com"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Envíanos un Correo
          </a>
          <p className="text-gray-700 mt-4">
            También puedes llamarnos al 3197642257 - 3222791021 .
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;