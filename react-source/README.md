# React + TypeScript + Vite - UI CMS

## 🔧 Rol 
Interfaz gráfica para crear las reseñas de los juegos. Si se utilizara una API para comunicarse con MongoDB u otro servicio de BB.DD. se podría migrar a un CMS web.

## ⚙️ Componentes
- TextSet: campo de texto sencillo con un label identificativo
- TextAreaSet: campo más amplio para textos más extensos. Incluye también un label
- WarningModal: modal que se coloca según los requisitos con un mensaje de lo que falla. Los usos en este proyecto son, esencialmente, para indicar campos faltantes.
- PreSaveModal: modal previo a registrar la reseña. Se usa principalmente para indicar las rutas del JSON, el directorio de imágenes y la raíz del repositorio.
- PickRouteTextSet: es parecido al TextSet, pero con la diferencia de que, en vez de escribir, seleccionas la ubicación de un archivo/directorio. 

## Flujo
1. Rellenas la reseña con los datos necesarios.
2. Se validan. Si es válido, se abre el modal de pre-guardado y se seleccionan las rutas.
3. Con todo relleno, se comprueban las rutas.
4. Si todo está bien, se llama al IPC de electron y se guarda todo.