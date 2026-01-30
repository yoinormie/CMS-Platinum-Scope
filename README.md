# CMS Platinum Scope

CMS de escritorio para crear y gestionar reseñas de videojuegos
con soporte para Git, recursos multimedia y generación automática de JSON.  

Claramente no es lo más óptimo el uso de archivos como almacenamiento de datos, pero para poder hacerlo accesible para todos, se decidió esta estratégia. Si se tienen los recursos (dominio propio, servidor MongoDB, etc...) se puede adaptar el programa para usarlo como se guste.

## 🚀 Qué hace
- Crea fichas de juegos en JSON (añade la reseña en el almacenamiento)
- Gestiona imágenes en carpetas del repositorio.
- Soporta recursos para ayudar con la reseña (videos, artículos, etc.).
- Sincroniza automáticamente el JSON local con el de la web (commit al archivo, push a la rama y sincronización con Cloudflare Pages).

## 🧱 Tecnologías
- Electron (main process)
- React + Vite (UI)
- TypeScript

## 📂 Estructura
- /electron → proceso principal
- /react-source → interfaz

## 🛠️ Desarrollo

```bash
npm install
npm run dev
```
## 📦 Dependencias

- Concurrently
- Electron-store
- Electron-builder
- Simple-git
- Wait-on
- Cross-env

## 💻 Scripts
```bash
npm run dev:react 
# cd react-source && npm run dev
```
Monta el servidor de desarrollo de vite para brindar el front-end.

```bash
npm run dev:electron
# wait-on http://localhost:5173 && cross-env NODE_ENV=development electron .
```
Espera al script anterior, asigna NODE_ENV a development e inicia electron.

```bash
npm run dev
# concurrently \"npm run dev:react\" \"npm run dev:electron\"
```
Ejecuta de manera concurrente los dos scripts anteriores.

```bash
npm run build:react
# cd react-source && npm run build
```
Se mueve a la carpeta del front y construye el proyecto para producción.

```bash
npm run build:electron
# tsc -p tsconfig.json
```
Construye el proyecto de electron para producción a partir del tsconfig en la carpeta raíz.

```bash
npm run build
# npm run build:react && npm run build:electron
```
Llama a los dos scripts anteriores para formar los archivos de producción.

```bash
npm run dist
# npm run build && electron-builder
```
Llama al script anterior para formar los archivos de producción y a electron-builder para formar el ejecutable.