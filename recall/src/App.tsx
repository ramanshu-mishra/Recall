import { NavBar } from "./ui/components/navbar"
import { BrowserRouter, Routes , Route } from "react-router-dom"
import { SideBar} from "./ui/components/sidebar"
import { SearchBar } from "./ui/components/searchBar"
import Button from "./ui/components/button"
import logo from "./assets/logo.png"
import { Card } from "./ui/components/card"
import React, { createContext, SetStateAction, useContext,useState,useEffect, useRef, Ref } from "react"
import { cardState } from "./ui/components/context"
import {addContext} from "./ui/components/context"
import { Add } from "./ui/components/add"
import { useFetchData } from "./ui/components/hooks"
const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoYWt0aTExIiwiaWF0IjoxNzQ0NjY1ODM0fQ.lZdJp8FsYTcFKQAhhp4xuifbPMpCnkyr2WVrlQ9NLwA"
const btns = [
  {
    title: "people",
    button : [
      {title: "ramanshu",
        url : "#"
      },
      {
        title: "neelesh",
        url: "!"
      }
    ]
  },
  {
    title: "gangs",
    button: [
      {
        title: "bagga",
        url: "&"
      },
      {title: "billu",
        url: "^"
      }
    ]
  }
]

// const cards = [
//   {
//     title: "ramanshu",
//     description: "ramanshu is a good boy",
//     image : "https://www.notion.so/images/meta/default.png",
//     type: "notion",
//     tags : ["ram", "shyam", "bhola"],
//     link: "https://www.notion.so/to-do-1b424883ae5580538ad3d645280eb041"
//   },
//   {
//     title: "ramanshu",
//     description: "ramanshu is a good boy",
//     image : "https://www.notion.so/images/meta/default.png",
//     type: "notion",
//     tags : ["ram", "shyam", "bhola"],
//     link: "https://www.notion.so/to-do-1b424883ae5580538ad3d645280eb041"
//   }
// ];

import { contents } from "./exports"
import { render } from "./ui/components/context"
export default function App(){
  //  will fetch the necessary information from backend name , username, image 
  //  will add google auth in the backend
  //  will add random avatar in case of no image on backend

  // after we fetch all the contents from backend we create the card state array
  const [rerender,setRerender] = useState(false);
  const [cards, setCards] = useState<contents[]>([]);
  const [visibleCards, setVisibleCards] = useState<contents[]>([]);
  const [cardStates, setCardStates] = useState<boolean[]>([]);
  const cardRef = useRef<(HTMLDivElement|null)[]>(new Array(cards.length).fill(null));
  const [add, setAdd] = useState(false);
  const {data, loading, error} = useFetchData(jwt, rerender);
  useEffect(()=>{
    setCards(data);
  },[data, cards]);

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
    <>    <render.Provider value={[rerender, setRerender]}><div className="transition-all">
    {<addContext.Provider value={[add,setAdd]}><Add></Add></addContext.Provider>}
    {<cardState.Provider value = {[cardStates, setCardStates]}>
    <div className={`h-full ${add?"blur-sm pointer-events-none":""}`}>
    <BrowserRouter>
      <div>
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
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="flex basis-auto">
      <SideBar name="ramanshu" username="indophoenix" groups={btns}></SideBar>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
      {/* {cards.map((card, i) => {
       return  <div ref={(x)=>{cardRef.current[i] = x}}><Card index={i}  title={card.title} description={card.description} image={card.image} tags={card.tags} type={card.type} link={card.link} key={i} ></Card> </div> 
})} */}
{
  data.map((card: contents, i: number) => {
    return <div key={i} ref={(x: HTMLDivElement | null) => { cardRef.current[i] = x }}>
      <Card index={i} title={card.title} description={card.description} image={card.image} type={card.type} tags={card.tags.map((t,_)=>{return t?.title})} link={card.link} key={i} _id={card._id} ></Card>
    </div>
  })
}
    </div>
  </div>
    </div>
    </BrowserRouter>
    </div>
    </cardState.Provider>}
    </div>
    </render.Provider>
    </>
  )
}

