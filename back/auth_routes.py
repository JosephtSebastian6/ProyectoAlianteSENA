# auth_routes.py

from fastapi import APIRouter, Depends, HTTPException  # Importa FastAPI y dependencias para manejo de rutas y errores
from sqlalchemy.orm import Session  # Importa la sesión de SQLAlchemy para interactuar con la base de datos
from jose import jwt  # Importa librería para generar y verificar tokens JWT
from datetime import timedelta, datetime  # Importa herramientas para manejar fechas y tiempos
import schemas, crud  # Importa los esquemas Pydantic definidos para validación de datos
from Clever_MySQL_conn import get_db  # Importa la función que proporciona la sesión de base de datos

SECRET_KEY = "supersecretkey"  # cámbialo por una key segura  # Clave secreta usada para firmar los tokens JWT (debería estar en .env)
ALGORITHM = "HS256"  # Algoritmo usado para firmar el token JWT
EXPIRATION_MINUTES = 60  # Tiempo de expiración del token JWT en minutos

authRouter = APIRouter()  # Inicializa un enrutador de FastAPI para agrupar rutas relacionadas a autenticación

@authRouter.post("/register", response_model=schemas.UsuarioResponse)  # Importa los esquemas Pydantic definidos para validación de datos
def register(user: schemas.UsuarioCreate, db: Session = Depends(get_db)):  # Importa los esquemas Pydantic definidos para validación de datos
    return crud.crear_usuario(db, user)  # Importa funciones de acceso a datos usando SQLAlchemy

@authRouter.post("/login")  # Ruta para iniciar sesión y generar token JWT
def login(user: schemas.UsuarioLogin, db: Session = Depends(get_db)):  # Importa los esquemas Pydantic definidos para validación de datos
    usuario = crud.autenticar_usuario(db, user.username, user.password)  # Importa funciones de acceso a datos usando SQLAlchemy
    if not usuario:
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")  # Si las credenciales son incorrectas, se lanza un error 400
    
    expire = datetime.utcnow() + timedelta(minutes=EXPIRATION_MINUTES)  # Tiempo de expiración del token JWT en minutos
    to_encode = {"sub": usuario.username, "exp": expire}  # Define el contenido del token: usuario y expiración
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)  # Clave secreta usada para firmar los tokens JWT (debería estar en .env)
    return {"access_token": token, "token_type": "bearer"}  # Devuelve el token al cliente junto con el tipo (bearer)
