"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
const user_controllers_1 = require("../controllers/user.controllers");
router.get("/api/v1/user/list", passport_1.default.authenticate("jwt", { session: false }), user_controllers_1.getAllUser);
router.post("/api/v1/user", user_controllers_1.createUser);
router.put("/api/v1/user/:userMail", passport_1.default.authenticate("jwt", { session: false }), user_controllers_1.createUser);
exports.default = router;
