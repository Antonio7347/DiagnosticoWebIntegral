# 📚 Control de Estudiantes - Diagnóstico Web Integral

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.6-green?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2.5-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

> Aplicación web CRUD completa para la gestión integral de estudiantes. Desarrollada con tecnologías modernas y mejores prácticas de desarrollo web.

---

## 🎯 Descripción General

**Control de Estudiantes** es una aplicación web de pila completa (full-stack) que permite gestionar información de estudiantes de manera eficiente. Implementa todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con una interfaz intuitiva y un backend robusto.

### Características principales:
- ✅ Registro de nuevos estudiantes
- ✅ Consulta de lista completa de estudiantes
- ✅ Edición de información de estudiantes
- ✅ Eliminación de registros
- ✅ Almacenamiento persistente en MySQL
- ✅ API REST documentada y funcional
- ✅ Interfaz responsiva y moderna

---

## 🛠️ Tecnologías Utilizadas

### Backend
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **Spring Boot** | 4.0.6 | Framework principal del backend |
| **Spring Data JPA** | - | Mapeo objeto-relacional |
| **MySQL** | 8.0+ | Base de datos principal |
| **Java** | 17 | Lenguaje de programación |

### Frontend
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 19.2.5 | Librería de UI |
| **Vite** | 8.0.10 | Bundler y dev server |
| **JavaScript** | ES2022 | Lenguaje base |
| **CSS** | 3 | Estilos responsivos |

---

## 📋 Estructura del Proyecto

```
DiagnosticoWebIntegral/
├── src/
│   ├── main/
│   │   ├── java/com/example/demo/
│   │   │   ├── DemoApplication.java       # Punto de entrada Spring Boot
│   │   │   ├── model/
│   │   │   │   └── Student.java           # Entidad de base de datos
│   │   │   ├── repository/
│   │   │   │   └── StudentRepository.java # Acceso a datos JPA
│   │   │   └── controller/
│   │   │       └── StudentController.java # Endpoints REST
│   │   └── resources/
│   │       └── application.properties     # Configuración MySQL
│   └── test/
├── DiagnosticoWebIntegralFront/
│   ├── src/
│   │   ├── App.jsx                        # Componente principal React
│   │   ├── App.css                        # Estilos de la aplicación
│   │   ├── index.css                      # Estilos globales
│   │   └── main.jsx                       # Punto de entrada React
│   ├── package.json
│   └── vite.config.js
├── pom.xml                                 # Dependencias Maven
├── mvnw / mvnw.cmd                         # Maven Wrapper
└── README.md
```

---

## ⚙️ Requisitos Previos

Antes de iniciar, asegúrate de tener instalado:

