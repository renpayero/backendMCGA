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
exports.updateProduct = exports.deleteProduct = exports.getProduct = exports.createProduct = exports.getProducts = void 0;
const product_model_ts_1 = __importDefault(require("../models/product.model.ts"));
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_ts_1.default.find({});
        return res.status(200).json(products);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, precio, descripcion, categoria, stock } = req.body;
        const newProduct = new product_model_ts_1.default({
            nombre,
            precio,
            descripcion,
            categoria,
            stock,
        });
        const productSaved = yield newProduct.save();
        return res.status(200).json(productSaved);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.createProduct = createProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_ts_1.default.findById(req.params.id);
        // if (!product) {
        //     return res.status(404).json({ message: "Producto no encontrado" });
        // }
        return res.status(200).json(product);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Buscamos el producto por id y lo eliminamos, guarda el producto eliminado en la variable product
        const product = yield product_model_ts_1.default.findByIdAndDelete(req.params.id);
        //si la variable product esta vacia, es porque no encontro el producto, por lo tanto retorna error 404
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        //si encontro el producto, retorna un mensaje de exito
        return res.status(200).json({ message: "Producto eliminado" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, precio, descripcion, categoria, stock } = req.body;
        const product = yield product_model_ts_1.default.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" });
        }
        const updatedProduct = yield product_model_ts_1.default.findByIdAndUpdate(req.params.id, {
            nombre,
            precio,
            descripcion,
            categoria,
            stock,
            //new: true es para que retorne el producto actualizado porque en el caso contrario se retorna el producto antes de actualizar
        }, { new: true });
        return res.status(200).json(updatedProduct);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.updateProduct = updateProduct;
//# sourceMappingURL=products.controller.js.map