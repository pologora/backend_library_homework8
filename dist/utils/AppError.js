"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const httpStatusCodes_1 = require("./httpStatusCodes");
class AppError extends Error {
    constructor(message, statusCode = httpStatusCodes_1.httpStatusCodes.badRequest) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
    }
}
exports.AppError = AppError;
