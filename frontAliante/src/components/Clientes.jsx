import React, { useState, useEffect } from 'react';

// URL base de tu backend 
const API_BASE_URL = 'http://127.0.0.1:8000/clientesGet/';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({ // Un solo estado para los datos del formulario
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: ''
  });
  const [loading, setLoading] = useState(true); // Estado para mostrar indicador de carga
  const [error, setError] = useState(null);     // Estado para manejar errores de API

  // Función genérica para manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Función para obtener clientes
  const fetchClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}`);
      if (!res.ok) { // Si la respuesta no es 2xx
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      // Simplificamos la lógica de verificación:
      if (Array.isArray(data)) {
        setClientes(data);
      } else if (data && Array.isArray(data.clientes)) {
        setClientes(data.clientes);
      } else {
        console.warn("Respuesta inesperada del backend, no es un array de clientes:", data);
        setClientes([]); // Asegurarse de que sea un array vacío para evitar errores de map
      }
    } catch (err) {
      console.error("Error al obtener clientes:", err);
      setError("No se pudieron cargar los clientes. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar clientes al montar el componente
  useEffect(() => {
    fetchClientes();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // Función para crear un cliente
  const crearCliente = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/clientesPost/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) // Envía el estado del formulario
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setClientes(prevClientes => [...prevClientes, data]); // Añade el nuevo cliente a la lista
      setFormData({ // Limpia el formulario
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        direccion: ''
      });
    } catch (err) {
      console.error("Error al crear cliente:", err);
      setError("No se pudo crear el cliente. Verifica los datos.");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Gestión de Clientes</h2>

      {/* Formulario para crear clientes */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Crear Nuevo Cliente</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            type="text" // Asegúrate de que el tipo sea correcto
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="email" // Tipo email para validación básica
            name="correo"
            placeholder="Correo"
            value={formData.correo}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="tel" // Tipo tel para teléfonos
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={crearCliente}
            className="bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 transition duration-200 col-span-full sm:col-span-1"
          >
            Crear Cliente
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Muestra errores del formulario/API */}
      </div>

      {/* Lista de clientes */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Listado de Clientes</h3>
      {loading ? (
        <p className="text-center text-gray-600">Cargando clientes...</p>
      ) : clientes.length === 0 ? (
        <p className="text-center text-gray-600">No hay clientes registrados.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientes.map(cliente => (
                <tr key={cliente.id || cliente.correo}> {/* Usar ID si existe, sino correo como fallback para key */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.apellido}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.correo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.direccion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}