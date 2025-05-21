from fastapi import APIRouter, HTTPException, status  # Importa herramientas de FastAPI para crear rutas y manejar errores
from pydantic import BaseModel  # Importa BaseModel para definir modelos de datos
from Clever_MySQL_conn import cleverCursor, mysqlConn  # Importa el cursor y la conexión MySQL del archivo de configuración

clienteRtr =  APIRouter()  # Crea un router de FastAPI para las rutas relacionadas con clientes

class clienteDB(BaseModel):  # Define el modelo de datos para crear y actualizar clientes
    nombre: str  # Campo del nombre del cliente
    apellido: str  # Campo del apellido del cliente
    correo: str  # Campo del correo del cliente
    telefono: int  # Campo del teléfono del cliente
    direccion: str  # Campo de la dirección del cliente


@clienteRtr.get("/aliante_cliente/", status_code=status.HTTP_200_OK)  # Ruta GET para obtener todos los clientes desde la base de datos
async def get_users():
    selectAll_query = 'SELECT cliente_id, nombre, apellido,correo,telefono,direccion FROM clientes'  # Consulta SQL para seleccionar todos los registros de clientes
    cleverCursor.execute(selectAll_query)  # Consulta SQL para seleccionar todos los registros de clientes
    result = cleverCursor.fetchall()  # Obtiene todos los resultados de la consulta
    return result



@clienteRtr.delete("/aliante_eliminar/eliminar_cliente/{cliente_id}", status_code=status.HTTP_204_NO_CONTENT)  # Ruta DELETE para eliminar un cliente por su ID
def delete_client_by_id(cliente_id: int):
    delete_query = """  # Consulta SQL para eliminar un cliente según su ID
    DELETE FROM clientes
    WHERE cliente_id = %s
    """

    values = (cliente_id,)

    try:
        cleverCursor.execute(delete_query, values)  # Ejecuta la consulta usando el cursor
        mysqlConn.commit()  # Confirma los cambios en la base de datos

    except mysqlConn.connector.Error as err:  # Captura y maneja errores al ejecutar la consulta
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error: {err}")

    return {"message": "Cliente eliminado correctamente"}





@clienteRtr.post("/aliante_crea_cliente/", status_code=status.HTTP_201_CREATED)  # Ruta POST para crear un nuevo cliente
def insert_user(clientePost: clienteDB):
    insert_query = """  # Consulta SQL para insertar un nuevo cliente
    INSERT INTO clientes (nombre, apellido, correo, telefono, direccion)
    VALUES (%s, %s, %s, %s, %s)
    """
    values = (clientePost.nombre, clientePost.apellido, clientePost.correo, clientePost.telefono, clientePost.direccion)
    

    try:
        cleverCursor.execute(insert_query, values)  # Ejecuta la consulta usando el cursor
        mysqlConn.commit()  # Confirma los cambios en la base de datos
    except mysqlConn.connector.Error as err:  # Captura y maneja errores al ejecutar la consulta
        raise HTTPException(status_code=400, detail=f"Error: {err}")

    return {"message": "Cliente creado correctamente"}


@clienteRtr.put("/aliante_editar/actualizar_cliente/{cliente_id}", status_code=status.HTTP_200_OK)  # Ruta PUT para actualizar los datos de un cliente
def update_client_by_id(cliente_id: int, clienteUpdate: clienteDB):
    update_query= """  # Consulta SQL para actualizar los campos de un cliente
    UPDATE clientes
    SET nombre = %s, apellido = %s, correo = %s, telefono = %s, direccion =%s
    WHERE cliente_id = %s
    """

    values = (
    clienteUpdate.nombre,
    clienteUpdate.descripcion,
    clienteUpdate.precio,
    clienteUpdate.stock,
    cliente_id,
    )

    try:
        cleverCursor.execute(update_query, values)  # Ejecuta la consulta usando el cursor
        mysqlConn.commit()  # Confirma los cambios en la base de datos

    except mysqlConn.connector.Error as err:  # Captura y maneja errores al ejecutar la consulta

        raise HTTPException(status_code=400, detail=f"Error: {err}")

    return {"message": "Cliente actualizado correctamente"}

