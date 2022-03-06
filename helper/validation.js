/**
 * Common Validators Helper for app
 */
 const { validationResult } = require("express-validator");
 const httpStatus = require("http-status-codes");
 
 exports.checkError = (req, res, next) => {
   const $error = validationResult(req);
   console.log($error.array());
   if (!$error.isEmpty()) {
     return res.status(httpStatus.EXPECTATION_FAILED).json({
       status: httpStatus.EXPECTATION_FAILED,
       response: $error.array().map((o) => o.msg),
     });
   }
   next();
 };
 