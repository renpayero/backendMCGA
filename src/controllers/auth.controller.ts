import User from "../models/user.model.ts";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.ts";
import { Request, Response } from "express";
import { user } from "../types/index.ts";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.ts";

export const register = async (req: Request, res: Response) => {
    const {email, password, username} = req.body;  // destructuring del body de la request

    try{
        //Validacion por si ya existe el email al querer registrarse
        console.log("nashei")
        const userFound = await User.findOne({email});
        console.log(userFound)
        if (userFound) {
            return res.status(400).json(["El email ya existe"]);
        }

        const passwordHash : string = await bcrypt.hash(password, 10) as string; // encripta la contraseña,

        const newUser: user = new User({
            username,
            email,
            password: passwordHash,
        })

        const userSaved = await newUser.save(); //Guardamos el usuario

        const token = await createAccessToken({id: userSaved._id}); // crea el token con el id del usuario
        
        res.cookie("token", token); // guarda el token en una cookie, y lo enviamos en el header seteado como cookie.
        return res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        }); 
    }catch(error){
        if (error instanceof Error) {      
            return res.status(500).json({message: error.message});
        }
        // Si el error no es de tipo Error, maneja de otra manera y retorna una respuesta por defecto
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const login = async(req: Request, res: Response) => {
    const { email, password } = req.body;  // destructuring del body de la request

    try{

        const userFound: user | null = await User.findOne({email}); //Buscamos el usuario por email en la base de datos

        if (!userFound) { //Si no se encuentra el usuario retornamos la respuesta esta
            return res.status(400).json({ message: "Usuario no encontrado" });
        } 
        
        const isMatch: boolean = await bcrypt.compare(password, userFound.password); //Compara la contraseña que viene del front con la de la base de datos
        if (!isMatch) { //Si no matchean las password retorna error
            return res.status(400).json({ message: "Credenciales incorrectas" });
        }

        const token: string | undefined = await createAccessToken({ id: userFound._id }); //Creamos el token para mandarlo al front
        
        res.cookie("token", token); // guarda el token en una cookie, y lo enviamos en el header seteado como cookie.
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        }); 
    }catch(error){
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
        // Si el error no es de tipo Error, maneja de otra manera y retorna una respuesta por defecto
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const logout = async (_req: Request, res: Response) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const crud = async (req: Request, res: Response) => {
    
    const userFound = await User.findById(req.id); //req.user.id viene del middleware validateToken el cual tiene el id, que previamente fue decodificado

    if (!userFound) {
        return res.status(400).json({ message: "Usuario no encontrado" });
    }
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    }); 
}

// Función para verificar un token
export const verifyToken = async (req: Request, res: Response) => {
    // Obtiene el token desde las cookies de la solicitud
    const token = req.cookies;

    // Si no hay token, responde con un código de estado 401 y un mensaje
    if (!token) {
        return res.status(401).json({ message: "No está autorizado" });
    }

    // Verifica la validez del token utilizando la clave secreta (TOKEN_SECRET)
    jwt.verify(token, TOKEN_SECRET, async (err: any, payload: any) => {
        // Si hay un error en la verificación, responde con un código de estado 403 y un mensaje
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }

        // Si la verificación es exitosa, busca al usuario en la base de datos utilizando el ID del payload
        const userFound = await User.findById(payload.id);

        // Si no se encuentra al usuario, responde con un código de estado 401 y un mensaje
        if (!userFound) {
            return res.status(401).json({ message: "No está autorizado" });
        }

        // Si se encuentra el usuario, responde con los datos del usuario en formato JSON
        return res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email
        });
    });
    //!REVISAR ESTO
    // Si llega a este punto, responde con un código de estado 500 y un mensaje de error interno del servidor
    return res.status(500).json({ message: "Error interno del servidor" });
}
