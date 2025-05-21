from fastapi import APIRouter, HTTPException, status  # Importa herramientas de FastAPI para rutas y errores
import json  # Módulo estándar para trabajar con JSON (aunque no se usa directamente)
import simplejson as jsonDec  # Importa una versión más robusta de JSON (aunque tampoco se usa aquí)
from pydantic import BaseModel  # Importa BaseModel para definir modelos de datos
from Clever_MySQL_conn import cleverCursor, mysqlConn  # Importa cursor y conexión a la base de datos

productoRtr =  APIRouter()  # Crea un router para las rutas relacionadas a productos

# Modelo de datos para productos que se usará en POST y PUT
class ProductoDB(BaseModel):
    nombre : str  # Nombre del producto
    descripcion : str  # Descripción del producto
    precio : int  # Precio del producto
    stock : int  # Cantidad en inventario

# =================== OBTENER TODOS LOS PRODUCTOS ===================
@productoRtr.get("/aliante_producto/", status_code=status.HTTP_302_FOUND)
async def get_users():
    # Consulta SQL para seleccionar todos los productos
    selectAll_query = 'SELECT producto_id, nombre, descripcion, precio, stock FROM productos'
    cleverCursor.execute(selectAll_query)  # Ejecuta la consulta

    # Extrae los nombres de columnas
    columns = cleverCursor.description 
    # Construye una lista de diccionarios con los resultados
    result = [{columns[index][0]: column for index, column in enumerate(value)} for value in cleverCursor.fetchall()]

    return result  # Retorna la lista de productos

# =================== OBTENER PRODUCTO POR ID ===================
@productoRtr.get("/aliante_producto/{producto_id}", status_code=status.HTTP_200_OK)
def get_product_by_id(producto_id: int):
    # Consulta SQL con filtro por ID (y nombre fijo, posible error)
    select_query = "SELECT nombre, descripcion, precio, stock FROM productos WHERE producto_id = %s and nombre = %s"
    cleverCursor.execute(select_query, (producto_id, "Guarda Polvo de Lujo",))  # Ejecuta la consulta
    result = cleverCursor.fetchone()  # Obtiene el primer resultado

    if result:
        return result  # Si existe, lo retorna
    else:
        raise HTTPException(status_code=404, detail="Producto no encontrado")  # Si no, lanza error

# =================== CREAR NUEVO PRODUCTO ===================
@productoRtr.post("/aliante_crea_producto/", status_code=status.HTTP_201_CREATED)
def insert_user(productoPost: ProductoDB):
    # Consulta SQL para insertar un producto nuevo
    insert_query = """
    INSERT INTO productos (nombre, descripcion, precio, stock)
    VALUES (%s, %s, %s, %s)
    """
    values = (productoPost.nombre, productoPost.descripcion, productoPost.precio, productoPost.stock)

    try:
        cleverCursor.execute(insert_query, values)  # Ejecuta la inserción
        mysqlConn.commit()  # Confirma los cambios en la base de datos
    except mysqlConn.connector.Error as err:
        raise HTTPException(status_code=400, detail=f"Error: {err}")  # Manejo de errores

    return {"message": "Producto creado correctamente"}  # Respuesta exitosa

# =================== ACTUALIZAR PRODUCTO POR ID ===================
@productoRtr.put("/aliante_editar/actualizar_producto/{producto_id}", status_code=status.HTTP_200_OK)
def update_product_by_id(producto_id: int, productoUpdate: ProductoDB):
    # Consulta SQL para actualizar un producto existente
    update_query= """
    UPDATE productos
    SET nombre = %s, descripcion = %s, precio = %s, stock = %s
    WHERE producto_id = %s
    """

    values = (
        productoUpdate.nombre,
        productoUpdate.descripcion,
        productoUpdate.precio,
        productoUpdate.stock,
        producto_id,
    )

    try:
        cleverCursor.execute(update_query, values)  # Ejecuta la actualización
        mysqlConn.commit()  # Confirma los cambios
    except mysqlConn.connector.Error as err:
        raise HTTPException(status_code=400, detail=f"Error: {err}")  # Maneja errores

    return {"message": "Producto actualizado correctamente"}  # Respuesta

# =================== ELIMINAR PRODUCTO POR ID ===================
@productoRtr.delete("/aliante_eliminar/eliminar_producto/{producto_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product_by_id(producto_id: int):
    # Consulta SQL para eliminar un producto por ID
    delete_query = """
    DELETE FROM productos
    WHERE producto_id = %s
    """
    values = (producto_id,)

    try:
        cleverCursor.execute(delete_query, values)  # Ejecuta la eliminación
        mysqlConn.commit()  # Aplica los cambios
    except mysqlConn.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error: {err}")  # Manejo de error

    return {"message": "Producto eliminado correctamente"}  # Mensaje de éxito


