const server = "http://localhost:3000";
const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoYWt0aTExIiwiaWF0IjoxNzQ0NjY1ODM0fQ.lZdJp8FsYTcFKQAhhp4xuifbPMpCnkyr2WVrlQ9NLwA";
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

export { server, jwt };
export type { contents };