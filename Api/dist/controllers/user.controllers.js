"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUser = exports.getAllUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        return res
            .status(400)
            .json({ msg: "debes colocar tu correo electronico" });
    }
    const user = req.body;
    if (user.errors) {
        return res.status(200).json({ success: false, data: null, message: "Los datos registrado tienen un error" });
    }
    const UserRegister = yield user_1.default.findOne({ email: req.body.email });
    if (UserRegister) {
        return res.status(400).json({ msg: "Este usuario ya está registrado" });
    }
    const lastRecord = yield user_1.default.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
    const newuser = {
        _id: (lastRecord === null || lastRecord === void 0 ? void 0 : lastRecord.id) + 1,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role
    };
    const insert = yield user_1.default.create(newuser);
    // await newUser.save();
    return res.status(200).json({ success: true, data: insert, message: "Usuario Registrado" });
});
exports.createUser = createUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.find({});
    return res.status(200).json(user);
});
exports.getAllUser = getAllUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userMail = req.params.userMail;
    if (userMail) {
        return res.status(400).json({ success: false, data: null, message: "No se ha especificado un correo en la ruta" });
    }
    const user = yield user_1.default.findOne({ email: userMail });
    if (!user) {
        return res.status(400).json({ success: false, data: null, message: "El usuario no existe" });
    }
    user_1.default.updateOne({ email: req.body.email }, req.body);
    return res.status(200).json({ success: true, data: req.body, message: "Usuario Actualizado" });
});
exports.putUser = putUser;
