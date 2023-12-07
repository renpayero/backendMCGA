import {z} from 'zod';

export const createProductSchema = z.object({
    nombre: z.string({
        required_error: 'El nombre del producto es requerido'
    }),
    precio: z.number({
        required_error: 'El precio del producto es requerido'
    }).min(1, {
        message: 'El precio del producto debe ser mayor a 0'
    }),
    descripcion: z.string({
        required_error: 'La descripcion del producto es requerida'
    }),
    stock: z.number({
        required_error: 'El stock del producto es requerido'
    }).min(1, {
        message: 'El stock del producto debe ser mayor a 0'
    }),
    categoria: z.string({
        required_error: 'La categoria del producto es requerida'
    }),
})