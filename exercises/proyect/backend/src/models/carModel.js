// src/models/carModel.js
import { query, getClient } from "../db/pool.js";
import { slugify } from "../utils/slugify.js";

const buildFilters = (params) => {
  const clauses = [];
  const values = [];

  const {
    search_make,
    search_model,
    min_price,
    max_price,
    min_year,
    max_year,
    color,
    doors_group,
    fuel_type,
  } = params;

  if (search_make) {
    values.push(`%${search_make}%`);
    clauses.push(`LOWER(make) LIKE LOWER($${values.length})`);
  }
  if (search_model) {
    values.push(`%${search_model}%`);
    clauses.push(`LOWER(model) LIKE LOWER($${values.length})`);
  }
  if (min_price) {
    values.push(Number(min_price));
    clauses.push(`price >= $${values.length}`);
  }
  if (max_price) {
    values.push(Number(max_price));
    clauses.push(`price <= $${values.length}`);
  }
  if (min_year) {
    values.push(Number(min_year));
    clauses.push(`year >= $${values.length}`);
  }
  if (max_year) {
    values.push(Number(max_year));
    clauses.push(`year <= $${values.length}`);
  }
  if (color) {
    values.push(color.toLowerCase());
    clauses.push(`LOWER(color) = LOWER($${values.length})`);
  }
  if (doors_group) {
    const map = {
      "2_3": [2, 3],
      "4_5": [4, 5],
      "6_7": [6, 7],
    };
    if (map[doors_group]) {
      values.push(map[doors_group]);
      clauses.push(`doors = ANY($${values.length})`);
    }
  }
  if (fuel_type) {
    if (fuel_type.includes(",")) {
      const list = fuel_type
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
      values.push(list);
      clauses.push(`fuel_type = ANY($${values.length})`);
    } else {
      values.push(fuel_type);
      clauses.push(`fuel_type = $${values.length}`);
    }
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  return { where, values };
};

const sortMapping = {
  price_asc: "price ASC",
  price_desc: "price DESC",
  year: "year DESC",
  power: "power_hp DESC NULLS LAST",
};

async function getCars(filters) {
  const { where, values } = buildFilters(filters);
  const order = sortMapping[filters.sort_by] || "created_at DESC";

  const sql = `
    SELECT c.*, img.image_url AS primary_image
    FROM cars c
    LEFT JOIN LATERAL (
      SELECT image_url
      FROM car_images ci
      WHERE ci.car_id = c.id
      ORDER BY sort_order ASC, id ASC
      LIMIT 1
    ) img ON true
    ${where}
    ORDER BY ${order}
  `;
  const result = await query(sql, values);
  return result.rows;
}

async function countCars(filters) {
  const { where, values } = buildFilters(filters);
  const sql = "SELECT COUNT(*)::int AS count FROM cars " + where;
  const result = await query(sql, values);
  return result.rows[0].count;
}

async function getCarById(id) {
  const carResult = await query("SELECT * FROM cars WHERE id=$1", [id]);
  if (carResult.rowCount === 0) {
    return null;
  }
  const images = await query(
    "SELECT id, image_url, sort_order FROM car_images WHERE car_id=$1 ORDER BY sort_order ASC, id ASC",
    [id],
  );
  return { ...carResult.rows[0], images: images.rows };
}

async function getCarBySlug(slugValue) {
  const carResult = await query("SELECT * FROM cars WHERE slug=$1", [slugValue]);
  if (carResult.rowCount === 0) {
    return null;
  }
  const carId = carResult.rows[0].id;
  const images = await query(
    "SELECT id, image_url, sort_order FROM car_images WHERE car_id=$1 ORDER BY sort_order ASC, id ASC",
    [carId],
  );
  return { ...carResult.rows[0], images: images.rows };
}

async function listMakes(q) {
  const values = [];
  let where = "";
  if (q) {
    values.push(`%${q}%`);
    where = "WHERE LOWER(make) LIKE LOWER($1)";
  }
  const result = await query(
    `SELECT DISTINCT make FROM cars ${where} ORDER BY make ASC`,
    values,
  );
  return result.rows.map((r) => r.make);
}

async function listModels({ make, q }) {
  if (!make) {
    throw Object.assign(new Error("make requerido"), { status: 400 });
  }
  const values = [make];
  let where = "WHERE LOWER(make)=LOWER($1)";
  if (q) {
    values.push(`%${q}%`);
    where += ` AND LOWER(model) LIKE LOWER($${values.length})`;
  }
  const result = await query(
    `SELECT DISTINCT model FROM cars ${where} ORDER BY model ASC`,
    values,
  );
  return result.rows.map((r) => r.model);
}

async function createCar(data) {
  const client = await getClient();

  try {
    await client.query("BEGIN");

    const finalSlug =
      data.slug ||
      slugify(
        `${data.make}-${data.model}-${data.version || ""}-${data.year}-${data.fuel_type}`,
      );

    const insertCar = `
      INSERT INTO cars (make, model, version, slug, year, price, mileage_km, doors,
                        color, fuel_type, transmission, power_hp, description)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *
    `;

    const carResult = await client.query(insertCar, [
      data.make,
      data.model,
      data.version || "",
      finalSlug,
      data.year,
      data.price,
      data.mileage_km,
      data.doors,
      data.color,
      data.fuel_type,
      data.transmission || "",
      data.power_hp || null,
      data.description || "",
    ]);

    const carId = carResult.rows[0].id;

    if (data.images?.length) {
      const values = data.images.flatMap((url, idx) => [carId, url, idx]);
      const placeholders = data.images.map(
        (_, idx) => `($${idx * 3 + 1}, $${idx * 3 + 2}, $${idx * 3 + 3})`,
      );
      await client.query(
        `INSERT INTO car_images (car_id, image_url, sort_order)
         VALUES ${placeholders.join(",")}`,
        values,
      );
    }

    await client.query("COMMIT");
    return carResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function updateCar(id, data) {
  const client = await getClient();

  try {
    await client.query("BEGIN");

    const existing = await client.query("SELECT * FROM cars WHERE id=$1", [id]);
    if (existing.rowCount === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    const updates = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
      if (key === "images") return;
      updates.push(`${key}=$${updates.length + 1}`);
      values.push(value);
    });

    if (updates.length) {
      values.push(id);
      await client.query(
        `UPDATE cars
         SET ${updates.join(",")}, updated_at=NOW()
         WHERE id=$${values.length}`,
        values,
      );
    }

    if (data.images) {
      await client.query("DELETE FROM car_images WHERE car_id=$1", [id]);
      if (data.images.length) {
        const vals = data.images.flatMap((url, idx) => [id, url, idx]);
        const placeholders = data.images.map(
          (_, idx) => `($${idx * 3 + 1}, $${idx * 3 + 2}, $${idx * 3 + 3})`,
        );
        await client.query(
          `INSERT INTO car_images (car_id, image_url, sort_order)
           VALUES ${placeholders.join(",")}`,
          vals,
        );
      }
    }

    await client.query("COMMIT");
    const result = await query("SELECT * FROM cars WHERE id=$1", [id]);
    return result.rows[0] || null;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function deleteCar(id) {
  const result = await query("DELETE FROM cars WHERE id=$1 RETURNING id", [id]);
  return result.rowCount > 0;
}

export default {
  getCars,
  countCars,
  getCarById,
  getCarBySlug,
  listMakes,
  listModels,
  createCar,
  updateCar,
  deleteCar,
};
