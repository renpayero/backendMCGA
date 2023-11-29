import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.ts';
import cookieParser from "cookie-parser";
import productsRoutes from "./routes/products.routes.ts";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", productsRoutes);

export default app;