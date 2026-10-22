# Préstamos Lab — 0902-23-4187

Aplicación web para controlar el préstamo de equipos del laboratorio de cómputo: qué equipo está prestado, a quién y hasta cuándo.

**Variante asignada (carné termina en 7):**
- Categorías: Monitor, Teclado, Mouse
- Máximo de días de préstamo: 5
- Regla adicional: mostrar en el Encabezado cuántos préstamos están vencidos

## Tecnologías

- React 18+ con TypeScript (Vite)
- json-server 0.17.4 como API REST
- CSS propio

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
git clone https://github.com/jquimy/tarea-web.git
cd prestamos-lab
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con:

```
VITE_API_URL=http://localhost:3001
```

(Puedes copiar `.env.example`.)

## Ejecución

Se necesitan dos terminales abiertas al mismo tiempo.

**Terminal 1: levantar la API**

```bash
npm run api
```

La API queda en `http://localhost:3001` (por ejemplo, `/equipos` y `/prestamos`).

**Terminal 2: levantar el frontend**

```bash
npm run dev
```

La aplicación queda en `http://localhost:5173`.

## Estructura del proyecto

```
src/
  components/   componentes de presentación
  pages/        vistas principales
  services/     funciones que llaman a la API
  hooks/        custom hooks (useEquipos, usePrestamos)
  types/        interfaces TypeScript
  utils/        utilidades de fechas
  App.tsx
db.json         datos de la API (json-server)
```

## Endpoints utilizados

| Método | Endpoint | Uso |
|---|---|---|
| GET | /equipos | Cargar el inventario |
| GET | /prestamos?devuelto=false | Cargar préstamos activos |
| POST | /prestamos | Registrar un préstamo |
| PATCH | /equipos/:id | Cambiar disponibilidad |
| PATCH | /prestamos/:id | Marcar como devuelto |