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
exports.deleteBook = exports.updateBook = exports.createNewBook = exports.getBookById = exports.getAllbooks = void 0;
const Book_1 = require("../models/Book");
const withErrorHandling_1 = require("../middleware/withErrorHandling");
exports.getAllbooks = (0, withErrorHandling_1.withErrorHandling)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_1.Book.getAll();
    res.status(200).json({ status: 'success', data: result });
}));
exports.getBookById = (0, withErrorHandling_1.withErrorHandling)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Book_1.Book.getOne(Number(id));
    res.status(200).json({ status: 'success', data: result });
}));
exports.createNewBook = (0, withErrorHandling_1.withErrorHandling)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { price, author, quantity, title } = req.body;
    const book = new Book_1.Book({ price, author, quantity, title });
    yield Book_1.Book.createOne(book);
    res.status(201).json({ status: 'success' });
}));
exports.updateBook = (0, withErrorHandling_1.withErrorHandling)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { price, author, quantity, title } = req.body;
    yield Book_1.Book.updateOne(Number(id), { price, author, quantity, title });
    res.status(204).end();
}));
exports.deleteBook = (0, withErrorHandling_1.withErrorHandling)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Book_1.Book.deleteOne(Number(id));
    res.status(204).end();
}));
