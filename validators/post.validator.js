const httpStatus = require("http-status-codes");
const { ALLOWED_KEYS_TO_UPDATE } = require('../configs/post.config');


exports.checkIsValidBody = (req, res, next) => {
    const { body } = req;
    if(!body || !Object.keys(body).length) {
        return res.status(httpStatus.BAD_REQUEST).json({
            status: httpStatus.BAD_REQUEST
        })
    };
    return next();
}

exports.sanitizeBody = (req, res, next) => {
    const { body } = req;
    Object.keys(body).forEach(key => {
        if(!ALLOWED_KEYS_TO_UPDATE[key]) delete body[key]
    });
    return next();
}
