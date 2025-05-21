from pydantic import BaseModel, field_serializer  # BaseModel es la clase base para todos los esquemas
from datetime import datetime  # Se usa para representar fechas
from typing import List, Optional  # Se usan para listas y campos opcionales

# ================== ESQUEMAS PARA CLIENTE ==================

class ClienteBase(BaseModel):
    """
    Esquema base para Cliente. Define los atributos comunes.
    """
    nombre: str  # Nombre del cliente
    apellido: str  # Apellido del cliente
    correo: str  # Correo electrónico del cliente
    telefono: str  # Teléfono del cliente
    direccion: str  # Dirección del cliente

class ClienteCreate(ClienteBase):
    """
    Esquema para crear un cliente. Hereda de ClienteBase.
    """
    pass  # No se añaden campos extra al crear un cliente

class ClienteResponse(ClienteBase):
    """
    Esquema de respuesta para cliente. Añade ID y lista de ventas.
    """
    cliente_id: int  # ID del cliente
    ventas: List["VentaResponse"] = []  # Lista de ventas asociadas

    class Config:
        from_attributes = True  # Permite la conversión desde modelos ORM (SQLAlchemy)

# ================== ESQUEMAS PARA VENTAS ==================

class VentaBase(BaseModel):
    """
    Esquema base para ventas.
    """
    fecha: Optional[datetime]  # Fecha de la venta (opcional)
    total: int  # Monto total de la venta

class VentaCreate(VentaBase):
    """
    Esquema para crear una venta. Hereda de VentaBase.
    """
    pass  # No se añaden campos adicionales

class VentaResponse(VentaBase):
    """
    Esquema de respuesta para una venta.
    """
    venta_id: int  # ID de la venta
    cliente_id: int  # ID del cliente que hizo la compra
    detventa: List["DetalleVentaResponse"] = []  # Lista de detalles de la venta

    class Config:
        from_attributes = True  # Permite usar modelos SQLAlchemy directamente

    def model_dump(self, **kwargs):
        """Convierte la fecha a formato ISO 8601 antes de enviarla."""
        obj = super().model_dump(**kwargs)
        if obj.get("fecha") and isinstance(obj["fecha"], datetime):
            obj["fecha"] = obj["fecha"].isoformat()
        return obj

# ================== ESQUEMAS PARA DETALLE DE VENTA ==================

class DetalleVentaBase(BaseModel):
    """
    Esquema base para detalle de venta.
    """
    cantidad: int  # Cantidad del producto
    precio_unitario: int  # Precio por unidad
    subtotal: int  # Total parcial por ítem

class DetalleVentaCreate(DetalleVentaBase):
    """
    Esquema para crear detalle de venta.
    """
    pass  # No necesita campos adicionales

class DetalleVentaResponse(DetalleVentaBase):
    """
    Esquema de respuesta para detalle de venta.
    """
    detalle_id: int  # ID del detalle
    venta_id: int  # ID de la venta a la que pertenece
    producto_id: int  # ID del producto vendido

    class Config:
         orm_mode = True  # Permite convertir desde ORM (equivalente a from_attributes=True)

# ================== ESQUEMAS PARA USUARIO ==================

class UsuarioCreate(BaseModel):
    username: str  # Nombre de usuario
    password: str  # Contraseña sin cifrar

class UsuarioLogin(BaseModel):
    username: str  # Usuario que intenta iniciar sesión
    password: str  # Contraseña que intenta validar

class UsuarioResponse(BaseModel):
    id: int  # ID del usuario
    username: str  # Nombre de usuario

    class Config:
        from_attributes = True  # Permite crear desde objetos SQLAlchemy
