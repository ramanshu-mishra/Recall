import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {loginMiddleware} from "../middlewares/signin"
import {signinMiddleware} from "../middlewares/login"
import { userModel, contentModel, tagModel, linkModel } from "../models/user";
import bcrypt from "bcrypt"
const router = express.Router();
const salt = 10;
router.get("/", (req, res)=>{
    res.status(200).json({
        msg: "API is working fine"
    })
});

router.post("/api/signin", signinMiddleware , (req,res)=>{
    const name = req.body.name;
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;
    bcrypt.hash(password, salt, (err, hash)=>{
        if(err){
            res.status(500).json({
                msg:"something went wrong"
            })
        }
        userModel.create({ 
            name:name, username:username, email:email,
            password : hash
        }).then(()=>{
            res.status(200).json({
                msg: "user registered succesfully"
            })
        })
    })

});

router.post("/api/login", loginMiddleware,(req,res)=>{
    const username = req.body.username;
    const pasword = req.body.password;
    res.status(200).json({
        msg: "User logged in succesfully",
        token : req.body.token
    })
    
});

router.get("/api/fetchContent", (req,res)=>{

})

router.post("/api/addContent", (req,res)=>{

})

router.get("/api/getlink", (req,res)=>{

})

router.get("/api/disableLink", (req,res)=>{

})

router.get("/api/fetchLink", (req,res)=>{

})



export {router};