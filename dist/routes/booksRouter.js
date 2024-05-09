"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const booksController_1 = require("../controllers/booksController");
const booksRouter = express_1.default.Router();
exports.booksRouter = booksRouter;
booksRouter.route('/').get(booksController_1.getAllbooks).post(booksController_1.createNewBook);
booksRouter.route('/:id').get(booksController_1.getBookById).patch(booksController_1.updateBook).delete(booksController_1.deleteBook);
