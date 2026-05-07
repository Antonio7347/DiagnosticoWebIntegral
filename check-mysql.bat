@echo off
REM Verificar que MySQL está corriendo y crear BD demo

echo.
echo Verificando MySQL...
mysql -u root -proot -e "SELECT 1" >nul 2>&1

if errorlevel 1 (
    echo.
    echo [ERROR] MySQL no está disponible.
    echo.
    echo Soluciones:
    echo 1. Instala MySQL si no lo tienes: https://dev.mysql.com/downloads/mysql/
    echo 2. Inicia el servicio MySQL desde Services (Servicios)
    echo 3. En Windows, abre cmd y escribe: net start MySQL80
    echo.
    pause
    exit /b 1
)

echo [OK] MySQL está corriendo

REM Crear base de datos
echo.
echo Creando base de datos 'demo'...
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS demo;"

if errorlevel 0 (
    echo [OK] Base de datos 'demo' lista
    echo.
    echo Ahora ejecuta:
    echo   1. Backend: mvnw.cmd spring-boot:run
    echo   2. Frontend: cd DiagnosticoWebIntegralFront ^&^& npm run dev
    echo   3. Navegador: http://localhost:5173
) else (
    echo [ERROR] No se pudo crear la BD
)

echo.
pause
