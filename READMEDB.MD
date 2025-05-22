create database Aliante;

use Aliante;

CREATE TABLE Productos (
    producto_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);

INSERT INTO Productos (nombre, descripcion, precio, stock)
VALUES 
('Bomba de Aire de Alta Gama', 'Bomba de aire portátil con diseño elegante y tecnología avanzada', 500.00, 10 ),
('Guarda Polvo de Lujo', 'Guarda polvo de cuero premium, especialmente diseñado para autos deportivos', 200.00, 30),
('Tapas de Válvula de Oro', 'Tapas de válvula en oro de 18 quilates, diseño exclusivo para autos de lujo', 150.00,  20),
('Limpia Parabrisas Ultra', 'Limpia parabrisas de alta calidad con diseño de lujo', 80.00, 30);

use Aliante;


CREATE TABLE Clientes (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT
);

INSERT INTO Clientes (nombre, apellido, correo, telefono, direccion)
VALUES 
('Carlos', 'Suárez', 'carlos.suarez@lujo.com.co', '3001234567', 'Calle 45 # 12-30, Bogotá, Colombia'),
('Ana', 'Gómez', 'ana.gomez@lujo.com.co', '3007654321', 'Carrera 7 # 22-10, Medellín, Colombia'),
('Jorge', 'Martínez', 'jorge.martinez@lujo.com.co', '3009876543', 'Avenida 10 # 15-80, Cali, Colombia');

SELECT cliente_id, nombre, apellido, correo, telefono, direccion
FROM aliante.clientes;



CREATE TABLE Ventas (
    venta_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL,
    FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id)
);

INSERT INTO Ventas (cliente_id, total)
VALUES
(1, 350.00),
(2, 450.00),
(4, 200.00);

CREATE TABLE DetalleVenta (
    detalle_id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) AS (cantidad * precio_unitario) STORED,  -- Cálculo automático del subtotal
    FOREIGN KEY (venta_id) REFERENCES Ventas(venta_id),
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id)
);

select * from usuarios;
drop table DetalleVenta;

CREATE TABLE DetalleVenta (
    detalle_id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) AS (cantidad * precio_unitario) STORED,  -- Cálculo automático del subtotal
    FOREIGN KEY (venta_id) REFERENCES Ventas(venta_id),
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id)
    
    );




CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE, 
    hashed_password VARCHAR(100) NOT NULL
);

commit;