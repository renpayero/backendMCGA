import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token) {
    return res.status(401).json({message: "No hay token, autorización invalida"});
  }
  
  jwt.verify(token, TOKEN_SECRET, (err, user) => { //User es el token decodificado, que tiene el id del usuario logueado
    if (err) {
      return res.status(403).json({message: "Token invalido"});
    }
    req.user = user; //Para los demas 
    next();
  })

}