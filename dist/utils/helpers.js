"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPasswordWasChangedAndThrow = exports.getUserOrThrow = exports.getDecodedTokenOrThrow = exports.getTokenOrThrow = exports.promisify = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const User_1 = require("../models/User");
const AppError_1 = require("./AppError");
const JWT_1 = require("./JWT");
const httpStatusCodes_1 = require("./httpStatusCodes");
function promisify(fn) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
}
exports.promisify = promisify;
function getTokenOrThrow() { }
exports.getTokenOrThrow = getTokenOrThrow;
function getDecodedTokenOrThrow(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = yield (0, JWT_1.verifyJWTToken)(token);
        return decoded;
    });
}
exports.getDecodedTokenOrThrow = getDecodedTokenOrThrow;
function getUserOrThrow(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.getOne(id).catch(() => {
            throw new AppError_1.AppError('User no longer exist!', httpStatusCodes_1.httpStatusCodes.unauthorized);
        });
        return user;
    });
}
exports.getUserOrThrow = getUserOrThrow;
function checkPasswordWasChangedAndThrow(JWTTimestamp, user) {
    if (user.passwordChangedAt) {
        const milliseconds = 1000;
        const isPasswordChanged = JWTTimestamp * milliseconds < user.passwordChangedAt.getTime();
        if (isPasswordChanged) {
            throw new AppError_1.AppError('Password was changed after token issued. Please log in again', httpStatusCodes_1.httpStatusCodes.unauthorized);
        }
    }
}
exports.checkPasswordWasChangedAndThrow = checkPasswordWasChangedAndThrow;
