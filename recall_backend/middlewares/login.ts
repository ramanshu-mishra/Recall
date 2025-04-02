import {Request, Response, NextFunction, RequestHandler} from "express";
import { userModel } from "../models/user";
import {z} from "zod";
const signinSchema = z.object({
    password : z.string().min(8),
    username : z.string().min(3).max(20),
    email : z.string().email(),
    name: z.string().max(30)
})
export async function signinMiddleware(req:Request, res:Response, next : NextFunction){
    const username = req.body.username;
    const email = req.body.email;
    const result = signinSchema.safeParse(req.body);
        if(result.success){
            try{
            const usn = await userModel.findOne({username: username});
            const eml = await userModel.findOne({email : email});
            if(usn || eml){
                res.status(400).json({
                    msg: "user already exists"
                })
                return
            }
            else{
                next();
            } 
        }
        catch(e){
            res.status(400).json({
                msg: "server error",e
            })
            return
        }
        }
        else{
            res.status(400).json({
                msg: "invalid parameters"
            })
            return
        }

}