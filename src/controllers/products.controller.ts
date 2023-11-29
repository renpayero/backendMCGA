import Product from '../models/product.model.js'
import mongoose from 'mongoose';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const {nombre, precio, descripcion, imagen, categoria, stock} = req.body;
        const newProduct = new Product({
            nombre,
            precio,
            descripcion,
            imagen,
            categoria,
            stock,
        });
        const productSaved = await newProduct.save();
        res.status(200).json(productSaved);
    }
     catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        //Buscamos el producto por id y lo eliminamos, guarda el producto eliminado en la variable product
        const product = await Product.findByIdAndDelete(req.params.id);
        //si la variable product esta vacia, es porque no encontro el producto, por lo tanto retorna error 404
        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" });
        }
        //si encontro el producto, retorna un mensaje de exito
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {nombre, precio, descripcion, imagen, categoria, stock} = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            nombre,
            precio,
            descripcion,
            imagen,
            categoria,
            stock,
            //new: true es para que retorne el producto actualizado porque en el caso contrario se retorna el producto antes de actualizar
        }, {new: true}); 
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}