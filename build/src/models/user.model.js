"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String, //indica el tipo de dato
        required: true, //indica que es obligatorio
        trim: true, //indica que si el usuario ingresa espacios en blanco, estos serán eliminados
        unique: true, //indica que no puede haber dos usuarios con el mismo username
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true, //indica que se guardará la fecha de creación y modificación de cada usuario
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.model.js.map