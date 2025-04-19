// const server = "http://localhost:3000";
const server = "https://recall-2wof.onrender.com"

import mongoose from "mongoose";
interface contents{
    _id: mongoose.Schema.Types.ObjectId,
    title : string,
    description: string,
    image: string,
    type : string,
    tags : {title: string}[],
    link : string
}

export { server};
export type { contents };