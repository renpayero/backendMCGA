import User from "../models/user.model.ts";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.ts";
import { Request, Response } from "express";
import { user } from "../types/index.ts";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.ts";

require('events').EventEmitter.defaultMaxListeners = 15;

export const register = async (req: Request, res: Response) => {
    const {email, password, username} = req.body;  // destructuring del body de la request

    try{
        //Validacion por si ya existe el email al querer registrarse
        const userFound = await User.findOne({email});
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

export const crud = async (req: Request, res: Response) => { //esta funcion autentica que el usuario este logueado
    
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
    const { token } = req.cookies; 
    if (!token) { // Si no hay token
        return res.status(401).json({message: "No autorizado"})  // Retorna un false que en el frontend se interpreta como que no hay token y por lo tanto no hay usuario logueado
    };
  
    jwt.verify(token, TOKEN_SECRET, async (error: jwt.VerifyErrors | null, user: any) => { // Verifica el token con el secret
      if (error) { // Si hay un error en la verificación del token
        return res.status(401).json({message: "No autorizado"}) // Si el token no es válido, retorna un 401 
    }
  
      const userFound = await User.findById(user.id); // Busca el usuario en la base de datos por el id que viene en el token decodificado 
      if (!userFound) { // Si no encuentra el usuario 
        return res.status(401).json({message: "No autorizado"}); // Retorna un 401 que en el frontend se interpreta como que no hay usuario logueado ya que el token no es válido
    }
  
      return res.json({ // Si el usuario es encontrado, retorna el usuario
        id: userFound._id, 
        username: userFound.username,
        email: userFound.email,
      });
    });
    return;
  };
