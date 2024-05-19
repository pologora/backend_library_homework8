"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ebook = void 0;
const AppError_1 = require("../utils/AppError");
const Book_1 = require("./Book");
class Ebook extends Book_1.Book {
    constructor({ title, author, price, quantity, format, fileSize }) {
        super({ title, author, price, quantity });
        this.format = format;
        this.fileSize = fileSize;
    }
    /**
     * Polymorphism!
     * @param data ebook properties
     * @returns void or throw an error if one of the validation method fails
     */
    static validateData(data) {
        super.validateData(data, _a.validationMethodsMap);
    }
    static validateFormat(format) {
        if (!format || typeof format !== 'string') {
            throw new AppError_1.AppError('Error creating new book: Format must be a string.');
        }
    }
    static validateFileSize(fileSize) {
        if (!fileSize || typeof fileSize !== 'number') {
            throw new AppError_1.AppError('Error creating new book: fileSize must be a valid number.');
        }
    }
}
exports.Ebook = Ebook;
_a = Ebook;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Ebook.validationMethodsMap = Object.assign(Object.assign({}, Book_1.Book.validationMethodsMap), { format: _a.validateFormat, fileSize: _a.validateFileSize });
