import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import carsRouter from "./routes/carsRoutes.js";
import favoritesRouter from "./routes/favoritesRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import usersRouter from "./routes/usersRoutes.js";

import { requestLogger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());
app.use(requestLogger);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/cars", carsRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/api/cart", cartRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
