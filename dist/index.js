"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksRouter_1 = require("./routes/booksRouter");
const AppError_1 = require("./utils/AppError");
const errorController_1 = require("./controllers/errorController");
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/books', booksRouter_1.booksRouter);
app.use('*', (req, res, next) => {
    const error = new AppError_1.AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(error);
});
app.use(errorController_1.globalErrorHandler);
app.listen(port, () => {
    console.log(`App listening port ${port}`);
});
