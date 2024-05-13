"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateId = void 0;
const AppError_1 = require("../utils/AppError");
class ValidateId {
    static validateId(id) {
        if (isNaN(id) || id <= 0) {
            throw new AppError_1.AppError('Invalid book ID. Please provide a valid positive number.');
        }
    }
}
exports.ValidateId = ValidateId;
