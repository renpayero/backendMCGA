import { Router } from "express";
import {register, login, logout, crud} from "../controllers/auth.controller.js";
import { authRequired } from "../middleware/validateToken.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/crud", authRequired, crud); //Tiene un middleware, primero se ejecuta la funcion authRequired y luego la otra

export default router;