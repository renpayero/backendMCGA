import { product } from 'types/index.ts';
import Product from '../models/product.model.ts'
import { Request, Response } from 'express';

export const getProducts = async (_req: Request, res: Response) => {
    try {
        const products : product[] = await Product.find({});
        return res.status(200).json(products);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const createProduct = async (req:Request, res: Response) => {
    try {
        const {nombre, precio, descripcion, categoria, stock} : product = req.body;
        const newProduct : product = new Product({
            nombre,
            precio,
            descripcion,
            categoria,
            stock,
        });
        const productSaved : product = await newProduct.save();
        return res.status(200).json(productSaved);
    }
     catch (error) {
        if (error instanceof Error) {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getProduct = async (req:Request, res: Response) => {
    try {
        const product : product | null = await Product.findById(req.params.id);
        
        return res.status(200).json(product);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const deleteProduct = async (req:Request, res: Response) => {
    try {
        //Buscamos el producto por id y lo eliminamos, guarda el producto eliminado en la variable product
        const product  = await Product.findByIdAndDelete(req.params.id);
        //si la variable product esta vacia, es porque no encontro el producto, por lo tanto retorna error 404
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        //si encontro el producto, retorna un mensaje de exito
        return res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const updateProduct = async (req:Request, res: Response) => {
    try {
        const {nombre, precio, descripcion, categoria, stock} = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            nombre,
            precio,
            descripcion,
            categoria,
            stock,
            //new: true es para que retorne el producto actualizado porque en el caso contrario se retorna el producto antes de actualizar
        }, {new: true}); 
        return res.status(200).json(updatedProduct);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}