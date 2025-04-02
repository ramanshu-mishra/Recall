    import {Request, Response, NextFunction, RequestHandler} from "express";
    import {z} from "zod";
    import bcrypt from "bcrypt";
    import { userModel } from "../models/user";
    import jwt from "jsonwebtoken";
    const jwtKey = process.env.jwtKey;
    console.log(jwtKey);
    if(!jwtKey){
        throw new Error("jwtkey not found");
    }
    const loginSchema = z.object({
        password : z.string().min(8),
        username : z.string().min(3).max(20)
    })

    export async function loginMiddleware(req:Request, res:Response, next : NextFunction){
        const password = req.body.password;
        const username = req.body.username;
        const result = loginSchema.safeParse(req.body);
        if(!result.success){
             res.status(400).json({
                msg : "invalid Parameters"
            })
            return
        }
        const user = await userModel.findOne({username:username});
        if(!user){
         res.status(400).json({
                msg: "user not found"
            })
            return
        }
        const hash = user?.password;
        try{
            const val = await bcrypt.compare(password, hash as string);
            console.log(val);
            if(val){
                console.log("signing jwt");
                const token = jwt.sign({username:username}, jwtKey as string);
                console.log("signed jwt");
                req.body.token = token;
                console.log("we got to the next function\n");
                next();
            }
            else{
                res.status(400).json({
                    msg: "user not found"
                })
            }
        }
        catch(e){
            res.status(500).json({
                msg: "internal server error",e
            })
            return
        }
        console.log("out of scope");
    }