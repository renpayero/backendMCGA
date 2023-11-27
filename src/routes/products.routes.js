import { Router } from "express";
import { authRequired } from "../middleware/validateToken.js";

const router = Router();

router.get("/products", authRequired, (req, res) => {
  res.send("products")
})

export default router;