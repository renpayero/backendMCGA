"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    nombre: zod_1.z.string({
        required_error: 'El nombre del producto es requerido'
    }),
    precio: zod_1.z.number({
        required_error: 'El precio del producto es requerido'
    }).min(1, {
        message: 'El precio del producto debe ser mayor a 0'
    }),
    descripcion: zod_1.z.string({
        required_error: 'La descripcion del producto es requerida'
    }),
    stock: zod_1.z.number({
        required_error: 'El stock del producto es requerido'
    }).min(1, {
        message: 'El stock del producto debe ser mayor a 0'
    }),
    categoria: zod_1.z.string({
        required_error: 'La categoria del producto es requerida'
    }),
});
//# sourceMappingURL=product.schema.js.map