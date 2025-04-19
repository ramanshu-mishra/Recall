import { useContext, useState } from "react"
import React from "react";
import search from "../../assets/search.svg";
import {combine} from "../utilities/functions"
import { useDebounce, useFetchData, usePrev } from "./hooks";
import { contents, jwt } from "../../exports";
import { render , cardContext} from "./context";
interface SearchBarProps{
    width?: string,
    height?: string,
    className?: string,
    placeholder?: string
}

    export function SearchBar({
    width= "20%",
    height= "4vh",
    className = "",
    placeholder = "search"
    }:SearchBarProps){

        const [text, setText] = useState("");
        const styles = {width:width, height:height}
        const [rerender, setRerender] = useContext(render);
        const [cards, visibleCards, setVisibleCards] = useContext(cardContext);
        const debouncedValue = useDebounce(text);
        const prev = usePrev(text);
       
        function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {

            if( e.key == "Enter"){
                const filtered = cards.filter(i=>
                    i.tags.some((tag)=>tag.title.toLowerCase().includes(debouncedValue.trim().toLowerCase()))
                )
                setVisibleCards(filtered);
            }
          }
          function handleClick(){
            const filtered = cards.filter(i=>
                i.tags.some((tag)=>tag.title.toLowerCase().includes(debouncedValue.trim().toLowerCase()))
            )
            setVisibleCards(filtered);
          }
          
        return (
            <div className= {combine(className, "flex border border-x-2 border-black rounded-md ")} style=  {styles}>
                <div className="" >
                    <img src={search} alt="" style={{height: height}} onClick={()=>{handleClick()}} className="hover:cursor-pointer" />
                </div>
                <input style={{width: "100%", height: "100%", marginLeft: "5px", backgroundColor : "transparent"}} type="text" onChange = {(e)=>setText(e.target.value)} onKeyDown= {handleEnter} placeholder={placeholder} className="border-none focus:outline-none focus:ring-0 focus:border-transparent"></input>
            </div>
        )
    }