import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type:String, required : true},
    password : {type: String, required : true},
    name : {type: String, required : true},
    email : {type : String, required : true}
})

const types = [ "youtube",
    "twitter",
    "facebook",
    "notion",
    "medium",
    "Images",
    "others",
    "notes"]

const contentSchema = new mongoose.Schema({
    title : {type:String,required:true},
    description: {type : String},
    type : {type: String, enum: types,required : true},
    tags : {type: mongoose.Schema.Types.ObjectId, ref : "tag"},
    link : {type : String, required : true},
    userId : {type: mongoose.Schema.Types.ObjectId, ref : "user"}
})

const tagSchema = new mongoose.Schema({
    title : {type:String, required:true},
})

const linkSchema = new mongoose.Schema({
    hash: {type:String, required:true},
    share : {type:Boolean, default:false}
})

const contentModel = mongoose.model("content", contentSchema);
const userModel = mongoose.model("user", userSchema);
const tagModel = mongoose.model("tag", tagSchema);
const linkModel = mongoose.model("link", linkSchema);
export {userModel, contentModel, tagModel, linkModel};