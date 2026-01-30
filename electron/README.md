# CMS Platinum Scope - Electron

## Rol
Gestiona los siguientes recursos: 

- Sistema de archivos (escrituras en disco principalmente)
- Git
- Rutas relativas según JSON, directorio de imágenes y repositorio
- IPC para React

## 📂 Estructura

- main.ts -> punto de arranque
- preload.ts -> API segura para react
- utils/ -> carpeta donde se guardan funciones para los IPCHandlers

## 🔌 IPC expuestos

| Función | Qué hace |
|--------|----------|
| openFile/openDirectory | Selector de imagen/archivo para obtener su ruta en el sistema |
| copyRenameFile | Copia y renombra un archivo. Usado para la imagen de la reseña|
| writeJson | Añade al JSON |
| getRelativeImagePath | Calcula la ruta relativa de la carpeta de imágenes con respecto al JSON |
|set/getPath | Guarda u obtiene la variable guardada con electron-store |
| copyRenameFile | Copia la imagen de la ruta que le pasas, la renombra con el id de la reseña y la pega en la ruta del directorio de imágenes |
| gitAutoCommit | Con las rutas necesarias, se añade al stage todo lo que cambia en el repositorio (JSON e imágenes), se hace commit y push a origin main |

## 🔐 Seguridad

- ContextIsolation activado
- Integración con Node activado
- Preload.ts expone los handlers de IPC
- React interactua con el main a través de preload. 

***Nota: si se va a usar una API y no va a escribir nada en el sistema, es recomendable desactivar esta función para evitar incidencias como XSS.***