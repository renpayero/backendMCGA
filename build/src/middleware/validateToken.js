"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "No hay token, autorización invalida" });
    }
    jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Token invalido" });
        }
        //payload trae 3 propiedades: el ID del usuario, IAT y EXP que son fechas de creacion y expiracion, este tipo de Request esta declarado en el archivo (types.d.ts) en la raiz el proyecto
        req.id = payload.id;
        return next();
    });
    return;
};
exports.authRequired = authRequired;
//# sourceMappingURL=validateToken.js.map