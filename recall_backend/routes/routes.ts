import express from "express";
import mongoose from "mongoose";
import {Types} from "mongoose";
import jwt from "jsonwebtoken";
import {loginMiddleware} from "../middlewares/signin"
import {signinMiddleware} from "../middlewares/login"
import { userModel, contentModel, tagModel, linkModel, Iuser } from "../models/user";
import { userAuthMiddlewareget, userAuthMiddlewarepost } from "../middlewares/userauth";
import bcrypt from "bcrypt"
import { boolean } from "zod";

const router = express.Router();
const salt = 10;

async function generateId() {
    const { nanoid } = await import("nanoid");
    const hash =  nanoid(8);
    return hash;
}

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
            return;
        })
    })

});

router.post("/api/login", loginMiddleware,(req,res)=>{
    const username = req.body.username;
    const pasword = req.body.password;
    res.status(200).json({
        msg: "User logged in succesfully",
        token : req.body.token,
        name: req.body.name,
        username: req.body.username
    })
    return
});

router.get("/api/username",async (req,res)=>{
    const username = req.headers.username;
    if(!username ){
        res.status(400).json({
            msg: "username not sent"
        })
        return;
    }
    try{
    const user = await userModel.findOne({username: username});
    if(user){
        res.status(200).json({
            msg: "exists"
        })
        return;
    }
    else{
        res.status(200).json({
            msg: "dont-exists"
        })
    }
}
catch(e){
    res.status(500).json({
        msg: "internal server error"
    })
    return;
}})
router.get("/api/email",async (req,res)=>{
    const email = req.headers.email ;
    if(!email){
        res.status(400).json({
            msg: "username not sent"
        })
        return;
    }
    try{
    const user = await userModel.findOne({email: email});
    if(user){
        res.status(200).json({
            msg: "exists"
        })
        return;
    }
    else{
        res.status(200).json({
            msg: "dont-exists"
        })
        return;
    }
}
catch(e){
    res.status(500).json({
        msg: "internal server error"
    })
    return;
}

})

router.get("/api/fetchContent", userAuthMiddlewareget,async (req,res)=>{
    const usr = await userModel.findOne({username : req.headers.username});
    const userId = usr?._id;
    const content = await contentModel.find({userId : userId}).populate("tags");
    console.log(content);
    res.status(200).json({
        content : content
    })
    return
})


router.post("/api/addContent", userAuthMiddlewarepost, async (req,res)=>{
    const title = req.body.title;
    const description = req.body.description? req.body.description: "";
    const type  = req.body.type;
    const link = req.body.link;
    const tags : string[] = req.body.tags;
    const image = req.body.image;
    const username = req.body.username;
    const usr = await userModel.findOne({username:username});
    const userId = usr?._id;
    const refs: mongoose.Types.ObjectId[] = [];
    console.log(tags);
    for(let i = 0; i< tags.length; i++){
        let tg = await tagModel.findOne({title: tags[i]});
        if(!tg){
            tg = await tagModel.create({title: tags[i]});
        }
        refs.push(tg?._id as mongoose.Types.ObjectId);
    }
    try{
    await contentModel.create({
        title: title,
        description: description,
        type: type,
        link: link,
        tags: refs,
        userId : userId,
        image: image
    })
    res.status(200).json({
        msg: "content added succesfully"
    })
    return;
}
catch(e){
    res.status(400).json({
        msg: "could not add content"
    })
    return;
}
})


router.get("/api/deleteContent", async (req,res)=>{
    const id = req.headers.id;
    try{
        await contentModel.deleteOne({_id:id});
        res.status(200).json({
            msg: `deleted content-id: ${id}`
        })
        return;
    }
    catch(e){
        res.status(400).json({
            msg: `id: ${id} not found in database`
        })
        return;
    }
})

router.get("/api/getlink", userAuthMiddlewareget,async (req,res)=>{
    const usr = await userModel.findOne({username: req.headers.username});
    const port = process.env.PORT||3000;
    let userId;
    if(usr){
        userId = usr._id;
    }
    const u = await linkModel.findOne({userId: userId});
    if(u){
        const l = u.hash
        const b = `http://localhost:${port}/u/${l}`
       res.status(200).json({
        link : b
       }) 
       return;
    }
    let uniqueId;
    while(true){
        uniqueId = await generateId();
        const hash = await linkModel.findOne({hash:uniqueId});
        if(!hash){
            break;
        }
    }
    await linkModel.create({
        userId : userId,
        hash : uniqueId,
    })
    const base = `http://localhost:${port}/u/${uniqueId}`
    res.status(200).json({
        link : base
    })
    return;
})

router.get("/api/toggleLink", userAuthMiddlewareget,async (req,res)=>{
    
    const usr = await userModel.findOne({username: req.headers.username});
    let userId;
    if(usr){
        userId = usr._id;
    }
    try{

    let hsh = await linkModel.findOne({userId: userId});
    if(!hsh){
        let uniqueId;
        while(true){
            uniqueId = await generateId();
            const hash = await linkModel.findOne({hash:uniqueId});
            if(!hash){
                break;
            }
        }
        hsh = await linkModel.create({
            userId : userId,
            hash : uniqueId,
        })
    }
     const b = hsh?.share ;
     console.log(b);
     await linkModel.updateOne({userId: userId}, {share : !b});

    res.status(200).json({
        msg: `sharing toggled to ${!b}`
    })
    return;
}
catch(e){
    res.status(400).json({
        msg: "internal server error"
    })
    return;
}
})

router.get("/api/fetchLink",async (req,res)=>{
    const hash = req.headers.hash;
    if(!hash){
        res.status(400).json({
            msg: "hash not found in headers"
        })
        return;
    }
    try{
    const lnk = await linkModel.findOne({hash:hash}).populate<{userId : Iuser}>("userId");
    if(!lnk){
        res.status(400).json({msg: "user not found"});
        return;
    }
    if(!lnk.share){
        res.status(400).json({msg: "sharing is disabled"});
        return;
    }
    const name = lnk.userId.name
    const content = await contentModel.findOne({userId : lnk.userId._id}).populate("tags");
    res.json({
        name: name,
        content : content
    })
    return;
}
catch(e){
    res.status(500).json({
        msg: "internal server error"
    })
    return;
}
    
})

import * as cheerio from 'cheerio';

router.get("/api/getPreview", async (req,res)=>{
    console.log("hitted\n");
    const url = req.headers.url;
    try{ new URL(url as string);

        const fetch = (await import('node-fetch')).default;
    
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const r = await fetch(url as string, { signal: controller.signal }).finally(() => clearTimeout(timeout));
        if(!r.ok){
            res.status(400).json({
                msg: "invalid link"
            })
            return;
        }
   

  const html = await r.text();
  const $ = cheerio.load(html);
    // console.log(cheerio);
  const data =  {
    title: $('meta[property="og:title"]').attr('content') || $('title').text()|| $('meta[name="twitter:title"]').attr('content'),
    description: $('meta[property="og:description"]').attr('content')||$('meta[name="twitter:description"]').attr("content"),
    image: $('meta[property="og:image"]').attr('content')||$('meta[name="twitter:image"]').attr("content")||$('meta[name="twitter:card"]').attr("content"),             
    site: $('meta[property="og:site_name"]').attr('content')|| $('meta[name="twitter:site"]').attr("content")
  }
  res.status(200).json({
    data: data
  })
  return;
}
catch(e){
    if(e instanceof Error)
    console.log("error catched", e.message);
else {
    console.log("error catched");
}
     res.status(400).json({
        msg: "invalid link"
    })
    return;
}

})



export {router};