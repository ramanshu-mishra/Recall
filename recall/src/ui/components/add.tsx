import { useContext, useRef, useEffect, useState } from "react";
import React from "react";
import { addContext } from "./context";
import { motion, AnimatePresence } from "framer-motion";
import { usePreview } from "./hooks";
import load from "../../assets/loading.png"
import logo from "../../assets/logo.png"
import Button from "./button";
import { server } from "../../exports";
import { render } from "./context";


// ...imports stay the same
const types = [ "youtube",
    "twitter",
    "facebook",
    "notion",
    "medium",
    "Images",
    "others",
    "notes"]


    function getDomainName(url: string): string  {
      try {
        const { hostname } = new URL(url);
    
        // Remove common subdomains like www.
        const parts = hostname.split('.');
        let name = '';
    
        if (parts.length >= 2) {
          if (parts[0] === 'www') {
            name = parts[1];
          } else {
            name = parts[0];
          }
        } else {
          name = parts[0];
        }
    
        return name;
      } catch (e) {
        console.error("Invalid URL:", e);
        return "";
      }
    }

export function Add() {
    const [add, setAdd] = useContext(addContext);
    const addref = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState("others");
    const [tags, setTags] = useState<string[]>([]);
    const [image, setImage] = useState("");
    const correctlink = (link.startsWith("http://") || link.startsWith("https://")) ? link : "http://" + link;
    const { data, loading, error } = usePreview(correctlink);
    const [tag,setTag]= useState("");
    const [_rerender, setRerender]= useContext(render);
    const jwt = localStorage.getItem("token");

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
        setImage(logo);
        setTitle("");
        setDesc("");
        setTags([]);
        setType("others")
      } else {
        const tg = getDomainName(correctlink);
        setImage(data?.image as string|| logo);
        setTitle(data?.title as string||"");
        setDesc(data?.description as string||"");
        if(data?.site != "" && data?.site != undefined && !tags.includes(data?.site as string))
        setTags([...tags, data?.site as string]);
      console.log(data?.site);
      if(!tags.includes(tg))
        setTags([...tags, tg]);
        let tp = "others";
        types.forEach((v)=>{
          if(v.toLowerCase() == data?.site?.toLowerCase()){
            tp = data?.site.toLowerCase();
          }
        })
        setType(tp);
      }
    }, [loading, error, data, correctlink, tags]);
    
    function handleTags(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key == " " && tag.trim() != "" && tag != undefined){
            const t = tag.trim();
            if(!tags.includes(t)){
                setTags([...tags, t]);
            }
            setTag("");
        }
    }
    
    function removeTag(t:string){
     const tg = tags.filter((i)=>i!=t);
     console.log(tg);
     setTags(tg as string[]);
    }

    async function handlePost(){
        try{
            const d = await fetch(`${server}/api/addContent`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "authorization": jwt?jwt:""
                },
                body: JSON.stringify({
                    title: title,
                    description: desc,
                    link: correctlink,
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
            setAdd(false);
            
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
                        return <div className="rounded-md bg-slate-500 p-1 px-2 relative" key={_}>
                          <div className="absolute text-[0.6rem] top-0 right-0 bg-red-600 px-[2px] hover:cursor-pointer rounded-lg" onClick={()=>removeTag(i)}>X</div>
                          <div className="bg-blue-500 rounded-md px-1">{i}</div>
                          </div>
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
  
