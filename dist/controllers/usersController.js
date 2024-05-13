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
exports.createUser = exports.updateUser = exports.deleteUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const httpStatusCodes_1 = require("../helpers/httpStatusCodes");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_1.User.getAll();
    res.status(httpStatusCodes_1.httpStatusCodes.success).json({
        status: 'success',
        data: result,
    });
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield User_1.User.getOne(Number(id));
    res.status(httpStatusCodes_1.httpStatusCodes.success).json({
        status: 'success',
        data: result,
    });
});
exports.getUserById = getUserById;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield User_1.User.deleteOne(Number(id));
    res.status(httpStatusCodes_1.httpStatusCodes.noContent).end();
});
exports.deleteUser = deleteUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const {} = req.body;
    const { id } = req.params;
    const result = yield User_1.User.updateOne(Number(id));
    res.status(httpStatusCodes_1.httpStatusCodes.noContent).json();
});
exports.updateUser = updateUser;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const result = yield User_1.User.signup({ email, password, passwordConfirm: password });
    const id = result.insertId;
    res.status(httpStatusCodes_1.httpStatusCodes.created).json({
        status: 'success',
        data: result,
    });
});
exports.createUser = createUser;
