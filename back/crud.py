from sqlalchemy.orm import Session  # Importa la sesión de SQLAlchemy para interactuar con la base de datos
import models, schemas  # Importa los modelos ORM y los esquemas Pydantic
from passlib.hash import bcrypt  # Importa bcrypt para hashear y verificar contraseñas

# =================== CLIENTES ===================

def crear_cliente(db: Session, cliente: schemas.ClienteCreate):
    """
    Crea un nuevo cliente en la base de datos.
    """
    # Crea una instancia del modelo Cliente con los datos recibidos
    nuevo_cliente = models.Cliente(
        correo=cliente.correo,
        nombre=cliente.nombre,
        apellido=cliente.apellido,
        telefono=cliente.telefono,
        direccion=cliente.direccion
    )
    db.add(nuevo_cliente)  # Agrega el cliente a la sesión de la base de datos
    db.commit()  # Guarda los cambios en la base de datos
    db.refresh(nuevo_cliente)  # Recarga el objeto desde la base de datos para obtener el ID
    return nuevo_cliente  # Retorna el cliente creado

def obtener_clientes(db: Session, skip: int = 0, limit: int = 10):
    """
    Obtiene una lista de clientes con paginación.
    """
    return db.query(models.Cliente).offset(skip).limit(limit).all()  # Retorna los clientes con paginación

def obtener_cliente_por_id(db: Session, clientePAR: int):
    """
    Obtiene un cliente por su ID.
    """
    return db.query(models.Cliente).filter(models.Cliente.cliente_id == clientePAR).first()  # Retorna un cliente específico

# =================== VENTAS ===================

def crear_venta(db: Session, venta: schemas.VentaCreate, clientePAR: int):
    """
    Crea una nueva venta asociada a un cliente.
    """
    nueva_venta = models.Venta(
        cliente_id=clientePAR,
        fecha=venta.fecha,
        total=venta.total
    )
    db.add(nueva_venta)  # Agrega la venta a la sesión
    db.commit()  # Guarda los cambios en la base de datos
    db.refresh(nueva_venta)  # Refresca los datos desde la base de datos
    return nueva_venta  # Retorna la venta creada

def obtener_venta(db: Session, skip: int = 0, limit: int = 10):
    """
    Obtiene una lista de ventas con paginación.
    """
    return db.query(models.Venta).offset(skip).limit(limit).all()  # Retorna ventas paginadas

def obtener_venta_por_id(db: Session, ventaPAR: int):
    """
    Obtiene una venta por su ID.
    """
    return db.query(models.Venta).filter(models.Venta.venta_id == ventaPAR).first()  # Busca venta por ID

def obtener_venta_por_cliente(db: Session, clientePAR: int):
    """
    Obtiene todas las ventas de un cliente específico.
    """
    return db.query(models.Venta).filter(models.Venta.cliente_id == clientePAR).all()  # Retorna ventas por cliente

# =================== DETALLE DE VENTAS ===================

def crear_DetalleVenta(db: Session, DetalleVenta: schemas.DetalleVentaCreate, ventasPAR: int, productoPAR: int):
    """
    Crea un nuevo detalle de venta asociado a un ID de venta y producto.
    """
    nuevo_detalle_venta = models.DetalleVenta(
        venta_id=ventasPAR,
        producto_id=productoPAR,
        subtotal=DetalleVenta.subtotal,
        cantidad=DetalleVenta.cantidad,
        precio_unitario=DetalleVenta.precio_unitario
    )
    db.add(nuevo_detalle_venta)  # Agrega el detalle de venta a la sesión
    db.commit()  # Guarda los cambios
    db.refresh(nuevo_detalle_venta)  # Refresca los datos desde la base de datos
    return nuevo_detalle_venta  # Retorna el detalle creado

def obtener_DetalleVenta_por_id(db: Session, detallePAR: int):
    """
    Obtiene todos los detalles de una venta específica.
    """
    return db.query(models.DetalleVenta).filter(models.DetalleVenta.venta_id == detallePAR).all()  # Filtra por ID de venta

# =================== LOGIN ===================

def crear_usuario(db: Session, user: schemas.UsuarioCreate):
    # Hashea la contraseña del usuario antes de guardarla
    hashed_pw = bcrypt.hash(user.password)
    # Crea una nueva instancia de Usuario con la contraseña cifrada
    nuevo_usuario = models.Usuario(username=user.username, hashed_password=hashed_pw)
    db.add(nuevo_usuario)  # Agrega el nuevo usuario a la base de datos
    db.commit()  # Guarda los cambios
    db.refresh(nuevo_usuario)  # Refresca los datos desde la base de datos
    return nuevo_usuario  # Retorna el usuario creado

def autenticar_usuario(db: Session, username: str, password: str):
    # Busca al usuario por su nombre de usuario
    user = db.query(models.Usuario).filter(models.Usuario.username == username).first()
    # Verifica si el usuario existe y la contraseña es correcta
    if user and bcrypt.verify(password, user.hashed_password):
        return user  # Retorna el usuario si las credenciales son válidas
    return None  # Retorna None si falla la autenticación

