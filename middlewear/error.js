const httpStatus = require("http-status-codes");

/**
 * @description Catch 404 Error if no route found
 */
const handleNotFound = (req, res) => {
  return res.status(httpStatus.NOT_FOUND).json({
    status: false,
    message: "Resource not available",
    statusCode: httpStatus.NOT_FOUND,
  });
};

const handleImageError = (error, req, res, next) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message })
}

module.exports = {
  handleNotFound,
  handleImageError
};
