import { useState } from "react"
import React from "react";
import search from "../../assets/search.svg";
import {combine} from "../utilities/functions"
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

        function handleEnter(e: React.KeyboardEvent<HTMLInputElement>){
            if(e.key == "Enter"){
                
            }
        }
        return (
            <div className= {combine(className, "flex border border-x-2 border-black rounded-md ")} style=  {styles}>
                <div className="">
                    <img src={search} alt="" style={{height: height}} />
                </div>
                <input style={{width: "100%", height: "100%", marginLeft: "5px", backgroundColor : "transparent"}} type="text" onChange = {(e)=>setText(e.target.value)} onKeyDown= {handleEnter} placeholder={placeholder} className="border-none focus:outline-none focus:ring-0 focus:border-transparent"></input>
            </div>
        )
    }