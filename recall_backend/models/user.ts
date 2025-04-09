import mongoose from "mongoose";
import  {Document, Types} from "mongoose";
interface Iuser{
    _id : Types.ObjectId,
    username: string;
    password:string,
    name:string,
    email:string
}
interface Ilink{
    _id: Types.ObjectId,
    hash: string,
    userId : Types.ObjectId | Iuser,
    share : boolean
}
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
    tags : {type: [mongoose.Schema.Types.ObjectId], ref : "tag"},
    link : {type : String, required : true},
    userId : {type: mongoose.Schema.Types.ObjectId, ref : "user"}
})

const tagSchema = new mongoose.Schema({
    title : {type:String, required:true, unique : true},
})

const linkSchema = new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId, required:true, ref : "user"},
    hash: {type:String, required:true, unique : true},
    share : {type:Boolean, default:false}
})

const contentModel = mongoose.model("content", contentSchema);
const userModel = mongoose.model<Iuser>("user", userSchema);
const tagModel = mongoose.model("tag", tagSchema);
const linkModel = mongoose.model<Ilink>("link", linkSchema);
export {userModel, contentModel, tagModel, linkModel, Iuser};
