"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_ts_1 = require("../controllers/auth.controller.ts");
const validateToken_ts_1 = require("../middleware/validateToken.ts");
const validator_middleware_ts_1 = require("../middleware/validator.middleware.ts");
const auth_schema_ts_1 = require("../schemas/auth.schema.ts");
const router = (0, express_1.Router)();
router.post("/register", (0, validator_middleware_ts_1.validateSchema)(auth_schema_ts_1.registerSchema), auth_controller_ts_1.register);
router.post("/login", (0, validator_middleware_ts_1.validateSchema)(auth_schema_ts_1.loginSchema), auth_controller_ts_1.login);
router.get("/crud", validateToken_ts_1.authRequired, auth_controller_ts_1.crud); //Tiene un middleware, primero se ejecuta la funcion authRequired y luego la otra
router.get("/verify", auth_controller_ts_1.verifyToken);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map