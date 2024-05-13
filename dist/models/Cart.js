"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const ValidateId_1 = require("../validation/ValidateId");
class Cart extends ValidateId_1.ValidateId {
    constructor(user, books) {
        super();
        this.user = user;
        this.books = books;
    }
}
exports.Cart = Cart;
