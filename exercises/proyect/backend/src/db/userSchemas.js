// src/db/userSchemas.js
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Nombre mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(3, "Contraseña mínima 3 caracteres"),
  created_at: z.date().optional(),
});
