import mongoose from "mongoose";
const uri = "mongodb+srv://MCGA:MCGA@cluster0.jspp4ck.mongodb.net/?retryWrites=true&w=majority";

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
