import { NavBar } from "./ui/components/navbar"
import { BrowserRouter, Routes , Route, Navigate, useNavigate } from "react-router-dom"
import { SideBar} from "./ui/components/sidebar"
import { SearchBar } from "./ui/components/searchBar"
import Button from "./ui/components/button"
import logo from "./assets/logo.png"
import { Card } from "./ui/components/card"
import React, { createContext, SetStateAction, useContext,useState,useEffect, useRef, Ref } from "react"
import { cardState } from "./ui/components/context"
import {addContext, cardContext} from "./ui/components/context"
import { Add } from "./ui/components/add"
import { useFetchData } from "./ui/components/hooks"
import { LoadCard } from "./ui/components/loadcard"
import { tokenContext, detailContext } from "./ui/components/context"

const btns = [
  {
    // title: "people",
    button : [
      {title: "Bookmarks",
        url : "/home"
      },
      {
        title: "Notes",
        url: "/notes"
      }
    ]
  } 
]


function RepeatDivs() {
  
    const num = 4;
    const arr  = new Array(num).fill(null);
  return (
    <>
    {arr.map(i=>{
      return <LoadCard></LoadCard>
    })}
    </>
  );
}
import { contents } from "./exports"
import { render } from "./ui/components/context"
export  function Dash(){
  const navigate = useNavigate();
  const [jwt,setJwt] = useContext(tokenContext);
  const [rerender,setRerender] = useState(false);
  const [cards, setCards] = useState<contents[]>([]);
  const [visibleCards, setVisibleCards] = useState<contents[]>([]);
  const [cardStates, setCardStates] = useState<boolean[]>([]);
  const cardRef = useRef<(HTMLDivElement|null)[]>(new Array(cards.length).fill(null));
  const [add, setAdd] = useState(false);
  const {data, loading, error} = useFetchData(jwt? jwt : "", rerender);
  const loadref = useRef<HTMLDivElement>(null);
  const [detail, setDetail] = useContext(detailContext);

  useEffect(()=>{
    if(jwt == "")navigate("/login");
  }, [jwt]) 

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
    <><cardContext.Provider value={[cards, visibleCards, setVisibleCards]}><render.Provider value={[rerender, setRerender]}><div className="transition-all ">
    {<addContext.Provider value={[add,setAdd]}><Add></Add></addContext.Provider>}
    {<cardState.Provider value = {[cardStates, setCardStates]}>
    <div className={`min-h-screen ${add?"blur-sm pointer-events-none":""}`}>
    
      <div className="h-[14vh]">
        {/* navbar */}
      <NavBar variant="home" size="lg" logo= {logo}>
        <div className="flex w-[inherit] justify-center -translate-x-[100px]">
        <SearchBar height="max(4vh, 25px)" width="40vw"></SearchBar>
        <div className="absolute right-2">
        <Button variant="ghost" onClick={()=>{
          setAdd(true);
        }}>Add</Button>
        <Button variant = "ghost">Note</Button>
        </div>
        </div>

        </NavBar>
        {/* navbar done */}
    </div>
    <div className="flex flex-1 w-full overflow-hidden">
      <div className="flex basis-auto">
      <SideBar name={detail.name} username={detail.username} groups={btns}></SideBar>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        
     
    { <div ref={loadref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
 {
  loading && <RepeatDivs></RepeatDivs>
}
{
  visibleCards.map((card: contents, i: number) => {
    return <div key={i} ref={(x: HTMLDivElement | null) => { cardRef.current[i] = x }}>
      <Card index={i} title={card.title} description={card.description} image={card.image} type={card.type} tags={card.tags.map((t,_)=>{return t?.title})} link={card.link} key={i} _id={card._id} ></Card>
    </div>
  })
}
    </div>}
  </div>
    </div>
    </div>
    </cardState.Provider>}
    </div>
    </render.Provider>
    </cardContext.Provider>
    </>
  )
}

