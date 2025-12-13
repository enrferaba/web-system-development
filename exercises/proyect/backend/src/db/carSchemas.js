// src/validation/carSchemas.js
import { z } from "zod";

const baseCarSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  version: z.string().optional().or(z.literal("")),
  // slug opcional: lo generamos en el backend si no viene
  slug: z.string().min(1).optional(),
  year: z.number().int(),
  price: z.number(),
  mileage_km: z.number().int(),
  doors: z.number().int(),
  color: z.string().min(1),
  fuel_type: z.enum(["electrico", "hibrido_enchufable", "hibrido", "gasolina", "diesel"]),
  transmission: z.string().optional().or(z.literal("")),
  power_hp: z.number().int().optional(),
  description: z.string().optional().or(z.literal("")),
});

export const createCarSchema = baseCarSchema.extend({
  images: z.array(z.string().url()).optional(),
});

export const updateCarSchema = baseCarSchema.partial().extend({
  images: z.array(z.string().url()).optional(),
});
