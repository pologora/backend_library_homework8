"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const AppError_1 = require("../utils/AppError");
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const handleJsonWebTokenError = () => new AppError_1.AppError('Invalid token. Please log in again!', httpStatusCodes_1.httpStatusCodes.unauthorized);
const sendErrDevelopment = (err, res) => {
    const statusCode = err.statusCode || httpStatusCodes_1.httpStatusCodes.internalServerError;
    const status = err.status || 'error';
    return res.status(statusCode).json({ status, error: err.message, message: err.message, stack: err.stack });
};
const sendErrProduction = (err, res) => {
    if (err.name === 'JsonWebTokenError' || err.name === 'JsonExpiredError') {
        err = handleJsonWebTokenError();
    }
    const statusCode = err.statusCode || httpStatusCodes_1.httpStatusCodes.internalServerError;
    const status = err.status || 'error';
    const message = err.isOperational ? err.message : 'Somthing goes wrong, please try again later';
    return res.status(statusCode).json({ status, error: message });
};
const globalErrorHandler = (err, _req, res, _next) => {
    if (!err.isOperational) {
        console.log(err);
    }
    if (process.env.NODE_ENV === 'development') {
        sendErrDevelopment(err, res);
    }
    else {
        sendErrProduction(err, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
