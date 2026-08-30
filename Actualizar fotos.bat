@echo off
chcp 65001 >nul
echo Conectando las fotos de img\proyectos con cada obra...
echo.
node "%~dp0herramientas\actualizar-fotos.js"
echo.
echo Ya podes abrir index.html y revisar los cambios.
pause
