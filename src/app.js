import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import cookieParser from "cookie-parser";
import productsRoutes from "./routes/products.routes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", productsRoutes);

export default app;