from sqlalchemy import Column, Integer, String, ForeignKey  # Importa tipos de columna y claves foráneas
from sqlalchemy import DateTime  # Importa tipo de dato para fechas y horas
from sqlalchemy.orm import relationship  # Importa relationship para definir relaciones entre tablas
from Clever_MySQL_conn import Base  # Importa la clase base para declarar modelos ORM

# =================== MODELO CLIENTE ===================
class Cliente(Base):
    __tablename__ = "clientes"  # Nombre de la tabla en la base de datos

    cliente_id = Column(Integer, primary_key=True, index=True)  # ID único del cliente
    nombre = Column(String)  # Nombre del cliente
    apellido = Column(String)  # Apellido del cliente
    correo = Column(String, index=True)  # Correo del cliente
    telefono = Column(String)  # Teléfono del cliente
    direccion = Column(String)  # Dirección del cliente

    ventasRel = relationship("Venta", back_populates="clienteRel")  
    # Relación uno-a-muchos: un cliente puede tener varias ventas

# =================== MODELO VENTA ===================
class Venta(Base):
    __tablename__ = "ventas"  # Nombre de la tabla en la base de datos

    venta_id = Column(Integer, primary_key=True, index=True)  # ID de la venta
    cliente_id = Column(Integer, ForeignKey("clientes.cliente_id"))  # Clave foránea hacia Cliente
    fecha = Column(DateTime)  # Fecha de la venta
    total = Column(Integer)  # Total de la venta

    clienteRel = relationship("Cliente", back_populates="ventasRel")  
    # Relación inversa hacia Cliente
    detalleVentaRelV = relationship("DetalleVenta", back_populates="ventasRelD")  
    # Relación uno-a-muchos: una venta tiene muchos detalles

# =================== MODELO PRODUCTO ===================
class Producto(Base):
    __tablename__ = "productos"  # Nombre de la tabla

    producto_id = Column(Integer, primary_key=True, index=True)  # ID del producto
    nombre = Column(String)  # Nombre del producto
    descripcion = Column(String)  # Descripción del producto
    precio = Column(Integer)  # Precio del producto
    stock = Column(Integer)  # Cantidad en stock

    detalleVentaRelP = relationship("DetalleVenta", back_populates="productoRel")  
    # Relación uno-a-muchos: un producto puede estar en varios detalles de venta

# =================== MODELO DETALLE VENTA ===================
class DetalleVenta(Base):
    __tablename__ = "detalleventa"  # Nombre de la tabla

    detalle_id = Column(Integer, primary_key=True, index=True)  # ID del detalle
    venta_id = Column(Integer, ForeignKey("ventas.venta_id"))  # Clave foránea a Venta
    producto_id = Column(Integer, ForeignKey("productos.producto_id"))  # Clave foránea a Producto
    cantidad = Column(Integer)  # Cantidad comprada del producto
    precio_unitario = Column(Integer)  # Precio por unidad
    subtotal = Column(Integer)  # Subtotal (precio_unitario * cantidad)

    ventasRelD = relationship("Venta", back_populates="detalleVentaRelV")  
    # Relación inversa hacia Venta
    productoRel = relationship("Producto", back_populates="detalleVentaRelP")  
    # Relación inversa hacia Producto

# =================== MODELO USUARIO (LOGIN) ===================
class Usuario(Base):
    __tablename__ = "usuarios"  # Nombre de la tabla

    id = Column(Integer, primary_key=True, index=True)  # ID del usuario
    username = Column(String(50), unique=True, index=True, nullable=False)  # Nombre de usuario único
    hashed_password = Column(String(100), nullable=False)  # Contraseña cifrada

