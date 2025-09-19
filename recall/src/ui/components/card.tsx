import { useContext } from "react";
import logo from "../../assets/logo.png";
import { cardState } from "./context";
import mongoose from "mongoose";
import { server } from "../../exports";
import { render} from "./context";
import { motion } from "framer-motion";
interface CardInterface {
  _id: mongoose.Schema.Types.ObjectId,
  className?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
  link: string;
  index: number;
}



export function Card({
  _id,
  title,
  description,
  image,
  tags,
  link,
  className,
  index,
}: CardInterface) {
  const [states, setStates] = useContext(cardState);
  const isActive = states[index];
  const handleClick = () => {
    if(isActive){
        setStates(new Array(states.length).fill(false)); 
    }
    else{
        const newStates = states.map((_, i) => i === index);
    setStates(newStates);
    }
    
  };
  const [_rerender, setRerender]= useContext(render);
  async function deleteCard(){
    try{
    const res = await fetch(server+"/api/deleteContent",{
      method: "GET",
      headers : {
        "id" : _id.toString()
      }
    } )
    if(res.ok){
      setRerender(e=>!e);
    }
  }
  catch(e){
    if(e instanceof Error)
    console.log(e.message)
  }
  }

  return (
    <motion.div 
      className={`group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 ${
        isActive ? "shadow-xl border-blue-300 ring-2 ring-blue-100" : "hover:shadow-lg hover:border-slate-300"
      } ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`relative cursor-pointer transition-all duration-300 ${
          isActive ? "pb-4" : ""
        }`}
        onClick={handleClick}
      >
        {/* Delete Button */}
        {isActive && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              deleteCard();
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}

        {/* Image Section */}
        <div className="relative overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <img
                src={logo}
                alt="default logo"
                className="h-16 w-16 opacity-40"
              />
            </div>
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>

          {/* Collapsed State - Show preview */}
          {!isActive && (
            <p className="text-sm text-slate-600 line-clamp-2 mb-4">
              {description}
            </p>
          )}

          {/* Expanded State - Show full details */}
          {isActive && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-slate-700 leading-relaxed">{description}</p>
              
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Visit Link</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              
              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Expansion Indicator */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-1">
              {tags.slice(0, 2).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-md"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-md">
                  +{tags.length - 2}
                </span>
              )}
            </div>
            
            <motion.div
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-slate-400"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
