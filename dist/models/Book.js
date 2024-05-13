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
exports.Book = void 0;
const db_1 = require("../db/db");
const AppError_1 = require("../utils/AppError");
const ValidateId_1 = require("../validation/ValidateId");
class Book extends ValidateId_1.ValidateId {
    constructor({ title, author, price, quantity = 0 }) {
        super();
        this.title = title;
        this.author = author;
        this.price = price;
        this.quantity = quantity;
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM books';
            const [rows] = yield db_1.pool.query(query);
            return rows;
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM books WHERE id = ?';
            const [rows] = yield db_1.pool.execute(query, [id]);
            if (!rows.length) {
                throw new AppError_1.AppError(`Provided id: ${id} was not found`, 404);
            }
            return rows[0];
        });
    }
    static createOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateData(data);
            const props = Object.keys(data).join(', ');
            const values = Object.values(data);
            const placeholders = values.map(() => '?').join(', ');
            const query = `INSERT INTO books (${props}) values(${placeholders})`;
            const [result] = yield db_1.pool.execute(query, values);
            if (!result.affectedRows) {
                throw new AppError_1.AppError('No recods was created. Please check your data and try again.');
            }
            return result;
        });
    }
    static deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateId(id);
            const query = 'DELETE FROM books WHERE id = ?';
            const [result] = yield db_1.pool.execute(query, [id]);
            if (!result.affectedRows) {
                throw new AppError_1.AppError('Nothing was deleted from database. Please check your data and try again.');
            }
        });
    }
    static updateOne(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateId(id);
            this.validateData(data);
            const propValues = Object.values(data).filter((value) => value != null);
            const updateString = this.generateUpdateQuery(data);
            const query = `UPDATE books SET  ${updateString} WHERE id = ?`;
            const [result] = yield db_1.pool.execute(query, [...propValues, id]);
            if (!result.affectedRows) {
                throw new AppError_1.AppError('Nothing was updated. Please check your data and try again.');
            }
        });
    }
    static generateUpdateQuery(data) {
        const updateValues = Object.entries(data)
            .filter(([_, value]) => value != null)
            .map(([key]) => `${key} = ?`)
            .join(', ');
        return updateValues;
    }
    static validateData(data) {
        Object.entries(data)
            .filter(([_, value]) => value != null)
            .forEach(([key, value]) => Book.validationMethodsMap[key](value));
    }
    static validatePrice(price) {
        if (!price || price <= 0) {
            throw new AppError_1.AppError('Error creating new book: Price is required and must be a positive number.');
        }
    }
    static validateAuthor(author) {
        if (!author || typeof author !== 'string') {
            throw new AppError_1.AppError('Error creating new book: Author is required and must be a string.');
        }
    }
    static validateQuantity(quantity) {
        if (quantity < 0 || typeof quantity !== 'number') {
            throw new AppError_1.AppError('Error creating new book: Quantity must be a non-negative number.');
        }
    }
    static validateTitle(title) {
        if (!title || typeof title !== 'string') {
            throw new AppError_1.AppError('Error creating new book: Title is required and must be a string.');
        }
    }
}
exports.Book = Book;
Book.validationMethodsMap = {
    price: Book.validatePrice,
    author: Book.validateAuthor,
    quantity: Book.validateQuantity,
    title: Book.validateTitle,
};
