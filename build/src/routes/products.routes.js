"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = require("../middleware/validateToken");
const products_controller_1 = require("../controllers/products.controller");
const validator_middleware_1 = require("../middleware/validator.middleware");
const product_schema_1 = require("../schemas/product.schema");
const router = (0, express_1.Router)();
// router.get("/products", authRequired, getProducts)
router.get("/products", products_controller_1.getProducts);
router.get("/products/:id", validateToken_1.authRequired, products_controller_1.getProduct);
router.post("/products", validateToken_1.authRequired, (0, validator_middleware_1.validateSchema)(product_schema_1.createProductSchema), products_controller_1.createProduct);
router.delete("/products/:id", validateToken_1.authRequired, products_controller_1.deleteProduct);
router.put("/products/:id", validateToken_1.authRequired, products_controller_1.updateProduct);
exports.default = router;
//# sourceMappingURL=products.routes.js.map