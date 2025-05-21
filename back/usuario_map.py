from fastapi import APIRouter, HTTPException, status  # Importa herramientas para crear rutas y manejar errores HTTP
from pydantic import BaseModel  # Importa BaseModel para definir estructuras de datos
from Clever_MySQL_conn import cleverCursor  # Importa el cursor de base de datos para ejecutar consultas SQL

usuarioRouter = APIRouter()  # Crea un router de FastAPI para agrupar rutas relacionadas a usuarios

# Modelo de datos para representar a un usuario desde la base de datos
class UsuarioDB(BaseModel):
    id_usuario_Local: int  # ID del usuario
    apellido_Local: str  # Apellido
    cedula_Local: str  # Número de cédula
    correo_electronico_Local: str  # Correo electrónico
    direccion_Local: str  # Dirección
    edad_Local: int  # Edad
    estatura_Local: int  # Estatura
    nombre_Local: str  # Nombre
    numero_visitas_Local: int  # Número de visitas realizadas
    telefono: str  # Teléfono

# Ruta para obtener todos los usuarios de la tabla 'usuario'
@usuarioRouter.get("/cityPark_usuarios/", status_code=status.HTTP_302_FOUND)
async def get_users():
    selectAll_query = 'Select * from usuario'  # Consulta SQL para obtener todos los usuarios
    cleverCursor.execute(selectAll_query)  # Ejecuta la consulta

    result = cleverCursor.fethall()  # ⚠️ ERROR TIPOGRÁFICO: debe ser fetchall()
    return result  # Devuelve los resultados
