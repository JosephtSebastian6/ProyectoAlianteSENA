from fastapi import APIRouter, Depends, HTTPException, status  # Importa herramientas de FastAPI para crear rutas y manejar errores
from sqlalchemy.orm import Session  # Importa la sesión de SQLAlchemy para interacción con la base de datos
import crud, schemas, Clever_MySQL_conn  # Importa funciones CRUD, esquemas Pydantic y la conexión a la base de datos

routerRDB = APIRouter()  # Crea un enrutador para agrupar todas estas rutas

# =================== RUTAS PARA CLIENTES ===================

@routerRDB.post("/clientesPost/", response_model=schemas.ClienteResponse, status_code=status.HTTP_201_CREATED)
def crear_cliente(cliente: schemas.ClienteCreate, db: Session = Depends(Clever_MySQL_conn.get_db)):
    """
    Crea un nuevo cliente en la base de datos.
    """
    return crud.crear_cliente(db, cliente)  # Llama al método del CRUD para crear el cliente

@routerRDB.get("/clientesGet/", response_model=list[schemas.ClienteResponse])
def obtener_clientes(skip: int = 0, limit: int = 10, db: Session = Depends(Clever_MySQL_conn.get_db)):
    """
    Obtiene una lista de clientes con paginación.
    """
    return crud.obtener_clientes(db, skip=skip, limit=limit)  # Llama al método del CRUD para obtener clientes

@routerRDB.get("/clientesGetId/{cliente_id}", response_model=schemas.ClienteResponse)
def obtener_cliente_por_id(cliente_id: int, db: Session = Depends(Clever_MySQL_conn.get_db)):
    """
    Obtiene un cliente por su ID.
    """
    cliente = crud.obtener_cliente_por_id(db, cliente_id)  # Busca cliente por ID
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")  # Lanza error si no existe
    return cliente  # Devuelve el cliente encontrado

# =================== RUTAS PARA VENTAS ===================

@routerRDB.post("/ventasPost/", response_model=schemas.VentaResponse, status_code=status.HTTP_201_CREATED)
def crear_venta(cliente_id: int, venta: schemas.VentaCreate, db: Session = Depends(Clever_MySQL_conn.get_db)):
    """
    Crea una nueva venta asociada a un cliente.
    """
    return crud.crear_venta(db, venta, cliente_id)  # Crea la venta asociada al cliente

@routerRDB.get("/ventasGet/", response_model=list[schemas.VentaResponse])
def obtener_venta(skip: int = 0, limit: int = 10, db: Session = Depends(Clever_MySQL_conn.get_db)):
    """
    Obtiene una lista de ventas con paginación.
    """
    return crud.obtener_venta(db, skip=skip, limit=limit)  # Obtiene ventas paginadas

@routerRDB.get("/ventasGetId/{venta_id}", response_model=schemas.VentaResponse)
def obtener_venta_por_id(venta_id: int, db: Session = Depends(Clever_MySQL_conn.get_db)):
    """
    Obtiene una venta por su ID.
    """
    venta = crud.obtener_venta_por_id(db, venta_id)  # Busca venta por ID
    if not venta:
        raise HTTPException(status_code=404, detail="Venta no encontrada")  # Si no existe, lanza error
    return venta

@routerRDB.get("/clientesGetIdVentas/{cliente_id}/ventas", response_model=list[schemas.VentaResponse])
def obtener_venta_por_cliente(cliente_id: int, db: Session = Depends(Clever_MySQL_conn.get_db)):
    """
    Obtiene todas las ventas asociadas a un cliente específico.
    """
    return crud.obtener_venta_por_cliente(db, cliente_id)  # Devuelve todas las ventas hechas por el cliente

# =================== RUTAS PARA DETALLE DE VENTAS ===================

@routerRDB.post("/DetalleVentaPost/", response_model=schemas.DetalleVentaResponse, status_code=status.HTTP_201_CREATED)
def crear_detalle_de_venta(venta_id: int, producto_id: int, DetalleVenta: schemas.DetalleVentaCreate, db: Session = Depends(Clever_MySQL_conn.get_db)):
    """
    Crea un detalle de venta asociada a un ID de venta y producto.
    """
    return crud.crear_DetalleVenta(db, DetalleVenta, venta_id, producto_id)  # Llama al CRUD para guardar detalle

@routerRDB.get("/DetalleVentasGet/{venta_id}", response_model=list[schemas.DetalleVentaResponse])
def obtener_detalle_venta_por_venta(venta_id: int, db: Session = Depends(Clever_MySQL_conn.get_db)):
    """
    Obtiene un detalle de venta por su ID.
    """
    ventaDetalle = crud.obtener_DetalleVenta_por_id(db, venta_id)  # Busca detalles por ID de venta
    if not ventaDetalle:
        raise HTTPException(status_code=404, detail="Venta no encontrada")  # Error si no hay resultados
    return ventaDetalle  # Retorna los detalles de venta

