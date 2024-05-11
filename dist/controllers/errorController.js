"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const sendErrDevelopment = (err, res) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    return res.status(statusCode).json({ status, error: err.message, message: err.message, stack: err.stack });
};
const sendErrProduction = (err, res) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const message = err.isOperational ? err.message : 'Somthing goes wrong, please try again later';
    return res.status(statusCode).json({ status, error: message });
};
const globalErrorHandler = (err, req, res, next) => {
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
