
import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import Button from "./button";
import { createContext } from "react";
import { useNavigate} from "react-router-dom";
import { tokenContext } from "./context";
 
const collapseContext = createContext<[boolean, React.Dispatch<SetStateAction<boolean>>]>([false, ()=>{}]); 
interface buttonItem {
  title?: string;
  icon?: React.ReactNode;
  url?: string;
}
interface sideBarGroupProps {
  title?: string;
  button: buttonItem[];
}
interface sideBarHeaderProps {
  name: string;
  username: string;
  image?: React.ReactNode;
}
interface sideBarProps {
  name: string;
  username: string;
  image?: React.ReactNode;
  children?: React.ReactNode;
  groups: sideBarGroupProps[];
}

const SideBarGroup: React.FC<sideBarGroupProps> = ({ title, button }) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <h3 className="text-slate-600 text-xs font-semibold mb-3 px-3 uppercase tracking-wider">
        {title}
      </h3>
      <div className="flex flex-col gap-2 px-2">
        {button.map((i, idx) => (
          <Button
            key={idx}
            size="sm"
            variant="ghost"
            className="justify-start gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 transition-all duration-200 text-slate-700 font-medium hover:text-slate-900"
            onClick={() => i.url && navigate(i.url)}
          >
            {i.icon}
            {i.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

function SideBarHeader({ name, username, image }: sideBarHeaderProps) {
  const displayName = name || localStorage.getItem("userDisplayName") || "User";
  const displayUsername = username || localStorage.getItem("userUsername") || "username";
  
  // // Store in localStorage for persistence
  // if (name && name !== "User") {
  //   localStorage.setItem("userDisplayName", name);
  // }
  // if (username && username !== "username") {
  //   localStorage.setItem("userUsername", username);
  // }
  
  return (
    <>
    <div className="flex items-center justify-between gap-3 px-6 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-800 to-blue-800 rounded-2xl m-3 shadow-lg">
      <div className="flex items-center gap-3">
        {<div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-lg ${image?"":"bg-gradient-to-br from-blue-500 to-indigo-600"}`}>
          {image || displayName.charAt(0).toUpperCase()}
        </div>}
        
        <div className="flex flex-col">
          <span className="font-semibold text-white text-lg">{displayName}</span>
          <span className="text-blue-200 text-sm">
            <span className="">@</span>
            <span className="">{displayUsername}</span>
          </span>
        </div>
      </div>
    </div>
    </>
  );
}

function SideBarFooter() {
  const [confirm, setConfirm]= useState(false);
  const [_jwt, setJwt] = useContext(tokenContext);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  function handleClick(e:MouseEvent){
      if(ref.current && !ref.current.contains(e.target as Node)){
        setConfirm(false);
      }
  }
  useEffect(()=>{
      window.addEventListener("mousedown", handleClick);
      return ()=>{
        window.removeEventListener("mousedown", handleClick);
      }
  })

  return (
    <div className="mt-auto px-4 pb-4 whitespace-nowrap">
     {!confirm && <Button className="w-full bg-slate-400 hover:bg-slate-500 text-slate-700 border-0 font-medium" variant="secondary" onClick={()=>{
        setConfirm(true);
      }}>
        Log Out
      </Button>}
      <div ref = {ref}>
      {confirm && <Button className="w-full bg-red-500 hover:bg-red-600 text-white border-0 font-medium" variant="secondary" onClick={()=>{
        setConfirm(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userDisplayName");
        localStorage.removeItem("userUsername");
        setJwt("");
        navigate("/login")
        
      }} >
        Are you Sure ?
      </Button> }
      </div>
      
    </div>
  );
}

function SideBar({ name, username, image, children, groups }: sideBarProps) {
  const [collapse, setCollapse] = useState<boolean>(false);
  const navigate = useNavigate();
  
  return (
    <div className="bg-white/95 backdrop-blur-sm h-full border-r border-slate-200">
    <collapseContext.Provider value={[collapse, setCollapse]} >
      {/* Sidebar */}
      <div
        className={`top-[max(calc(14vh), 100px)] bg-white/80 backdrop-blur-sm flex flex-col flex-basis h-[90%] transition-all duration-300 relative grow  ${
          collapse ? "w-12 overflow-hidden" : "w-64 overflow-y-auto"
        }`}
      > 
        {/* Toggle Button integrated into sidebar */}
        <div className="flex items-center justify-between p-3 border-b border-slate-200">
          {!collapse && (
            <span className="text-slate-600 font-semibold text-sm">Navigation</span>
          )}
          <button
            className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 group"
            onClick={() => setCollapse(!collapse)}
            aria-label={collapse ? "Open sidebar" : "Close sidebar"}
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              <svg 
                className={`w-3 h-3 transition-transform duration-300 ${collapse ? 'rotate-0' : 'rotate-180'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
            
            {/* Tooltip */}
            <div className={`absolute ${collapse ? 'left-10' : 'right-10'} top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10`}>
              {collapse ? 'Expand' : 'Collapse'}
            </div>
          </button>
        </div>

        {!collapse && (
          <>
            <SideBarHeader name={name} username={username} image={image} />
            {children}
            <div className="flex-1 overflow-y-auto px-1 p-4 flex flex-col gap-6">
              {groups.map((group, index) => (
                <SideBarGroup key={index} title={group.title} button={group.button} />
              ))}
            </div>
            <div className="bottom-10"><SideBarFooter /></div>
          </>
        )}

        {/* Collapsed state - show only icons */}
        {collapse && (
          <div className="flex flex-col items-center py-4 gap-4">
            {/* User avatar when collapsed */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {(name || localStorage.getItem("userDisplayName") || "U").charAt(0).toUpperCase()}
            </div>
            
            {/* Navigation icons when collapsed */}
            {groups.map((group, groupIndex) => (
              <div key={groupIndex} className="flex flex-col gap-2">
                {group.button.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 transition-all duration-200 text-slate-600 hover:text-slate-900 flex items-center justify-center text-sm font-medium group"
                    onClick={() => item.url && navigate(item.url)}
                  >
                    {item.icon || item.title?.charAt(0).toUpperCase()}
                    
                    {/* Tooltip for collapsed items */}
                    <div className="absolute left-12 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      {item.title}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
        
      </div>
    </collapseContext.Provider>
    </div>
  );
}

export { SideBar };
