import express, { Application } from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.ts';
import cookieParser from "cookie-parser";
import productsRoutes from "./routes/products.routes.ts";
import cors from "cors";


const app: Application = express();



app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", productsRoutes);

export default app;