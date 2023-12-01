import mongoose from "mongoose";
import { user } from "../types/index.ts";

const userSchema =  new mongoose.Schema({
    username: {
        type:String, //indica el tipo de dato
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
},{
    timestamps: true, //indica que se guardará la fecha de creación y modificación de cada usuario
})

export default mongoose.model<user>('User', userSchema);