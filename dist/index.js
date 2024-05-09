"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksRouter_1 = require("./routes/booksRouter");
const port = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/books', booksRouter_1.booksRouter);
app.listen(port, () => {
    console.log(`App listening port ${port}`);
});
