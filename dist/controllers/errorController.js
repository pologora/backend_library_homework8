"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    return res.status(statusCode).json({ status, error: err.message });
};
exports.globalErrorHandler = globalErrorHandler;
