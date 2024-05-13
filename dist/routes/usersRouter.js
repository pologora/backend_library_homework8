"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const withErrorHandling_1 = require("../middleware/withErrorHandling");
const usersController_1 = require("../controllers/usersController");
const usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
usersRouter.post('/signup', (0, withErrorHandling_1.withErrorHandling)(authController_1.signup));
usersRouter.post('/login', (0, withErrorHandling_1.withErrorHandling)(authController_1.login));
usersRouter.route('/').get((0, withErrorHandling_1.withErrorHandling)(usersController_1.getAllUsers));
usersRouter
    .route('/:id')
    .delete((0, withErrorHandling_1.withErrorHandling)(usersController_1.deleteUser))
    .get((0, withErrorHandling_1.withErrorHandling)(usersController_1.getUserById))
    .patch((0, withErrorHandling_1.withErrorHandling)(usersController_1.updateUser));
