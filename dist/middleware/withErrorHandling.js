"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorHandling = void 0;
function withErrorHandling(fn) {
    return (req, res, next) => {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
}
exports.withErrorHandling = withErrorHandling;
