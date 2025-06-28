# producto.py
from fastapi import APIRouter, HTTPException, status
# import json # Ya no es necesario
# import simplejson as jsonDec # Ya no es necesario
from pydantic import BaseModel
from Clever_MySQL_conn import cleverCursor, mysqlConn
from mysql.connector import Error

productoRtr = APIRouter()

# Modelo de datos para productos que se usará en POST y PUT
class ProductoDB(BaseModel):
    nombre : str
    descripcion : str
    precio : float # <-- Cambiado a float si el precio tiene decimales
    stock : int
    imagen: str # Url para imagenes

# =================== OBTENER TODOS LOS PRODUCTOS ===================
@productoRtr.get("/aliante_producto/", status_code=status.HTTP_200_OK)
async def get_all_products(): # Renombrado para mayor claridad
    # Consulta SQL para seleccionar todos los productos, incluyendo 'imagen'
    # Asegúrate de que el nombre de la columna 'imagen' coincida con tu BD
    selectAll_query = 'SELECT producto_id, nombre, descripcion, precio, stock, imagen FROM productos'
    cleverCursor.execute(selectAll_query)

    # Extrae los nombres de columnas
    columns = [desc[0] for desc in cleverCursor.description] # Forma más limpia de obtener nombres de columnas
    # Construye una lista de diccionarios con los resultados
    result = []
    for row in cleverCursor.fetchall():
        product_dict = {}
        for index, column_name in enumerate(columns):
            product_dict[column_name] = row[index]
        result.append(product_dict)

    return result

# =================== OBTENER PRODUCTO POR ID ===================
@productoRtr.get("/aliante_producto/{producto_id}", status_code=status.HTTP_200_OK)
def get_product_by_id(producto_id: int):
    # Consulta SQL con filtro solo por ID
    # Asegúrate de que el nombre de la columna 'imagen' coincida con tu BD
    select_query = "SELECT producto_id, nombre, descripcion, precio, stock, imagen FROM productos WHERE producto_id = %s"
    cleverCursor.execute(select_query, (producto_id,)) # Eliminado el filtro por nombre fijo
    result = cleverCursor.fetchone()

    if result:
        # Extrae los nombres de columnas para formatear el resultado
        columns = [desc[0] for desc in cleverCursor.description]
        product_dict = {}
        for index, column_name in enumerate(columns):
            product_dict[column_name] = result[index]
        return product_dict # Retorna el producto como un diccionario
    else:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

# =================== CREAR NUEVO PRODUCTO ===================
@productoRtr.post("/aliante_crea_producto/", status_code=status.HTTP_201_CREATED)
def insert_product(productoPost: ProductoDB): # Renombrado para mayor claridad
    # Consulta SQL para insertar un producto nuevo, incluyendo 'imagen'
    # Asegúrate de que el nombre de la columna 'imagen' coincida con tu BD
    insert_query = """
    INSERT INTO productos (nombre, descripcion, precio, stock, imagen)
    VALUES (%s, %s, %s, %s, %s)
    """
    values = (productoPost.nombre, productoPost.descripcion, productoPost.precio, productoPost.stock, productoPost.imagen)

    try:
        cleverCursor.execute(insert_query, values)
        mysqlConn.commit()

        # Opcional: Obtener el ID del último producto insertado para devolverlo
        cleverCursor.execute("SELECT LAST_INSERT_ID()")
        new_product_id = cleverCursor.fetchone()[0]

        return {
            "message": "Producto creado correctamente",
            "producto_id": new_product_id, # Devolver el ID
            "nombre": productoPost.nombre,
            "descripcion": productoPost.descripcion,
            "precio": productoPost.precio,
            "stock": productoPost.stock,
            "imagen": productoPost.imagen # Devolver la imagen para que el frontend la tenga
        }
    except mysqlConn.connector.Error as err:
        raise HTTPException(status_code=400, detail=f"Error: {err}")

# =================== ACTUALIZAR PRODUCTO POR ID ===================
@productoRtr.put("/aliante_editar/actualizar_producto/{producto_id}", status_code=status.HTTP_200_OK)
def update_product_by_id(producto_id: int, productoUpdate: ProductoDB):
    # Consulta SQL para actualizar un producto existente, incluyendo 'imagen'
    # Asegúrate de que el nombre de la columna 'imagen' coincida con tu BD
    update_query= """
    UPDATE productos
    SET nombre = %s, descripcion = %s, precio = %s, stock = %s, imagen = %s
    WHERE producto_id = %s
    """

    values = (
        productoUpdate.nombre,
        productoUpdate.descripcion,
        productoUpdate.precio,
        productoUpdate.stock,
        productoUpdate.imagen, # <-- AGREGAR ESTA LÍNEA
        producto_id,
    )

    try:
        cleverCursor.execute(update_query, values)
        mysqlConn.commit()
        # Verificar si se actualizó alguna fila
        if cleverCursor.rowcount == 0:
             raise HTTPException(status_code=404, detail="Producto no encontrado")

    except mysqlConn.connector.Error as err:
        raise HTTPException(status_code=400, detail=f"Error: {err}")

    return {"message": "Producto actualizado correctamente"}

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
        cleverCursor.execute(delete_query, values)
        mysqlConn.commit()
        if cleverCursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
    except Error as err: # <--- ¡CAMBIO AQUÍ!
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error: {err}")

    # No hay retorno de mensaje para 204 No Content
    return # Retorna nada, ya que 204 No Content no lleva cuerpo

