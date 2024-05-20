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
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const Ebook_1 = require("../models/Ebook");
const getAllbooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_1.Book.getAll();
    res.status(httpStatusCodes_1.httpStatusCodes.success).json({ status: 'success', data: result });
});
exports.getAllbooks = getAllbooks;
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Book_1.Book.getOne(Number(id));
    res.status(httpStatusCodes_1.httpStatusCodes.success).json({ status: 'success', data: result });
});
exports.getBookById = getBookById;
const createNewBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { price, author, quantity, title, format, fileSize } = req.body;
    if (format && fileSize) {
        const book = new Ebook_1.Ebook({
            price: Number(price),
            author,
            quantity: Number(quantity),
            title,
            format,
            fileSize: Number(fileSize),
        });
        yield Ebook_1.Ebook.createOne(book);
    }
    else {
        const book = new Book_1.Book({
            price: Number(price),
            author,
            quantity: Number(quantity),
            title,
        });
        yield Book_1.Book.createOne(book);
    }
    res.status(httpStatusCodes_1.httpStatusCodes.created).json({ status: 'success' });
});
exports.createNewBook = createNewBook;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { price, author, quantity, title } = req.body;
    yield Book_1.Book.updateOne(Number(id), { price, author, quantity, title });
    res.status(httpStatusCodes_1.httpStatusCodes.noContent).end();
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Book_1.Book.deleteOne(Number(id));
    res.status(httpStatusCodes_1.httpStatusCodes.noContent).end();
});
exports.deleteBook = deleteBook;
