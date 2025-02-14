import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import dotenv from "dotenv";
import express from "express";
import connectionDB from "./db/index.js";


dotenv.config()
const app = express();
connectionDB()






































/* 
direct approach to connect in a index,js file but we prefers another file in DB directory
(async () => {
    try {
        await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Error: ", error);
            throw error
        }); // this app.on listen for error for any kind of error in runtime

        app.listen(process.env.PORT, ()=>{
            console.log("App listening on ", process.env.PORT)
        })


    } catch (error) {
        console.error("Error: ", error);
        throw error
    }
})()
*/