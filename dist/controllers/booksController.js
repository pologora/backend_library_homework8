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
function getAllbooks(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield Book_1.Book.getAllbooks();
        res.status(200).json({ message: 'success', data });
    });
}
exports.getAllbooks = getAllbooks;
function getBookById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = yield Book_1.Book.getBook(Number(id));
        res.status(200).json({ message: 'success', data });
    });
}
exports.getBookById = getBookById;
function createNewBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: { price, author, quantity, title }, } = req.body;
        const book = new Book_1.Book({ price, author, quantity, title });
        const result = yield Book_1.Book.createBook(book);
        res.status(201).json({ message: 'success', data: result });
    });
}
exports.createNewBook = createNewBook;
function updateBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json({ message: 'success' });
    });
}
exports.updateBook = updateBook;
function deleteBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield Book_1.Book.deleteBook(Number(id));
        res.status(200).json({ message: 'success' });
    });
}
exports.deleteBook = deleteBook;
