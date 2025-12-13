import { query } from "../db/pool.js";

async function getUsers() {
  const result = await query(
    "SELECT id, name, email, created_at FROM users ORDER BY id ASC"
  );
  return result.rows;
}

async function getUserById(id) {
  const result = await query(
    "SELECT id, name, email, created_at FROM users WHERE id=$1",
    [id]
  );
  return result.rows[0] || null;
}

async function createUser({ name, email, password }) {
  // Verificar email duplicado
  const existing = await query("SELECT id FROM users WHERE email=$1", [email]);
  if (existing.rowCount > 0) {
    const error = new Error("Email ya registrado");
    error.status = 409;
    throw error;
  }

  const result = await query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, 'user')
     RETURNING id, name, email, created_at`,
    [name, email, password]
  );

  return result.rows[0];
}

export default {
  getUsers,
  getUserById,
  createUser,
};
