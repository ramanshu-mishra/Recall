import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import {router} from "./routes/routes";

const PORT = process.env.PORT||3000;
const uri = process.env.uri;


const app = express();
app.use(express.json());
app.use('/', router);

function connect(uri:string){
    mongoose.connect(uri).then(()=>{
        console.log("database connected succesfully");
        app.listen(PORT, ()=>{
            console.log(`listening at PORT ${PORT}`);
        });
    })
}
console.log(uri);
connect(uri as string);