- **Java Development Kit (JDK)** 17 o superior
  - [Descargar JDK](https://www.oracle.com/java/technologies/downloads/)
- **MySQL** 8.0 o superior
  - [Descargar MySQL](https://dev.mysql.com/downloads/mysql/)
- **Node.js** v16 o superior (incluye npm)
  - [Descargar Node.js](https://nodejs.org/)
- **Maven** 3.6+ (incluido con Maven Wrapper)

### Verificar instalaciones:
```bash
# Java
java -version

# MySQL
mysql --version

# Node.js
node --version && npm --version
```

---

## 🚀 Guía de Instalación

### 1️⃣ Configurar MySQL

**Opción A: Crear BD manualmente**
```bash
mysql -u root -proot
```
```sql
CREATE DATABASE demo;
EXIT;
```

**Opción B: Comando único**
```bash
mysql -u root -proot -e "CREATE DATABASE demo;"
```

✅ Verifica que se creó correctamente:
```bash
mysql -u root -proot -e "SHOW DATABASES;" | findstr demo
```

### 2️⃣ Clonar y Preparar el Proyecto

```bash
# Navegar a la carpeta del proyecto
cd DiagnosticoWebIntegral

# Compilar backend (opcional pero recomendado)
mvnw.cmd clean package -DskipTests
```

### 3️⃣ Iniciar el Backend

**En Windows:**
```bash
mvnw.cmd spring-boot:run
```

**En Linux/Mac:**
```bash
./mvnw spring-boot:run
```

✅ Espera a ver este mensaje:
```
Tomcat initialized with port 8080 (http)
...
Started DemoApplication in X.XXX seconds
```

### 4️⃣ Iniciar el Frontend

**En otra terminal:**
```bash
cd DiagnosticoWebIntegralFront
npm install
npm run dev
```

✅ Espera a ver:
```
Local: http://localhost:5173
```

### 5️⃣ Abrir en el Navegador

Abre tu navegador en: **http://localhost:5173**

---

## 📡 API REST - Endpoints

### Base URL
```
http://localhost:8080/api/students
```

### Operaciones Disponibles

#### 📖 Obtener todos los estudiantes
```http
GET /api/students
```
**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Carlos",
    "age": 21,
    "grade": "3º",
    "email": "carlos@example.com"
  }
]
```

#### 🔍 Obtener estudiante por ID
```http
GET /api/students/{id}
```
**Ejemplo:**
```bash
curl http://localhost:8080/api/students/1
```

#### ➕ Crear nuevo estudiante
```http
POST /api/students
Content-Type: application/json

{
  "name": "Juan",
  "age": 20,
  "grade": "2º",
  "email": "juan@example.com"
}
```

**Respuesta (201 Created):**
```json
{
  "id": 2,
  "name": "Juan",
  "age": 20,
  "grade": "2º",
  "email": "juan@example.com"
}
```

#### ✏️ Actualizar estudiante
```http
PUT /api/students/{id}
Content-Type: application/json

{
  "name": "Juan Carlos",
  "age": 21,
  "grade": "3º",
  "email": "jcarlos@example.com"
}
```

#### 🗑️ Eliminar estudiante
```http
DELETE /api/students/{id}
```

---

## 🎨 Interfaz de Usuario

### Características Frontend

- **Formulario Intuitivo**: Campos para nombre, edad, grado y correo
- **Lista Dinámica**: Tabla actualizada en tiempo real
- **Acciones Rápidas**: Botones Editar y Eliminar en cada fila
- **Validación**: Verificación de campos obligatorios
- **Feedback Visual**: Mensajes de estado para cada acción
- **Diseño Responsivo**: Adaptable a dispositivos móviles

---

## 🗄️ Modelo de Datos

### Tabla: `students`

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| `name` | VARCHAR(255) | NOT NULL | Nombre del estudiante |
| `age` | INT | - | Edad del estudiante |
| `grade` | VARCHAR(255) | - | Grado académico |
| `email` | VARCHAR(255) | - | Correo electrónico |

**Creada automáticamente por Hibernate al iniciar la aplicación.**

---

## 🔧 Configuración

### application.properties (Backend)

```properties
# Base de Datos
spring.datasource.url=jdbc:mysql://localhost:3306/demo
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

---

## 🐛 Solución de Problemas

### ❌ Error: "Unknown database 'demo'"

**Causa:** La base de datos no existe en MySQL

**Solución:**
```bash
mysql -u root -proot -e "CREATE DATABASE demo;"
```

### ❌ Error: "Port 8080 already in use"

**Causa:** Otra aplicación está usando el puerto 8080

**Solución:**
```bash
# Buscar proceso en puerto 8080
netstat -ano | findstr :8080

# Matar el proceso (reemplaza PID)
taskkill /PID <PID> /F
```

### ❌ Error: "Cannot connect to MySQL"

**Causa:** MySQL no está ejecutándose

**Solución:**
```bash
# Iniciar servicio MySQL en Windows
net start MySQL80

# O abre MySQL Command Line Client manualmente
```

### ❌ Error: "npm: command not found"

**Causa:** Node.js no está instalado

**Solución:** [Descargar Node.js](https://nodejs.org/)

### ❌ React no se conecta al backend

**Verificar:**
1. Backend está corriendo en `http://localhost:8080`
2. Consola del navegador (F12) sin errores CORS
3. Base de datos `demo` existe en MySQL

---

## 📊 Flujo de la Aplicación

```
┌─────────────┐
│  Navegador  │ (http://localhost:5173)
│  (React)    │
└──────┬──────┘
       │ fetch API
       ▼
┌──────────────────────────────┐
│   React SPA                  │
│  ├─ Formulario de entrada    │
│  ├─ Tabla de estudiantes     │
│  ├─ Botones CRUD             │
│  └─ Manejo de estado         │
└──────┬───────────────────────┘
       │ HTTP REST
       ▼
┌──────────────────────────────┐
│ Spring Boot Backend          │
│ (http://localhost:8080)      │
│  ├─ GET    /api/students     │
│  ├─ POST   /api/students     │
│  ├─ PUT    /api/students/:id │
│  └─ DELETE /api/students/:id │
└──────┬───────────────────────┘
       │ SQL Queries
       ▼
┌──────────────────────────────┐
│ MySQL Database               │
│ (localhost:3306)             │
│  └─ Base de datos: demo      │
│     └─ Tabla: students       │
└──────────────────────────────┘
```

---

## 📖 Ejemplos de Uso

### Crear un estudiante (Frontend)
1. Completa el formulario con datos
2. Haz clic en "Guardar"
3. Verás el mensaje de confirmación
4. El estudiante aparece en la tabla

### Editar un estudiante
1. Haz clic en "Editar" en la tabla
2. El formulario se prellenarán con los datos
3. Modifica los campos deseados
4. Haz clic en "Actualizar"

### Eliminar un estudiante
1. Haz clic en "Eliminar" en la tabla
2. Confirma la acción en el diálogo
3. El estudiante se elimina de la tabla

---

## 🚀 Mejoras Futuras

- [ ] Autenticación y autorización de usuarios
- [ ] Buscar y filtrar estudiantes
- [ ] Exportar datos a CSV/PDF
- [ ] Paginación de resultados
- [ ] Sistema de roles (Admin, Profesor, Estudiante)
- [ ] Historial de cambios
- [ ] Gráficos y reportes
- [ ] Pruebas unitarias e integración

---

## 📞 Soporte

Para reportar problemas o solicitar funcionalidades, crea un issue en el repositorio.

---

## 📝 Notas Técnicas

- El backend se ejecuta en **http://localhost:8080**
- El frontend se ejecuta en **http://localhost:5173**
- Las tablas se crean automáticamente en MySQL con Hibernate (`ddl-auto=update`)
- CORS está habilitado para permitir solicitudes desde el frontend
- La comunicación es mediante REST API con formato JSON

---

**Desarrollado con ❤️ para el Diagnóstico Web Integral**

