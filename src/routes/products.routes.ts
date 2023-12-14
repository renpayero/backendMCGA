import { Router } from "express";
import { authRequired } from "../middleware/validateToken";
import  {getProducts, getProduct, createProduct, deleteProduct, updateProduct} from "../controllers/products.controller";
import { validateSchema } from "../middleware/validator.middleware";
import { createProductSchema } from "../schemas/product.schema";

const router = Router();

// router.get("/products", authRequired, getProducts)
router.get("/products", getProducts)
router.get("/products/:id", authRequired, getProduct)
router.post("/products", authRequired, validateSchema(createProductSchema), createProduct)
router.delete("/products/:id", authRequired, deleteProduct)
router.put("/products/:id", authRequired, updateProduct)

export default router;