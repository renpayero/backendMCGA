"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
//Esto es una función que retorna otra función, (programacion funcional)
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); // compara el body con el schema
        return next(); // si todo esta bien, continua con el siguiente middleware
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json([error.errors[0].message]); //Si hay un error, retorna el mensaje de error
        }
        return res.status(500).json(["Error interno del servidor"]);
    }
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validator.middleware.js.map