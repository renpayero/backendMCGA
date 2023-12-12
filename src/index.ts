import app from './app.ts';
import { connectDB } from './db.ts';
import './config.ts';
import dotenv from 'dotenv';

dotenv.config();


const PORT : string = process.env.PORT || "3000";



connectDB();
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});
