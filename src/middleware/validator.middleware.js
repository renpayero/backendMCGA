export const validateSchema = (schema) => (req, res, next) =>{
    try{
        schema.parse(req.body); // compara el body con el schema
        next(); // si todo esta bien, continua con el siguiente middleware
    }catch(error){
        return res.status(400).json({ message: error.errors[0].message }) //Si hay un error, retorna el mensaje de error
    }
}