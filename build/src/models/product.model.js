"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
        min: [0, 'El precio no puede ser menor a 0'],
    },
    descripcion: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
});
exports.default = mongoose_1.default.model('Product', productSchema);
//# sourceMappingURL=product.model.js.map