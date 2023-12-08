import { Router } from "express";
import {register, login, crud, verifyToken} from "../controllers/auth.controller.ts";
import { authRequired } from "../middleware/validateToken.ts";
import { validateSchema } from "../middleware/validator.middleware.ts";
import { registerSchema, loginSchema } from "../schemas/auth.schema.ts";

const router: Router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.get("/crud", authRequired, crud); //Tiene un middleware, primero se ejecuta la funcion authRequired y luego la otra

router.get("/verify", verifyToken);

export default router;