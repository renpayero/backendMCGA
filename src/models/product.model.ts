import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
})

export default mongoose.model('Product', productSchema);