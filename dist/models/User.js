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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_1 = require("../db/db");
const AppError_1 = require("../utils/AppError");
const ValidateId_1 = require("../validation/ValidateId");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createJWT_1 = require("../helpers/createJWT");
const httpStatusCodes_1 = require("../helpers/httpStatusCodes");
class User extends ValidateId_1.ValidateId {
    constructor(name, email) {
        super();
        this.name = name;
        this.email = email;
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT id, name, email, created_at, updated_at FROM users';
            const [rows] = yield db_1.pool.query(query);
            return rows;
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateId(id);
            const query = 'SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?';
            const [rows] = yield db_1.pool.execute(query, [id]);
            if (!rows.length) {
                throw new AppError_1.AppError(`Provided id: ${id} was not found`, httpStatusCodes_1.httpStatusCodes.notFound);
            }
            return rows[0];
        });
    }
    static updateOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateId(id);
        });
    }
    static deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateId(id);
            const query = 'DELETE FROM users WHERE id = ?';
            const [result] = yield db_1.pool.execute(query, [id]);
            if (!result.affectedRows) {
                throw new AppError_1.AppError('Nothing was deleted from database. Please check your data and try again.');
            }
        });
    }
    static signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, passwordConfirm } = data;
            this.validateEmail(email);
            this.validatePassword(password, passwordConfirm);
            const encryptedPassword = yield this.encryptPassword(password);
            const query = 'INSERT INTO users (email, password) VALUES (?,?);';
            const [result] = yield db_1.pool.execute(query, [email, encryptedPassword]);
            if (!result.affectedRows) {
                throw new AppError_1.AppError('No recods was created. Please check your data and try again.');
            }
            return result;
        });
    }
    static login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            if (!email || !password) {
                throw new AppError_1.AppError('Email and password are required', httpStatusCodes_1.httpStatusCodes.unauthorized);
            }
            const query = 'SELECT id, password FROM users WHERE email = ?';
            const [result] = yield db_1.pool.execute(query, [email]);
            const { id, password: hash } = result[0];
            const compare = yield this.comparePasswordWithHash(password, hash);
            if (compare) {
                return (0, createJWT_1.createJWTToken)(id);
            }
            else {
                throw new AppError_1.AppError('Wrong email or password.', httpStatusCodes_1.httpStatusCodes.unauthorized);
            }
        });
    }
    static validateEmail(email) {
        const regex = /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;
        const valid = regex.test(email);
        if (!valid) {
            throw new AppError_1.AppError(`Email "${email}" is not valid. Please provide a valid email`);
        }
    }
    static validatePassword(password, passwordConfirm) {
        if (password !== passwordConfirm) {
            throw new AppError_1.AppError('Passwords should match.');
        }
        if (password.length < 3) {
            throw new AppError_1.AppError(`Password is required and password length should be more than 3 characters.`);
        }
    }
    static encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 12;
            const encrypted = yield bcryptjs_1.default.hash(password, saltRounds);
            return encrypted;
        });
    }
    static comparePasswordWithHash(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield bcryptjs_1.default.compare(password, hash);
            return result;
        });
    }
}
exports.User = User;
