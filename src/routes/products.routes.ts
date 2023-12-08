import { Router } from "express";
import { authRequired } from "../middleware/validateToken.ts";
import  {getProducts, getProduct, createProduct, deleteProduct, updateProduct} from "../controllers/products.controller.ts";
import { validateSchema } from "../middleware/validator.middleware.ts";
import { createProductSchema } from "../schemas/product.schema.ts";

const router = Router();

// router.get("/products", authRequired, getProducts)
router.get("/products", getProducts)
router.get("/products/:id", authRequired, getProduct)
router.post("/products", authRequired, validateSchema(createProductSchema), createProduct)
router.delete("/products/:id", authRequired, deleteProduct)
router.put("/products/:id", authRequired, updateProduct)

export default router;