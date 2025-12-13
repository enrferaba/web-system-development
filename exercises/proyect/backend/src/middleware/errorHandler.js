// src/middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error("Unhandled error:", err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Error interno del servidor",
  });
};
