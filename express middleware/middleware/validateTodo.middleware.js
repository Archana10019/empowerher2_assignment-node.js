export default function validateTodo(req, res, next) {
  const body = req.body;

  if (!body.title || Object.keys(body).length !== 1) {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed"
    });
  }

  next();
}
