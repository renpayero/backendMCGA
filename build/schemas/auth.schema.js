"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod"); //zod es una libreria que nos permite validar los datos que recibimos en el body de la peticion mediante un schema
exports.registerSchema = zod_1.z.object({
    username: zod_1.z.string({
        required_error: 'El nombre de usuario es requerido'
    }).min(3, {
        message: 'El nombre de usuario debe tener al menos 3 caracteres'
    }),
    email: zod_1.z.string({
        required_error: 'El email es requerido'
    }).email({
        message: 'Email invalido'
    }),
    password: zod_1.z.string({
        required_error: 'La contraseña es requerida'
    }).min(3, {
        message: 'La contraseña debe tener al menos 3 caracteres'
    }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: 'El email es requerido'
    }).email({
        message: 'Email invalido'
    }),
    password: zod_1.z.string({
        required_error: 'La contraseña es requerida'
    }).min(3, {
        message: 'La contraseña debe tener al menos 3 caracteres'
    }),
});
//# sourceMappingURL=auth.schema.js.map