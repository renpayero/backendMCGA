import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.ts";
import { Request,Response,NextFunction } from "express";
import { payload } from "../types/index.js";


export const authRequired = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  
  if (!token) {
    return res.status(401).json({message: "No hay token, autorización invalida"});
  }
  
   jwt.verify(token, TOKEN_SECRET, (err: jwt.VerifyErrors | null, payload: payload | any )  => { //User es el token decodificado, que tiene el id del usuario logueado
    
    if (err) {
      return res.status(403).json({message: "Token invalido"});
    }

    //payload trae 3 propiedades: el ID del usuario, IAT y EXP que son fechas de creacion y expiracion, este tipo de Request esta declarado en el archivo (types.d.ts) en la raiz el proyecto
    req.id = payload.id;
    return next();
  })
  return;
}