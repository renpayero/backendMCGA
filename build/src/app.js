"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api", auth_routes_1.default);
app.use("/api", products_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map