import mongoose from "mongoose";
import { DB_NAME } from "./constant";
import express from "express";
const app = express();






































/* 
direct approach to connect in a index,js file but we prefers another file in DB directory
(async () => {
    try {
        await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Error: ", error);
            throw error
        });

        app.listen(process.env.PORT, ()=>{
            console.log("App listening on ", process.env.PORT)
        })


    } catch (error) {
        console.error("Error: ", error);
        throw error
    }
})()
*/