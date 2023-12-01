import {z} from 'zod'; //zod es una libreria que nos permite validar los datos que recibimos en el body de la peticion mediante un schema

export const registerSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es requerido'
    }).min(3, {
        message: 'El nombre de usuario debe tener al menos 3 caracteres'
    }),
    email: z.string({
        required_error: 'El email es requerido'
    }).email({
        message: 'Email invalido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(3, {
        message: 'La contraseña debe tener al menos 3 caracteres'
    }),
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'El email es requerido'
    }).email({
        message: 'Email invalido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(3, {
        message: 'La contraseña debe tener al menos 3 caracteres'
    }),
})