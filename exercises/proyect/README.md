# AutoHub - Concesionario Full-Stack

App full-stack para gestionar un concesionario: catalogo filtrable, detalle de coche, favoritos, carrito y CRUD de coches. Monorepo con Express + PostgreSQL y React + Vite.

## Que hace
- Catalogo con filtros por marca, modelo, precio, ano, color, puertas, combustible y ordenacion.
- Favoritos y carrito conectados a la API.
- CRUD de coches en `/admin`.
- API REST con validaciones y seeds de base de datos.

## Stack
- Frontend: React + Vite, React Router, Axios, CSS.
- Backend: Node.js, Express, pg, zod.
- Base de datos: PostgreSQL.

## Estructura
```
backend/   # API Express + PostgreSQL
frontend/  # React + Vite
```

## Como levantarlo
### Backend
1) Crea `backend/.env`:
```
PORT=3001
DATABASE_URL=postgres://postgres:1905@localhost:5432/autohub
FRONTEND_ORIGIN=http://localhost:5173
JWT_SECRET=supersecretjwt
```
2) Instala y arranca:
```
cd backend
npm install
npm run dev
```
3) Base de datos:
```
createdb autohub   # si no existe
psql -d autohub -f src/data/init.sql
```

### Frontend
1) Crea `frontend/.env`:
```
VITE_API_URL=http://localhost:3001/api
```
2) Instala y arranca:
```
cd frontend
npm install
npm run dev
```

## Rutas del frontend
- `/home` landing.
- `/coches` listado con filtros/orden.
- `/anuncios/:slug-:id` detalle.
- `/favoritos`, `/carrito`.
- `/admin` CRUD de coches.

## API (resumen)
- **Cars**
  - `GET /api/cars` (filtros: search_make, search_model, min_price, max_price, min_year, max_year, color, doors_group, fuel_type, sort_by)
  - `GET /api/cars/count`
  - `GET /api/cars/:id`
  - `GET /api/cars/slug/:slug`
  - `POST /api/cars`
  - `PUT /api/cars/:id`
  - `DELETE /api/cars/:id`
  - `GET /api/cars/makes?q=`
  - `GET /api/cars/models?make=...&q=`
- **Favorites**
  - `GET /api/favorites`
  - `POST /api/favorites` {carId}
  - `DELETE /api/favorites/:carId`
- **Cart**
  - `GET /api/cart`
  - `POST /api/cart` {carId}
  - `DELETE /api/cart/:carId`
- **Users**
  - `GET /api/users`
  - `GET /api/users/:id`
  - `POST /api/users`

## Esquema de base de datos
```
users (id, name, email, password_hash, role, created_at)
cars (id, make, model, version, slug, year, price, mileage_km, doors, color,
      fuel_type, transmission, power_hp, description, created_at, updated_at)
car_images (id, car_id -> cars, image_url, sort_order)
favorites (id, user_id -> users, car_id -> cars, created_at, unique(user_id,car_id))
cart_items (id, user_id -> users, car_id -> cars, created_at, unique(user_id,car_id))
```

Tablas en la base (psql):
```
public.users
  id PK, name, email UNIQUE, password_hash, role, created_at

public.cars
  id PK, make, model, version, slug UNIQUE, year, price, mileage_km,
  doors, color, fuel_type, transmission, power_hp, description,
  created_at, updated_at
  FK: referenced by car_images, cart_items, favorites

public.car_images
  id PK, car_id FK -> cars(id), image_url, sort_order

public.favorites
  id PK, user_id FK -> users(id), car_id FK -> cars(id),
  created_at, UNIQUE(user_id, car_id)

public.cart_items
  id PK, user_id FK -> users(id), car_id FK -> cars(id),
  created_at, UNIQUE(user_id, car_id)
```

## Notas
- CORS restringido a `FRONTEND_ORIGIN`.
- Consultas SQL parametrizadas.
- Seeds en `src/data/init.sql` con coches, imagenes y datos de ejemplo.

## Acceso a la base con psql (ejemplo)
```
psql "postgres://postgres:1905@localhost:5432/autohub"
# o paso a paso
Server [localhost]: localhost
Database [postgres]: autohub
Port [5432]: 5432
Username [postgres]: postgres
Password: 1905
```
Comandos utiles dentro de psql:
```
\dt         -- listar tablas
\d users    -- ver estructura de una tabla
\q          -- salir
```
