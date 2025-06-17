import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const jwtKey = process.env.jwtKey;
export function userAuthMiddlewareget(req:Request, res: Response, next: NextFunction){
    const token = req.headers.authorization;
    if(!token){
        res.status(400).json({
            msg: "unidentified user"
        })
        return;
    }
    try{
        const validated = jwt.verify(token, jwtKey as string) as JwtPayload;
        // console.log(validated);
        req.headers.username = validated.username;
        next();
    }
    catch{
        res.status(400).json({
            msg: "unidentified user"
        })
    }
}
export function userAuthMiddlewarepost(req:Request, res: Response, next: NextFunction){
    const token = req.headers.authorization;
    if(!token){
        res.status(400).json({
            msg: "unidentified user"
        })
        return;
    }
    try{
        const validated = jwt.verify(token, jwtKey as string) as JwtPayload;
        // console.log(validated);
        req.body.username = validated.username;
        next();
    }
    catch{
        res.status(400).json({
            msg: "unidentified user"
        })
    }
}