import { useContext, useRef, useEffect, useState } from "react";
import { addContext } from "./context";
import { motion, AnimatePresence } from "framer-motion";
import { usePreview } from "./hooks";
import load from "../../assets/loading.png"
import Button from "./button";
import { server } from "../../exports";
import { render } from "./context";
const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoYWt0aTExIiwiaWF0IjoxNzQ0NjY1ODM0fQ.lZdJp8FsYTcFKQAhhp4xuifbPMpCnkyr2WVrlQ9NLwA";
// ...imports stay the same
const types = [ "youtube",
    "twitter",
    "facebook",
    "notion",
    "medium",
    "Images",
    "others",
    "notes"]
export function Add() {
    const [add, setAdd] = useContext(addContext);
    const addref = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState("others");
    const [tags, setTags] = useState<string[]>([]);
    const [image, setImage] = useState("");
    const correctlink = link.startsWith("http://") || link.startsWith("https://") ? link : "http://" + link;
    const { data, loading, error } = usePreview(correctlink);
    const [tag,setTag]= useState("");
    const [rerender, setRerender]= useContext(render);
    useEffect(() => {
      function handleClick(e: MouseEvent) {
        if (addref.current && !addref.current.contains(e.target as Node)) {
          setAdd(false);
          setImage("");
          setTitle("");
          setDesc("");
          setTags([]);
          setLink("");
        }
      }
  
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, [setAdd]);
  
    useEffect(() => {
      if (loading) {
        setImage(load);
      } else if (error) {
        setImage("");
      } else {
        setImage(data?.image as string);
        if(types.includes(data?.site as string)){
            setType(data?.site as string);
        }
        else{
            setType("others");
        }
      }
    }, [loading, error, data]);
    
    function handleTags(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key == " " && tag.trim() != ""){
            const t = tag.trim();
            if(!tags.includes(t)){
                setTags([...tags, t]);
            }
            setTag("");
        }
    }

    async function handlePost(){
        try{
            const d = await fetch(`${server}/api/addContent`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "authorization": jwt
                },
                body: JSON.stringify({
                    title: title,
                    description: desc,
                    link: link,
                    tags: tags,
                    image: image,
                    type: type
                })
            })
            if(!d.ok){
                const res = await d.json();
              throw new Error("something went wrong "+res.msg);
            }
            setRerender(e=>!e);
            
        }
        catch(e){
            alert(e);
        }
    }
    return (
      <AnimatePresence>
        {add && (
          <motion.div
            className="fixed top-0 left-0 h-screen w-screen z-[2000] flex justify-center items-center backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={addref}
              className="h-[80vh] w-[90vw] md:w-[50vw] lg:w-[40vw] bg-gradient-to-br from-slate-800/60 to-slate-900/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-6 flex flex-col gap-3  overflow-y-auto "
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
                <div className="flex justify-between ">
                    <div>
                        <select onChange={(e)=>setType(e.target.value)} value={type} >
                        <option value="youtube">Youtube</option>
                        <option value="twitter">Twitter</option>
                        <option value="facebook">Facebook</option>
                        <option value="notion">Notion</option>
                        <option value="Images">Images</option>
                        <option value="others">Others</option>
                        </select>
                    </div>
                <div className="flex-1 justify-center ">
              <h2 className="text-2xl font-semibold text-white tracking-wide justify-self-center text-white-400">Add a New Entry</h2>
              </div>
              <Button className="bg-blue-400" onClick={handlePost}>POST</Button>
              </div>
  
              <div className="space-y-4">
                <div>
                  {/* <label className="block text-white mb-1">🔗 Link</label> */}
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full p-1 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="https://example.com"
                  />
                </div>
  
                <div>
                  {/* <label className="block text-white mb-1">📝 Title</label> */}
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-1 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                    placeholder="Enter a title"
                  />
                </div>
  
                <div>
                  {/* <label className="block text-white mb-1">📄 Description</label> */}
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full p-1 rounded-xl bg-slate-800 text-white border border-slate-700 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    placeholder="What's this about?"
                  ></textarea>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2">
              <div className="w-full h-40 bg-slate-700 rounded-xl overflow-hidden flex justify-center items-center border border-white/10 mt-4">
                <img
                  src={image}
                  alt="Preview"
                  className="max-h-full object-contain transition-all duration-300"
                />
              </div>
              <div>
                  {/* <label className="block text-white mb-1">📝 Tags</label> */}
                  <div  className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition flex gap-2 flex-wrap">
                    {tags.map((i,_)=>{
                        return <div className="rounded-md bg-slate-500 p-1" key={_}>{i}</div>
                    })}
                  <input
                    type="text"
                    value= {tag}
                    onChange={(e)=>setTag(e.target.value)}
                    onKeyUp={handleTags}
                   placeholder="Tags"
                   className="bg-transparent outline-none w-full"
                  ></input>
                  </div>
                  
                </div>
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  
