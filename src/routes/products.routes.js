import { Router } from "express";
import { authRequired } from "../middleware/validateToken.js";
import  {getProducts, getProduct, createProduct, deleteProduct, updateProduct} from "../controllers/products.controller.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { createProductSchema } from "../schemas/product.schema.js";

const router = Router();

router.get("/products", authRequired, getProducts)
router.get("/products/:id", authRequired, getProduct)
router.post("/products", authRequired, validateSchema(createProductSchema), createProduct)
router.delete("/products/:id", authRequired, deleteProduct)
router.put("/products/:id", authRequired, updateProduct)

export default router;