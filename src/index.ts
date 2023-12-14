import app from './app';
import { connectDB } from './db';
import './config';
import dotenv from 'dotenv';

dotenv.config();


const PORT : string = process.env.PORT || "3000";



connectDB();
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});
