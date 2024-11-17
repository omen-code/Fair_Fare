import mongoose from "mongoose";

export const connectdb=async()=>{await mongoose.connect('mongodb+srv://nishanthegde2005:9480306549@cluster0.6cvha.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log("DB connected"));

}