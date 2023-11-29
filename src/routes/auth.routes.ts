import { Router } from "express";
import {register, login, logout, crud} from "../controllers/auth.controller.js";
import { authRequired } from "../middleware/validateToken.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/crud", authRequired, crud); //Tiene un middleware, primero se ejecuta la funcion authRequired y luego la otra

export default router;