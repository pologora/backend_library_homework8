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
exports.login = exports.signup = void 0;
const User_1 = require("../models/User");
const createJWT_1 = require("../helpers/createJWT");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, passwordConfirm } = req.body;
    const result = yield User_1.User.signup({ email, password, passwordConfirm });
    const id = result.insertId;
    const token = (0, createJWT_1.createJWTToken)(id);
    res.status(201).json({
        status: 'success',
        token,
        data: result,
    });
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const token = yield User_1.User.login({ email, password });
    res.status(200).json({
        status: 'success',
        token,
    });
});
exports.login = login;
