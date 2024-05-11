"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const booksController_1 = require("../controllers/booksController");
const withErrorHandling_1 = require("../middleware/withErrorHandling");
const booksRouter = express_1.default.Router();
exports.booksRouter = booksRouter;
booksRouter.route('/').get((0, withErrorHandling_1.withErrorHandling)(booksController_1.getAllbooks)).post((0, withErrorHandling_1.withErrorHandling)(booksController_1.createNewBook));
booksRouter
    .route('/:id')
    .get((0, withErrorHandling_1.withErrorHandling)(booksController_1.getBookById))
    .patch((0, withErrorHandling_1.withErrorHandling)(booksController_1.updateBook))
    .delete((0, withErrorHandling_1.withErrorHandling)(booksController_1.deleteBook));
