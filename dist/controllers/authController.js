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
exports.protect = exports.login = exports.signup = void 0;
const User_1 = require("../models/User");
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const AppError_1 = require("../utils/AppError");
const JWT_1 = require("../utils/JWT");
const helpers_1 = require("../utils/helpers");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, passwordConfirm } = req.body;
    const result = yield User_1.User.signup({ email, password, passwordConfirm });
    const id = result.insertId;
    const token = (0, JWT_1.createJWTToken)(id);
    res.status(httpStatusCodes_1.httpStatusCodes.created).json({
        status: 'success',
        token,
        data: result,
    });
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const token = yield User_1.User.login({ email, password });
    res.status(httpStatusCodes_1.httpStatusCodes.success).json({
        status: 'success',
        token,
    });
});
exports.login = login;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTcxNTY3MzQ1NSwiZXhwIjoxNzMxMjI1NDU1fQ.RkF7_SO20dgOVPl-JiQODenj0-Ng9k8ioyK2hWFD_pg';
    (0, helpers_1.getTokenOrThrow)();
    if (!token) {
        throw new AppError_1.AppError('You are not logged in! Please log in to get access', httpStatusCodes_1.httpStatusCodes.forbidden);
    }
    const decoded = yield (0, helpers_1.getDecodedTokenOrThrow)(token);
    const user = yield (0, helpers_1.getUserOrThrow)(decoded.id);
    (0, helpers_1.checkPasswordWasChangedAndThrow)(decoded.iat, user);
    next();
});
exports.protect = protect;
