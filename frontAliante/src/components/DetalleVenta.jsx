import React, { useState, useEffect } from 'react';


const API_BASE_URL_GET_DETALLES = 'http://127.0.0.1:8000/DetalleVentasGet/';
const API_BASE_URL_POST_DETALLES = 'http://127.00.1:8000/DetalleVentaPost/';

export default function DetalleVenta() {
  const [detalles, setDetalles] = useState([]);
  const [ventaIdParaConsulta, setVentaIdParaConsulta] = useState(); // Estado para el ID de venta a consultar
  const [formData, setFormData] = useState({
    cantidad: '', // Cambiamos a string para manejar el input, se parseará a number en el envío
    precio_unitario: '',
    subtotal: '',
    producto_id: '', // Este irá como query parameter
    venta_id: '' // Este también irá como query parameter para POST
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Función para manejar el cambio en el input de Venta ID para la consulta GET
  const handleVentaIdChange = (e) => {
    setVentaIdParaConsulta(e.target.value);
  };

  const fetchDetalles = async () => {
    // Asegúrate de que ventaIdParaConsulta sea un número válido
    if (!ventaIdParaConsulta || isNaN(ventaIdParaConsulta)) {
      setError("Por favor, introduce un ID de Venta válido para consultar.");
      setDetalles([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL_GET_DETALLES}${ventaIdParaConsulta}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`HTTP error! status: ${res.status} - ${errorData.detail || 'Error desconocido'}`);
      }
      const data = await res.json();
      setDetalles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener detalles:", err);
      setError(`No se pudieron cargar los detalles de venta. ${err.message || 'Inténtalo de nuevo más tarde.'}`);
    } finally {
      setLoading(false);
    }
  };

  const crearDetalle = async () => {
    setError(null); // Resetea el error antes de cada intento de creación

    // Validación básica de campos requeridos para la creación
    if (!formData.producto_id || !formData.venta_id || !formData.cantidad || !formData.precio_unitario || !formData.subtotal) {
      setError("Todos los campos (Producto ID, Venta ID, Cantidad, Precio Unitario, Subtotal) son obligatorios.");
      return;
    }
    // Asegurarse de que los IDs y cantidades/precios sean números
    const parsedData = {
      cantidad: parseInt(formData.cantidad, 10),
      precio_unitario: parseInt(formData.precio_unitario, 10), // Asumiendo que es int por tu esquema, si fuera float, usar parseFloat
      subtotal: parseInt(formData.subtotal, 10), // Asumiendo que es int
    };
    const productoId = parseInt(formData.producto_id, 10);
    const ventaId = parseInt(formData.venta_id, 10);

    if (isNaN(productoId) || isNaN(ventaId) || isNaN(parsedData.cantidad) || isNaN(parsedData.precio_unitario) || isNaN(parsedData.subtotal)) {
      setError("Los campos Producto ID, Venta ID, Cantidad, Precio Unitario y Subtotal deben ser números válidos.");
      return;
    }

    try {
      // Envía producto_id y venta_id como query parameters
      const res = await fetch(`${API_BASE_URL_POST_DETALLES}?venta_id=${ventaId}&producto_id=${productoId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData) // Solo el cuerpo con los campos de DetalleVentaCreate
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`HTTP error! status: ${res.status} - ${errorData.detail || JSON.stringify(errorData)}`);
      }
      const newDetalle = await res.json();
      setDetalles(prev => [...prev, newDetalle]); // Añade el nuevo detalle a la lista
      setFormData({ cantidad: '', precio_unitario: '', subtotal: '', producto_id: '', venta_id: '' }); // Limpia el formulario
      // Opcional: Refrescar la lista completa después de crear para asegurar consistencia
      // fetchDetalles();
    } catch (err) {
      console.error("Error al crear detalle:", err);
      setError(`No se pudo crear el detalle. ${err.message || 'Verifica los datos.'}`);
    }
  };

  useEffect(() => {
    fetchDetalles();
  }, [ventaIdParaConsulta]); // Se re-ejecuta cuando cambia el ID de venta para consulta

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Gestión de Detalles de Ventas</h2>

      {/* Formulario para crear detalles de venta */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Crear Nuevo Detalle de Venta</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            type="number"
            name="venta_id"
            value={formData.venta_id}
            onChange={handleInputChange}
            placeholder="ID de Venta"
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            name="producto_id"
            value={formData.producto_id}
            onChange={handleInputChange}
            placeholder="ID de Producto"
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleInputChange}
            placeholder="Cantidad"
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            name="precio_unitario"
            value={formData.precio_unitario}
            onChange={handleInputChange}
            placeholder="Precio Unitario"
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            name="subtotal"
            value={formData.subtotal}
            onChange={handleInputChange}
            placeholder="Subtotal"
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={crearDetalle}
            className="bg-green-600 text-white rounded-md px-6 py-2 hover:bg-green-700 transition duration-200 col-span-full sm:col-span-1"
          >
            Crear Detalle
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Sección para consultar detalles de una venta específica */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Consultar Detalles por ID de Venta</h3>
        <div className="flex gap-4 mb-4">
          <input
            type="number"
            value={ventaIdParaConsulta}
            onChange={handleVentaIdChange}
            placeholder="ID de Venta para consulta"
            className="border border-gray-300 rounded-md px-4 py-2 flex-grow focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={fetchDetalles}
            className="bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 transition duration-200"
          >
            Buscar Detalles
          </button>
        </div>
      </div>

      {/* Lista de detalles de venta */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Listado de Detalles de Venta (Venta ID: {ventaIdParaConsulta})</h3>
      {loading ? (
        <p className="text-center text-gray-600">Cargando detalles...</p>
      ) : detalles.length === 0 ? (
        <p className="text-center text-gray-600">No hay detalles de venta registrados para el ID de venta {ventaIdParaConsulta}.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalle ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venta ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unitario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {detalles.map((detalle) => (
                <tr key={detalle.detalle_id}> {/* Usa detalle_id como key */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detalle.detalle_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detalle.venta_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detalle.producto_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detalle.cantidad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${detalle.precio_unitario}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${detalle.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}