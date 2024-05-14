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
exports.verifyJWTToken = exports.createJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("./helpers");
function createJWTToken(id) {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    const token = jsonwebtoken_1.default.sign({ id }, secret, { expiresIn });
    return token;
}
exports.createJWTToken = createJWTToken;
function verifyJWTToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const jwtVerifyPromise = (0, helpers_1.promisify)(jsonwebtoken_1.default.verify);
        const decoded = (yield jwtVerifyPromise(token, process.env.JWT_SECRET));
        return decoded;
    });
}
exports.verifyJWTToken = verifyJWTToken;
