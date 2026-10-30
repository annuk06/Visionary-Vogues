// Centralized error handler. Keeps error shape consistent across the API
// and avoids leaking stack traces in production.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.publicMessage || "Something went wrong. Please try again.",
  });
}

export function notFound(req, res) {
  res.status(404).json({ error: "Route not found." });
}
