import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";


export const register = async(req, res) => {
    const {email, password, username} = req.body;  // destructuring del body de la request

    try{
        const passwordHash = await bcrypt.hash(password, 10); // encripta la contraseña

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        })

        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id}); // crea el token con el id del usuario
        
        res.cookie("token", token); // guarda el token en una cookie, y ahorra tener que enviarlo en el header de la respuesta del backend
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

export const login = (req, res) => {
    res.send("login");
}
