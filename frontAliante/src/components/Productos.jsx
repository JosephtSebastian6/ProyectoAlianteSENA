import React, { useState, useEffect } from 'react';
// import { useCart } from '../components/CartContext'; // Se ha comentado o eliminado ya que no se pudo resolver.

// URL base de tu backend (¡ajusta estas URLs si tus endpoints son diferentes!)
const API_BASE_URL = 'http://127.0.0.1:8000/aliante_producto/'; // Para GET all products
const API_CREATE_PRODUCT_URL = 'http://127.0.0.1:8000/aliante_crea_producto/'; // Para POST create product
const API_PRODUCT_DETAIL_URL = 'http://127.0.0.1:8000/aliante_eliminar/eliminar_producto/'; // Para PUT/DELETE por ID

export default function Productos() {
    // const { addToCart } = useCart(); // Se ha comentado o eliminado debido a la eliminación de CartContext.

    const [productos, setProductos] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [productToDeleteId, setProductToDeleteId] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // NUEVO: Estados para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8); // Número de productos por página

    // Maneja el cambio en los inputs del formulario de creación
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Maneja los cambios en el formulario de edición
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct(prev => ({ ...prev, [name]: value }));
    };

    // Maneja los cambios en el input de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Resetear a la primera página al buscar
    };

    // Función para obtener todos los productos de la API
    const fetchProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_BASE_URL);
            if (!res.ok) {
                throw new Error(`Error HTTP! estado: ${res.status}`);
            }
            const data = await res.json();

            if (Array.isArray(data)) {
                const productosConImagen = data.map(p => ({
                    ...p,
                    imageUrl: p.imagen || `https://placehold.co/150x150/e0e0e0/505050?text=No+Img`
                }));
                setProductos(productosConImagen);
            } else {
                console.warn("Respuesta inesperada del backend, no es un array de productos:", data);
                setProductos([]);
            }
        } catch (err) {
            console.error("Error al obtener productos:", err);
            setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar los productos al inicio
    useEffect(() => {
        fetchProductos();
    }, []);

    // Función para crear un nuevo producto
    const crearProducto = async () => {
        setError(null);
        if (!formData.nombre || !formData.precio || !formData.stock) {
            setError("Nombre, Precio y Stock son campos obligatorios.");
            return;
        }

        const nuevoProducto = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock, 10),
            imagen: formData.imagen || ''
        };

        try {
            const res = await fetch(API_CREATE_PRODUCT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProducto)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`Error HTTP! estado: ${res.status}, Mensaje: ${JSON.stringify(errorData)}`);
            }
            const data = await res.json();

            const addedProductWithImage = {
                ...data,
                imageUrl: data.imagen || `https://placehold.co/150x150/e0e0e0/505050?text=No+Img`
            };
            setProductos(prevProductos => [...prevProductos, addedProductWithImage]);
            setFormData({
                nombre: '',
                descripcion: '',
                precio: '',
                stock: '',
                imagen: ''
            }); // Limpiar formulario
            setShowCreateForm(false); // Ocultar el formulario después de crear
        } catch (err) {
            console.error("Error al crear producto:", err);
            setError("No se pudo crear el producto. " + err.message);
        }
    };

    // Función para cargar los datos de un producto en el formulario de edición
    const handleEdit = (producto) => {
        setEditingProduct({
            ...producto,
            precio: producto.precio.toString(), // Asegurarse de que precio y stock sean strings para los inputs
            stock: producto.stock.toString()
        });
        setShowCreateForm(false); // Asegurarse de que el formulario de creación esté oculto si se edita
        console.log("Cargando producto para editar:", producto.producto_id);
    };

    // Función para actualizar un producto existente
    const handleUpdateProduct = async () => {
        setError(null);
        if (!editingProduct || !editingProduct.nombre || !editingProduct.precio || !editingProduct.precio || !editingProduct.stock) {
            setError("Nombre, Precio y Stock son campos obligatorios para actualizar.");
            return;
        }

        try {
            const res = await fetch(`http://127.0.0.1:8000/aliante_editar/actualizar_producto/${editingProduct.producto_id}/`, {
                method: 'PUT', // Usamos PUT para actualizar
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: editingProduct.nombre,
                    descripcion: editingProduct.descripcion,
                    precio: parseFloat(editingProduct.precio),
                    stock: parseInt(editingProduct.stock, 10),
                    imagen: editingProduct.imagen // Si se actualiza la imagen
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`Error HTTP! estado: ${res.status}, Mensaje: ${JSON.stringify(errorData)}`);
            }
            const updatedProduct = await res.json();

            // Actualizar la lista de productos con el producto editado
            setProductos(prevProductos =>
                prevProductos.map(p =>
                    p.producto_id === updatedProduct.producto_id
                        ? { ...updatedProduct, imageUrl: updatedProduct.imagen || `https://placehold.co/150x150/e0e0e0/505050?text=No+Img` }
                        : p
                )
            );
            setEditingProduct(null); // Limpiar el estado de edición
            console.log("Producto actualizado:", updatedProduct);
        } catch (err) {
            console.error("Error al actualizar producto:", err);
            setError("No se pudo actualizar el producto. " + err.message);
        }
    };

    // Función que se llama al hacer clic en eliminar, para mostrar el modal de confirmación
    const handleDeleteClick = (productoId) => {
        setProductToDeleteId(productoId);
        setShowDeleteConfirm(true);
    };

    // Función para confirmar y ejecutar la eliminación
    const confirmDelete = async () => {
        setError(null);
        try {
            const res = await fetch(`${API_PRODUCT_DETAIL_URL}${productToDeleteId}/`, {
                method: 'DELETE', // Usamos DELETE para eliminar
            });

            if (!res.ok) {
                if (res.status !== 204) { // 204 No Content es un éxito sin cuerpo
                    const errorData = await res.json();
                    throw new Error(`Error HTTP! estado: ${res.status}, Mensaje: ${JSON.stringify(errorData)}`);
                }
            }

            // Filtrar el producto eliminado de la lista
            setProductos(prevProductos => prevProductos.filter(p => p.producto_id !== productToDeleteId));
            console.log("Producto eliminado con ID:", productToDeleteId);
            // Ocultar el modal y resetear el ID
            setShowDeleteConfirm(false);
            setProductToDeleteId(null);
        } catch (err) {
            console.error("Error al eliminar producto:", err);
            setError("No se pudo eliminar el producto. " + err.message);
            setShowDeleteConfirm(false); // Ocultar modal incluso con error
            setProductToDeleteId(null);
        }
    };

    // Función para cancelar la eliminación (ocultar el modal)
    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setProductToDeleteId(null);
    };

    // Lógica de filtrado
    const filteredProductos = productos.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Lógica de paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProductos.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProductos.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Función para SVG del carrito (reemplaza FaShoppingCart)
    const ShoppingCartIcon = () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.325 5.302a.997.997 0 00.285.507l.534.801C9.697 17.65 11.216 18 13 18h1a1 1 0 000-2h-1c-.72 0-1.41-.21-2-.6L9.81 13.91l-.922-3.689c-.066-.264-.17-.506-.309-.724l-1.01-1.516a1 1 0 00-.07-.07 1 1 0 00-.707-.293H3a1 1 0 000 2h.22L4.697 10H10a1 1 0 00.992-.894L11.58 6H7.834L7 3H3zM6 14a1 1 0 100 2 1 1 0 000-2zm7 0a1 1 0 100 2 1 1 0 000-2z"></path></svg>
    );

    // Función para SVG de edición (reemplaza FaEdit)
    const EditIcon = () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM5 15a2 2 0 00-2 2v1h1v-1a1 1 0 011-1h12a1 1 0 011 1v1h1v-1a2 2 0 00-2-2H5z"></path></svg>
    );

    // Función para SVG de eliminar (reemplaza FaTrash)
    const TrashIcon = () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd"></path></svg>
    );

    // Función para SVG de búsqueda (reemplaza FaSearch)
    const SearchIcon = () => (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
    );


    return (
        <div className="p-4 w-full font-sans">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Gestión de Productos</h2>

            {/* Botón para mostrar/ocultar el formulario de creación */}
            <div className="mb-6 text-center max-w-6xl mx-auto">
                <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="bg-purple-600 text-white font-semibold rounded-md px-6 py-2 hover:bg-purple-700 transition duration-200 shadow-md transform hover:scale-105"
                >
                    {showCreateForm ? 'Ocultar Formulario de Creación' : 'Mostrar Formulario de Creación'}
                </button>
            </div>

            {/* Formulario para crear productos (condicional) */}
            {showCreateForm && (
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-6xl mx-auto border border-gray-200 animate-fade-in-down">
                    <h3 className="text-xl font-bold mb-4 text-gray-700 text-center">Crear Nuevo Producto</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre del Producto"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                            required
                        />
                        <input
                            type="text"
                            name="descripcion"
                            placeholder="Descripción"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                        <input
                            type="number"
                            name="precio"
                            placeholder="Precio"
                            value={formData.precio}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                            step="0.01"
                            required
                        />
                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                            required
                        />
                        <input
                            type="text"
                            name="imagen"
                            placeholder="URL de la Imagen (opcional)"
                            value={formData.imagen}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                        <button
                            onClick={crearProducto}
                            className="bg-blue-600 text-white font-semibold rounded-md px-6 py-2 hover:bg-blue-700 transition duration-200 col-span-full sm:col-span-1 shadow-md transform hover:scale-105"
                        >
                            Crear Producto
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                </div>
            )}

            {/* Formulario de edición de productos (aparecerá solo si editingProduct no es null) */}
            {editingProduct && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 mb-8 max-w-6xl mx-auto rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-700 text-center">Editar Producto: {editingProduct.nombre} (ID: {editingProduct.producto_id})</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre del Producto"
                            value={editingProduct.nombre}
                            onChange={handleEditInputChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                            required
                        />
                        <input
                            type="text"
                            name="descripcion"
                            placeholder="Descripción"
                            value={editingProduct.descripcion}
                            onChange={handleEditInputChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                        <input
                            type="number"
                            name="precio"
                            placeholder="Precio"
                            value={editingProduct.precio}
                            onChange={handleEditInputChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                            step="0.01"
                            required
                        />
                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={editingProduct.stock}
                            onChange={handleEditInputChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                            required
                        />
                        <input
                            type="text"
                            name="imagen"
                            placeholder="URL de la Imagen (opcional)"
                            value={editingProduct.imagen}
                            onChange={handleEditInputChange}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                        <button
                            onClick={handleUpdateProduct}
                            className="bg-purple-600 text-white font-semibold rounded-md px-6 py-2 hover:bg-purple-700 transition duration-200 col-span-full sm:col-span-1 shadow-md transform hover:scale-105"
                        >
                            Guardar Cambios
                        </button>
                        <button
                            onClick={() => setEditingProduct(null)} // Botón para cancelar la edición
                            className="bg-gray-400 text-white font-semibold rounded-md px-6 py-2 hover:bg-gray-500 transition duration-200 col-span-full sm:col-span-1 shadow-md transform hover:scale-105"
                        >
                            Cancelar
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                </div>
            )}

            {/* Sección de filtrado */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-6xl mx-auto border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-700 text-center">Buscar Productos</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o descripción..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                    <button
                        onClick={() => { /* La búsqueda es en tiempo real, este botón es más que nada visual */ }}
                        className="bg-gray-600 text-white font-semibold rounded-md px-6 py-2 hover:bg-gray-700 transition duration-200 shadow-md flex items-center justify-center transform hover:scale-105"
                    >
                        <SearchIcon /> Buscar
                    </button>
                </div>
            </div>

            {/* Lista de productos en formato de tarjetas */}
            <h3 className="text-xl font-bold mb-4 text-gray-700 text-center">Listado de Productos</h3>
            {loading ? (
                <p className="text-center text-gray-600 py-8">Cargando productos...</p>
            ) : filteredProductos.length === 0 ? (
                <p className="text-center text-gray-600 py-8">No hay productos que coincidan con la búsqueda.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 max-w-6xl mx-auto">
                        {currentProducts.map(producto => (
                            <div key={producto.producto_id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform hover:scale-105 transition-transform duration-200 flex flex-col">
                                <img
                                    src={producto.imageUrl}
                                    alt={producto.nombre}
                                    className="w-full h-48 object-cover border-b border-gray-200"
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/e0e0e0/505050?text=No+Img'; }}
                                />
                                <div className="p-4 flex-grow flex flex-col">
                                    <h4 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{producto.nombre || 'N/A'}</h4>
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2 flex-grow">{producto.descripcion || 'Sin descripción'}</p>
                                    <div className="flex justify-between items-center mb-3 mt-auto">
                                        <span className="text-xl font-extrabold text-blue-700">${typeof producto.precio === 'number' ? producto.precio.toFixed(2) : '0.00'}</span>
                                        <span className={`text-sm font-semibold px-2 py-1 rounded-full ${producto.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            Stock: {producto.stock}
                                        </span>
                                    </div>
                                    <div className="flex justify-around items-center space-x-2 mt-2">
                                        <button
                                            // onClick={() => addToCart(producto)} // Se ha comentado debido a la eliminación de CartContext.
                                            onClick={() => console.log('Añadir al carrito - Funcionalidad de CartContext eliminada para compilación.')}
                                            className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 transition duration-200 flex items-center justify-center h-10 w-10 text-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-md transform hover:scale-110"
                                            disabled={producto.stock <= 0}
                                            title={producto.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock'}
                                        >
                                            <ShoppingCartIcon />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(producto)}
                                            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition duration-200 flex items-center justify-center h-10 w-10 text-xl shadow-md transform hover:scale-110"
                                            title="Editar Producto"
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(producto.producto_id)}
                                            className="bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition duration-200 flex items-center justify-center h-10 w-10 text-xl shadow-md transform hover:scale-110"
                                            title="Eliminar Producto"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controles de paginación */}
                    {totalPages > 1 && (
                        <nav className="flex justify-center items-center space-x-2 mt-8 mb-4 max-w-6xl mx-auto">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="bg-gray-300 text-gray-800 font-semibold rounded-md px-4 py-2 hover:bg-gray-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                Anterior
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`px-4 py-2 rounded-md font-semibold transition duration-200 shadow-sm ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="bg-gray-300 text-gray-800 font-semibold rounded-md px-4 py-2 hover:bg-gray-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                Siguiente
                            </button>
                        </nav>
                    )}
                </>
            )}

            {/* Modal de confirmación de eliminación */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center transform scale-105">
                        <p className="text-xl font-semibold mb-6 text-gray-800">¿Estás seguro?</p>
                        <p className="text-gray-700 mb-8">Esta acción eliminará el producto de forma permanente.</p>
                        <div className="flex justify-around space-x-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-all duration-200 shadow-md transform hover:scale-105"
                            >
                                Sí, Eliminar
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-400 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-500 transition-all duration-200 shadow-md transform hover:scale-105"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}