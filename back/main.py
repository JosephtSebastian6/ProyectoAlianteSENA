from typing import Union  # Importa Union para permitir parámetros opcionales
from fastapi import FastAPI  # Importa FastAPI para crear la aplicación
from producto import productoRtr  # Importa las rutas relacionadas a productos
from cliente import clienteRtr  # Importa las rutas relacionadas a clientes
from routes import routerRDB  # Importa rutas que usan SQLAlchemy
from fastapi.middleware.cors import CORSMiddleware  # Middleware para habilitar CORS
from auth_routes import authRouter  # Importa las rutas de autenticación (login/registro)

# Crea una instancia de la aplicación FastAPI
alianteAPP = FastAPI()

# Registra el router de autenticación
alianteAPP.include_router(authRouter)

# Registra el router de productos
alianteAPP.include_router(productoRtr)

# Registra el router de clientes
alianteAPP.include_router(clienteRtr)

# Registra el router de rutas ORM (clientes, ventas, detalle ventas)
alianteAPP.include_router(routerRDB)

# Lista de orígenes permitidos para CORS (dominios desde los cuales se puede acceder al backend)
origins = [
    "http://localhost.tiangolo.com",
    "http://localhost:5173",  # ✅ Este es el frontend en Vite
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

# Configuración del middleware CORS para permitir peticiones desde frontend
alianteAPP.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Orígenes permitidos
    allow_credentials=True,  # Permite envío de credenciales (cookies, headers, etc.)
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los encabezados HTTP
)

# Ruta raíz para probar que el backend funciona
@alianteAPP.get("/")
async def read_root():
    return {"Hello": "World"}

# Ruta para obtener parámetros por query (ej: /items/?q=texto)
@alianteAPP.get("/items/")
async def read_param_item(q: Union[str, None] = None):
    return {"q": q}

# Ruta para obtener parámetros en la ruta (ej: /items/5)
@alianteAPP.get("/items/{item_id}")
async def read_paramInPath_item(item_id: int):
    return {"item_id": item_id}

# Ruta que combina parámetros de ruta y de query (ej: /items/5?q=texto)
@alianteAPP.get("/items/{item_id}")
async def read_both_paramTypes_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
    
# Ruta para eliminar un ítem por ID (simulación)
@alianteAPP.delete("/items_del/{item_id}")
async def delete_by_id(item_id: int):
    return {"resultado": "Se ha eliminado correctamente el item solicitado"}
