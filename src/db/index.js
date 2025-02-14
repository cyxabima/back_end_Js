import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectionDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB host : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(`DataBase Connection Error: ${error}`);
        process.exit(1);
    }
}

export default connectionDB