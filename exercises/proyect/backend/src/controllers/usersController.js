// src/controllers/usersController.js
import userModel from "../models/userModel.js";
import { userSchema } from "../db/userSchemas.js";

export const listUsers = async (req, res, next) => {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userModel.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const parsed = userSchema.parse(req.body);

    const newUser = await userModel.createUser(parsed);

    res.status(201).json(newUser);
  } catch (err) {
    // error de validación Zod
    if (err.name === "ZodError") {
      return res
        .status(400)
        .json({ error: err.errors.map((e) => e.message).join(", ") });
    }

    // error 409 que lanza el modelo si el email está repetido
    if (err.status === 409) {
      return res.status(409).json({ error: err.message });
    }

    next(err);
  }
};

// opcional: también podrías hacer un export default si quisieras
// export default { listUsers, getUserById, createUser };
