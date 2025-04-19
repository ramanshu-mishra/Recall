
import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import Button from "./button";
import { createContext } from "react";
import { useNavigate} from "react-router-dom";
import { tokenContext, detailContext } from "./context";
 
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
    <div className="mt-4">
      <h3 className="text-muted-foreground text-xs font-semibold mb-2 px-3 uppercase tracking-wider">
        {title}
      </h3>
      <div className="flex flex-col gap-1 px-2">
        {button.map((i, idx) => (
          <Button
            key={idx}
            size="sm"
            variant="ghost"
            className="justify-start gap-2 px-3 py-2 rounded-lg hover:bg-muted transition"
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
  
  return (
    <>
    <div className="flex items-center justify-between gap-3 px-4 py-6 border-b border-muted">
      <div className="flex items-center gap-3">
        {<div className={`w-10 h-10 rounded-full overflow-hidden ${image?"":"bg-blue-600"}`}>{image}</div>}
        
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className="text-xs text-muted-foreground">@{username}</span>
        </div>
      </div>
    </div>
    </>
  );
}

function SideBarFooter() {
  const [confirm, setConfirm]= useState(false);
  const [jwt, setJwt] = useContext(tokenContext);
  const ref = useRef<HTMLDivElement>(null);

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
    <div className="mt-auto px-4 pb-4 sticky bottom-0 whitespace-nowrap">
     {!confirm && <Button className="w-full" variant="secondary" onClick={()=>{
        setConfirm(true);
      }}>
        Log Out
      </Button>}
      <div ref = {ref}>
      {confirm && <Button className="w-full bg-red-500" variant="secondary" onClick={()=>{
        setConfirm(false);
        localStorage.removeItem("token");
        setJwt("");
      }} >
        Are you Sure ?
      </Button> }
      </div>
      
    </div>
  );
}

function SideBar({ name, username, image, children, groups }: sideBarProps) {
  const [collapse, setCollapse] = useState<boolean>(false);
  
  return (
    
    <collapseContext.Provider value={[collapse, setCollapse]}>
      <Button
    variant="secondary"
    size="md"
    className={`absolute z-50 top-[max(calc(14vh),100px)] transition-all duration-300 rounded-full shadow-md
      ${collapse ? 'left-2' : 'left-64'}`}
    onClick={() => setCollapse(!collapse)}
  >
    {collapse ? "›" : "‹"}
  </Button>
      {/* Sidebar */}
      <div
        className={`  top-[max(calc(14vh), 100px)] h-[60vh] rounded-lg bg-background border-r shadow-md flex flex-col transition-all duration-300 relative grow  ${
          collapse ? "w-0 overflow-hidden" : "w-64 overflow-y-auto"
        }`}
      >
        {children}
        <SideBarHeader name={name} username={username} image={image} />
        <div className="flex-1 overflow-y-auto px-1 py-2">
          {groups.map((group, index) => (
            <SideBarGroup key={index} title={group.title} button={group.button} />
          ))}
          
        </div>
        <SideBarFooter />
      </div>
    </collapseContext.Provider>
  );
}

export { SideBar };
