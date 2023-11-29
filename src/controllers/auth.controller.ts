import User from "../models/user.model.ts";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.ts";


export const register = async (req, res) => {
    const {email, password, username} = req.body;  // destructuring del body de la request

    try{
        const passwordHash = await bcrypt.hash(password, 10); // encripta la contraseña

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        })

        const userSaved = await newUser.save(); //Guardamos el usuario

        const token = await createAccessToken({id: userSaved._id}); // crea el token con el id del usuario
        
        res.cookie("token", token); // guarda el token en una cookie, y lo enviamos en el header seteado como cookie.
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            createdAt: userSaved.updatedAt,
        }); 
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const login = async(req, res) => {
    const { email, password } = req.body;  // destructuring del body de la request

    try{

        const userFound = await User.findOne({email}); //Buscamos el usuario por email en la base de datos
        if (!userFound) { //Si no se encuentra el usuario retornamos la respuesta esta
            return res.status(400).json({ message: "Usuario no encontrado" });
        } 
            
        const isMatch = await bcrypt.compare(password, userFound.password); //Compara la contraseña que viene del front con la de la base de datos
        if (!isMatch) { //Si no matchean las password retorna error
            return res.status(400).json({ message: "Credenciales incorrectas" });
        }

        const token = await createAccessToken({ id: userFound._id }); //Creamos el token para mandarlo al front
        
        res.cookie("token", token); // guarda el token en una cookie, y lo enviamos en el header seteado como cookie.
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        }); 
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const logout = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const crud = async (req, res) => {
    const userFound = await User.findById(req.user.id); //req.user.id viene del middleware validateToken el cual tiene el id, que previamente fue decodificado

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
