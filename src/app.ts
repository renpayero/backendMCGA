import express, { Application } from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import cookieParser from "cookie-parser";
import productsRoutes from "./routes/products.routes";
import cors from "cors";


const app: Application = express();



app.use(cors({
  origin: true,  
  credentials: true
}));
app.use(morgan('dev')); // muestra por consola las peticiones que se hacen al servidor
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", productsRoutes);

export default app;