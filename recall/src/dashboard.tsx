import { NavBar } from "./ui/components/navbar"
import { useNavigate } from "react-router-dom"
import { SideBar} from "./ui/components/sidebar"
import { SearchBar } from "./ui/components/searchBar"
import Button from "./ui/components/button"
import logo from "./assets/logo.png"
import { Card } from "./ui/components/card"
import  {  useContext,useState,useEffect, useRef } from "react"
import { cardState } from "./ui/components/context"
import {addContext, cardContext} from "./ui/components/context"
import { Add } from "./ui/components/add"
import { useFetchData } from "./ui/components/hooks"
import { LoadCard } from "./ui/components/loadcard"
import { tokenContext, detailContext } from "./ui/components/context"
import { Landing } from "./ui/template"
import { motion, AnimatePresence } from "framer-motion"

const btns = [
  {
    // title: "people",
    button : [
      {title: "📖 Bookmarks",
        url : "/dash"
      },
      {
        title: "📝 Notes",
        url: "/dash"
      }
    ]
  } 
]


function RepeatDivs() {
  
    const num = 4;
    const arr  = new Array(num).fill(null);
  return (
    <>
    {arr.map(_i=>{
      return <LoadCard></LoadCard>
    })}
    </>
  );
}
import { contents } from "./exports"
import { render } from "./ui/components/context"
export  function Dash(){
  const navigate = useNavigate();
  const [jwt,_setJwt] = useContext(tokenContext);
  const [rerender,setRerender] = useState(false);
  const [cards, setCards] = useState<contents[]>([]);
  const [visibleCards, setVisibleCards] = useState<contents[]>([]);
  const [cardStates, setCardStates] = useState<boolean[]>([]);
  const cardRef = useRef<(HTMLDivElement|null)[]>(new Array(cards.length).fill(null));
  const [add, setAdd] = useState(false);
  const {data, loading, error} = useFetchData(jwt? jwt : "", rerender);
  const loadref = useRef<HTMLDivElement>(null);
  const [detail, _setDetail] = useContext(detailContext);

  console.log(error);
  useEffect(()=>{
    if(jwt == "")navigate("/login");
  }, [jwt, navigate]) 

  useEffect(()=>{
    setCards(data);
  },[data]);

  useEffect(()=>{
    setVisibleCards(cards);
  }, [cards]);

  useEffect(()=>{
    cardRef.current = new Array(visibleCards.length).fill(null);
  }, [visibleCards])

  useEffect(()=>{
    setCardStates(new Array(visibleCards.length).fill(false));
    function handleClick(e:MouseEvent){
      const nocard = cardRef.current.every(i=>{
        return (i && !i.contains(e.target as Node));
      })
      if(nocard){
        setCardStates(new Array(cardStates.length).fill(false));
      }
    }
    document.addEventListener("mousedown", handleClick);
    return ()=>{
      document.removeEventListener("mousedown", handleClick);
    }
    },[cardStates.length, visibleCards]);

   
      
    


  return (
      
    <Landing>
    <motion.div 
      className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <cardContext.Provider value={[cards, visibleCards, setVisibleCards]}>
      <render.Provider value={[rerender, setRerender]}>
      <div className="transition-all h-full">
    {<addContext.Provider value={[add,setAdd]}><Add></Add></addContext.Provider>}
    {<cardState.Provider value = {[cardStates, setCardStates]}>
    <div className={`h-full ${add?"blur-sm pointer-events-none":""}`}>
    
      <div className="">
        {/* navbar */}
      <NavBar className="bg-white/80 backdrop-blur-md border-b border-slate-200" variant="home" size="lg" logo= {logo}>
        <div className="flex w-[100vw] justify-center -translate-x-[100px]">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchBar height="max(4vh, 32px)" width="40vw"></SearchBar>
        </motion.div>
        <motion.div 
          className="absolute right-[0%] flex gap-3"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
        <Button variant="ghost" onClick={()=>{
          setAdd(true);
        }}>Add Bookmark</Button>
        <Button variant = "ghost">Create Note</Button>
        </motion.div>
        </div>

        </NavBar>
        {/* navbar done */}
    </div>
    <div className="flex flex-1 h-full overflow-hidden">
      
      <motion.div 
        className="flex basis-auto bg-white/50 backdrop-blur-sm border-r border-slate-200"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        
      <SideBar name={detail.name || localStorage.getItem("userDisplayName")|| "User"} username={detail.username || localStorage.getItem("userUsername") ||"username"} groups={btns}></SideBar>
      </motion.div>
      <motion.div 
        className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-slate-50/50 to-blue-50/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        
     
    { <div ref={loadref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" >
 {
  loading && <RepeatDivs></RepeatDivs>
}
{
  visibleCards.map((card: contents, i: number) => {
    return <motion.div 
      key={i} 
      ref={(x: HTMLDivElement | null) => { cardRef.current[i] = x }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: i * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Card index={i} title={card.title} description={card.description} image={card.image} type={card.type} tags={card.tags.map((t,_)=>{return t?.title})} link={card.link} key={i} _id={card._id} ></Card>
    </motion.div>
  })
}
    </div>}
  </motion.div>
    </div>
    </div>
    </cardState.Provider>}
    </div>
    </render.Provider>
    </cardContext.Provider>
    </motion.div>
    </Landing>
  )
}




