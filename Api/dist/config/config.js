"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    jwtSecret: process.env.JWT_SECRET || 'J@TOKEN%%Secret',
    DB: {
        URL: process.env.MONGODB_URL || `mongodb+srv://develop:develop@cluster0.q0i9x.mongodb.net/develop?retryWrites=true&w=majority`,
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
};
exports.default = config;
