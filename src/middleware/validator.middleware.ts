import { Request, Response, NextFunction } from "express";
import { ZodError, AnyZodObject } from "zod";

//Esto es una función que retorna otra función, (programacion funcional)
export const validateSchema = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try{
        schema.parse(req.body); // compara el body con el schema
        return next(); // si todo esta bien, continua con el siguiente middleware
    }catch(error){
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.errors[0].message }); //Si hay un error, retorna el mensaje de error
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}