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
    constructor(title, author, price, availability, id) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.availability = availability;
        this.id = id;
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
            const query = 'insert into books (id) values(0)';
            yield db_1.pool.execute(query);
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
            const { id: newId } = data;
            const query = 'update books set id = ? where id = ?';
            yield db_1.pool.execute(query, [newId, id]);
        });
    }
}
exports.Book = Book;
