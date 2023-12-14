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
exports.verifyToken = exports.crud = exports.login = exports.register = void 0;
const user_model_ts_1 = __importDefault(require("../models/user.model.ts"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_ts_1 = require("../libs/jwt.ts");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_ts_1 = require("../config.ts");
// import { any } from "zod";
require('events').EventEmitter.defaultMaxListeners = 15;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body; // destructuring del body de la request
    try {
        //Validacion por si ya existe el email al querer registrarse
        console.log("nashei");
        const userFound = yield user_model_ts_1.default.findOne({ email });
        console.log(userFound);
        if (userFound) {
            return res.status(400).json(["El email ya existe"]);
        }
        const passwordHash = yield bcryptjs_1.default.hash(password, 10); // encripta la contraseña,
        const newUser = new user_model_ts_1.default({
            username,
            email,
            password: passwordHash,
        });
        const userSaved = yield newUser.save(); //Guardamos el usuario
        const token = yield (0, jwt_ts_1.createAccessToken)({ id: userSaved._id }); // crea el token con el id del usuario
        res.cookie("token", token); // guarda el token en una cookie, y lo enviamos en el header seteado como cookie.
        return res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        // Si el error no es de tipo Error, maneja de otra manera y retorna una respuesta por defecto
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body; // destructuring del body de la request
    try {
        const userFound = yield user_model_ts_1.default.findOne({ email }); //Buscamos el usuario por email en la base de datos
        if (!userFound) { //Si no se encuentra el usuario retornamos la respuesta esta
            return res.status(400).json({ message: "Usuario no encontrado" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, userFound.password); //Compara la contraseña que viene del front con la de la base de datos
        if (!isMatch) { //Si no matchean las password retorna error
            return res.status(400).json({ message: "Credenciales incorrectas" });
        }
        const token = yield (0, jwt_ts_1.createAccessToken)({ id: userFound._id }); //Creamos el token para mandarlo al front
        res.cookie("token", token); // guarda el token en una cookie, y lo enviamos en el header seteado como cookie.
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        // Si el error no es de tipo Error, maneja de otra manera y retorna una respuesta por defecto
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.login = login;
const crud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield user_model_ts_1.default.findById(req.id); //req.user.id viene del middleware validateToken el cual tiene el id, que previamente fue decodificado
    if (!userFound) {
        return res.status(400).json({ message: "Usuario no encontrado" });
    }
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
});
exports.crud = crud;
// Función para verificar un token
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token) { // Si no hay token
        return res.status(401).json({ message: "No autorizado" }); // Retorna un false que en el frontend se interpreta como que no hay token y por lo tanto no hay usuario logueado
    }
    ;
    jsonwebtoken_1.default.verify(token, config_ts_1.TOKEN_SECRET, (error, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) { // Si hay un error en la verificación del token
            return res.status(401).json({ message: "No autorizado" }); // Si el token no es válido, retorna un 401 
        }
        const userFound = yield user_model_ts_1.default.findById(user.id); // Busca el usuario en la base de datos por el id que viene en el token decodificado 
        if (!userFound) { // Si no encuentra el usuario 
            return res.status(401).json({ message: "No autorizado" }); // Retorna un 401 que en el frontend se interpreta como que no hay usuario logueado ya que el token no es válido
        }
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    }));
    return;
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.controller.js.map