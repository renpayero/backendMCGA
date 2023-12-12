import mongoose from "mongoose";
import { config } from "dotenv";
config();
const uri : string = process.env.URL_CONNECT || "";

export const connectDB = async () => {
    try{
        await mongoose.connect(uri), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
            };
        console.log(">>> DB is connected");
    } catch(error){
        console.log("Something went wrong");
        console.log(error);
    }
}
