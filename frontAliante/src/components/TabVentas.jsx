import React, { useEffect, useState } from 'react';

// URL base para obtener y publicar ventas
const API_VENTAS_GET_URL = 'http://127.0.0.1:8000/ventasGet/';
const API_VENTAS_POST_URL = 'http://127.0.0.1:8000/ventasPost/'; // Asumo que tienes una URL para crear ventas

const TabVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [formData, setFormData] = useState({ // Nuevo estado para los datos del formulario de ventas
    cliente_id: '',
    fecha: '', // Podrías autogenerar esto en el backend o usar un selector de fecha
    total: '',
    // Agrega aquí cualquier otro campo que necesites para crear una venta
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función genérica para manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Función para obtener ventas
  const fetchVentas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_VENTAS_GET_URL);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setVentas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error al obtener ventas:', err);
      setError('No se pudieron cargar las ventas. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una venta
  const crearVenta = async () => {
    setError(null); // Resetea el error antes de cada intento de creación
    try {
      const res = await fetch(API_VENTAS_POST_URL+`?cliente_id=${formData.cliente_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) // Envía el estado del formulario
      });

      if (!res.ok) {
        const errorData = await res.json(); // Intenta leer el mensaje de error del backend
        throw new Error(`Error HTTP: ${res.status} - ${errorData.detail || JSON.stringify(errorData)}`);
      }
      const newVenta = await res.json();
      setVentas(prevVentas => [...prevVentas, newVenta]); // Añade la nueva venta a la lista
      setFormData({ // Limpia el formulario
        cliente_id: '',
        fecha: '',
        total: '',
      });
    } catch (err) {
      console.error("Error al crear venta:", err);
      setError(`No se pudo crear la venta. ${err.message || 'Verifica los datos.'}`);
    }
  };

  // Cargar ventas al montar el componente
  useEffect(() => {
    fetchVentas();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Gestión de Ventas</h2>

      {/* Formulario para crear ventas */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Crear Nueva Venta</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            type="number" // Asumo que cliente_id es un número
            name="cliente_id"
            placeholder="ID del Cliente"
            value={formData.cliente_id}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="date" // Selector de fecha
            name="fecha"
            placeholder="Fecha (YYYY-MM-DD)"
            value={formData.fecha}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number" // Asumo que total es un número
            name="total"
            placeholder="Total de la Venta"
            value={formData.total}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Añade más inputs si tu modelo de Venta tiene más campos */}
          <button
            onClick={crearVenta}
            className="bg-green-600 text-white rounded-md px-6 py-2 hover:bg-green-700 transition duration-200 col-span-full sm:col-span-1"
          >
            Crear Venta
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Lista de ventas */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Listado de Ventas</h3>
      {loading ? (
        <p className="text-center text-gray-600">Cargando ventas...</p>
      ) : ventas.length === 0 ? (
        <p className="text-center text-gray-600">No hay ventas registradas.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venta ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                {/* Agrega más encabezados si tu modelo de Venta tiene más campos */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ventas.map((venta) => (
                <tr key={venta.venta_id}> {/* Asegúrate de que 'venta_id' es el campo único */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.venta_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.cliente_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${venta.total}</td>
                  {/* Renderiza más datos si tu modelo de Venta tiene más campos */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TabVentas;