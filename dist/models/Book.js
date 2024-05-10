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
class Book {
    constructor({ title, author, price, quantity, id }) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.id = id;
        this.quantity = quantity;
    }
    static getAllbooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'select * from books';
            const [rows] = yield db_1.pool.query(query);
            return rows;
        });
    }
    static getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'select * from books where id = ?';
                const [rows] = yield db_1.pool.execute(query, [id]);
                return rows[0];
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static createBook(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const props = Object.keys(data).join(', ');
                const values = Object.values(data);
                const placeholders = values.map(() => '?').join(', ');
                const query = `insert into books (${props}) values(${placeholders})`;
                const result = yield db_1.pool.execute(query, values);
                return result;
            }
            catch (error) {
                console.error('Error creating book:', error);
                throw new Error('Failed to create book. Please try again later.');
            }
        });
    }
    static deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'DELETE FROM books WHERE id = ?';
                yield db_1.pool.execute(query, [id]);
            }
            catch (error) {
                console.error('Error deleting book:', error);
                throw error;
            }
        });
    }
    static updateBook(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const propValues = Object.values(data);
                const updateString = this.createUpdateString(data);
                const query = `UPDATE books SET  ${updateString} WHERE id = ?`;
                const result = yield db_1.pool.execute(query, [...propValues, id]);
                return result;
            }
            catch (error) {
                console.error('Error updating book:', error);
                throw new Error('Failed to update book. Please try again later.');
            }
        });
    }
    static createUpdateString(data) {
        const props = Object.keys(data);
        const updateValues = props.map((prop) => `${prop} = ?`).join(', ');
        return updateValues;
    }
}
exports.Book = Book;
