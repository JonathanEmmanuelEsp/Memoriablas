-- Tabla de usuarios
CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de puntuaciones
CREATE TABLE Puntuacion (
    id_puntuacion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    tabla_multiplicar INT NOT NULL,
    aciertos INT NOT NULL,
    errores INT NOT NULL,
    tiempo INT NOT NULL,
    fecha_juego DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);
