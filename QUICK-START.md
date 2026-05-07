# GUÍA RÁPIDA - Inicio de la Aplicación

## Requisitos
- ✅ MySQL corriendo en `localhost:3306`
- ✅ Usuario: `root`, Contraseña: `root`
- ✅ Java 17+
- ✅ Node.js + npm

## PASO 1: Verificar MySQL
```bash
check-mysql.bat
```
(Crea la base de datos `demo` automáticamente)

## PASO 2: Iniciar Backend (Terminal 1)
```bash
mvnw.cmd spring-boot:run
```
Espera hasta ver: `Started DemoApplication in X.XXX seconds`

## PASO 3: Iniciar Frontend (Terminal 2)
```bash
cd DiagnosticoWebIntegralFront
npm install
npm run dev
```
Espera hasta ver: `Local: http://localhost:5173`

## PASO 4: Abrir Navegador
```
http://localhost:5173
```

## Endpoints REST (Testing con Postman/Insomnia)
- **Obtener todos**: `GET http://localhost:8080/api/students`
- **Crear**: `POST http://localhost:8080/api/students`
  ```json
  {
    "name": "Carlos",
    "age": 21,
    "grade": "3º",
    "email": "carlos@example.com"
  }
  ```
- **Actualizar**: `PUT http://localhost:8080/api/students/1`
- **Eliminar**: `DELETE http://localhost:8080/api/students/1`

## Solucionar Problemas
| Error | Solución |
|-------|----------|
| "Cannot connect to MySQL" | Inicia MySQL: `net start MySQL80` |
| "Port 8080 already in use" | Cierra la app anterior o cambia el puerto |
| "Port 5173 already in use" | Cierra la app anterior o usa `npm run dev -- --port 5174` |
| React no se conecta | Verifica que backend esté en puerto 8080 |

## Estructura de Datos (Students)
```
{
  id: Long (auto-generado)
  name: String (requerido)
  age: Integer (requerido)
  grade: String (requerido)
  email: String (requerido)
}
```

## Base de Datos
- Host: `localhost`
- Puerto: `3306`
- Base de datos: `demo`
- Usuario: `root`
- Contraseña: `root`
- Tabla: `students` (se crea automáticamente)
