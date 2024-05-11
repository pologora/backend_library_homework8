"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksRouter_1 = require("./routes/booksRouter");
const AppError_1 = require("./utils/AppError");
const errorController_1 = require("./controllers/errorController");
process.on('uncaughtException', (err) => {
    console.error(err.name, err.message);
    console.log('UNHANDLER EXEPTION! Shutting down...');
    process.exit(1);
});
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/books', booksRouter_1.booksRouter);
app.use('*', (req, res, next) => {
    const error = new AppError_1.AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(error);
});
app.use(errorController_1.globalErrorHandler);
const server = app.listen(port, () => {
    console.log(`App listening port ${port}`);
});
process.on('unhandledRejection', (err) => {
    console.error(err.name, err.message);
    console.log('UNHANDLER REJECTION! Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});
