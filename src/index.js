import dotenv from "dotenv";
import { DB_NAME } from "./constant.js";
import connectionDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config()
const port = process.env.PORT|| 8000;

connectionDB().then(
()=>{
    app.on('error',(error)=>{
        console.log("Error: ",error)
    });

    app.listen(port, ()=>{
        console.log("App listing on ",port)
    });
}
).catch((error)=>{
    console.error(`An Error Occur ${error}`)
})






































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