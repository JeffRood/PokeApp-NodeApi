"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controllers_1 = require("../controllers/login.controllers");
const router = (0, express_1.Router)();
router.post('/api/v1/signin', login_controllers_1.signIn);
exports.default = router;
