-- Schema
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  version VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  year INTEGER NOT NULL,
  price INTEGER NOT NULL,
  mileage_km INTEGER NOT NULL,
  doors INTEGER NOT NULL,
  color VARCHAR(100) NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  transmission VARCHAR(50),
  power_hp INTEGER,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS car_images (
  id SERIAL PRIMARY KEY,
  car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, car_id)
);

CREATE TABLE IF NOT EXISTS cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, car_id)
);

-- Seed users
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin', 'admin@autohub.com', '$2b$10$J0KdNHWMWdiWj51/hfxFJ.B6hBBp86/5UlD.UPUIO0nsHqNItN4cq', 'admin'),
('Cliente', 'cliente@autohub.com', '$2b$10$L3A8aIv4qaKiaoUZyIcGN.xoRVlqGsS/JuT0ae2Xbt9li5gFxUC6O', 'user')
ON CONFLICT (email) DO NOTHING;

-- Seed cars
INSERT INTO cars (make, model, version, slug, year, price, mileage_km, doors, color, fuel_type, transmission, power_hp, description) VALUES
('Audi', 'Q8', 'TFSIe Black Line Quattro Tiptronic', 'audi-q8-tfsie-black-line-quattro-tiptronic', 2023, 98000, 5000, 5, 'negro', 'hibrido_enchufable', 'automatico', 381, 'SUV deportivo de lujo con acabado Black Line.'),
('Tesla', 'Model 3', 'Gran Autonomía', 'tesla-model-3-gran-autonomia', 2022, 52000, 12000, 4, 'blanco', 'electrico', 'automatico', 283, 'Sedán eléctrico con gran autonomía y Autopilot.'),
('BMW', 'X5', 'xDrive45e', 'bmw-x5-xdrive45e', 2021, 75000, 30000, 5, 'gris', 'hibrido_enchufable', 'automatico', 394, 'SUV premium híbrido enchufable.'),
('Toyota', 'Corolla', 'Active Tech', 'toyota-corolla-active-tech', 2020, 21000, 45000, 5, 'rojo', 'hibrido', 'automatico', 122, 'Compacto híbrido eficiente.'),
('Ford', 'Mustang', 'GT Fastback', 'ford-mustang-gt-fastback', 2019, 48000, 35000, 3, 'azul', 'gasolina', 'manual', 450, 'Muscle car icónico con motor V8.'),
('Volkswagen', 'Golf', 'GTI', 'volkswagen-golf-gti', 2021, 37000, 18000, 5, 'blanco', 'gasolina', 'automatico', 245, 'Compacto deportivo con alto rendimiento.')
ON CONFLICT (slug) DO NOTHING;

-- Clear and seed images with reliable URLs
DELETE FROM car_images;
WITH imgs(slug, url, sort_order) AS (
  VALUES
    -- Audi Q8 (Q8 e-tron)
    ('audi-q8-tfsie-black-line-quattro-tiptronic', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200', 0),
    ('audi-q8-tfsie-black-line-quattro-tiptronic', 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200', 1),
    ('audi-q8-tfsie-black-line-quattro-tiptronic', 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200', 2),
    -- Tesla Model 3
    ('tesla-model-3-gran-autonomia', 'https://fotos.quecochemecompro.com/volkswagen-golf/volkswagen-golf-vista-delantera.jpg?size=750x400', 0),
    ('tesla-model-3-gran-autonomia', 'https://fotos.quecochemecompro.com/volkswagen-golf/volkswagen-golf-vista-delantera.jpg?size=750x400', 1),
    ('tesla-model-3-gran-autonomia', 'https://fotos.quecochemecompro.com/volkswagen-golf/volkswagen-golf-vista-delantera.jpg?size=750x400', 2),
    -- BMW X5
    ('bmw-x5-xdrive45e', 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200', 0),
    ('bmw-x5-xdrive45e', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200', 1),
    ('bmw-x5-xdrive45e', 'https://images.pexels.com/photos/277058/pexels-photo-277058.jpeg?auto=compress&cs=tinysrgb&w=1200', 2),
    -- Toyota Corolla
    ('toyota-corolla-active-tech', 'https://fotos.quecochemecompro.com/toyota-corolla-touring-sports/toyota-corolla-touring-sports-frente.jpg?size=750x400', 0),
    ('toyota-corolla-active-tech', 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200', 1),
    ('toyota-corolla-active-tech', 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200', 2),
    -- Ford Mustang
    ('ford-mustang-gt-fastback', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80', 0),
    ('ford-mustang-gt-fastback', 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80', 1),
    ('ford-mustang-gt-fastback', 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80&sat=-100', 2),
    -- Volkswagen Golf GTI
    ('volkswagen-golf-gti', 'https://assets.volkswagen.com/is/image/volkswagenag/turismo_nuevo_golf_stage_2560x1440px1?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==', 0),
    ('volkswagen-golf-gti', 'https://fotos.quecochemecompro.com/volkswagen-golf/volkswagen-golf-vista-delantera.jpg?size=750x400', 1),
    ('volkswagen-golf-gti', 'https://images.pexels.com/photos/244821/pexels-photo-244821.jpeg?auto=compress&cs=tinysrgb&w=1200', 2)
)
INSERT INTO car_images (car_id, image_url, sort_order)
SELECT c.id, i.url, i.sort_order
FROM cars c
JOIN imgs i ON i.slug = c.slug
ON CONFLICT DO NOTHING;

-- Favorites/cart samples
INSERT INTO favorites (user_id, car_id)
SELECT 2, id FROM cars WHERE make IN ('Audi','Tesla') ON CONFLICT DO NOTHING;

INSERT INTO cart_items (user_id, car_id)
SELECT 2, id FROM cars WHERE make = 'Toyota' LIMIT 1 ON CONFLICT DO NOTHING;
