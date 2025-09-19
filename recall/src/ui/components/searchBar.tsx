import { useContext, useState } from "react"
import React from "react";
import search from "../../assets/search.svg";
import {combine} from "../utilities/functions"
import { useDebounce } from "./hooks";
import { cardContext} from "./context";
interface SearchBarProps{
    width?: string,
    height?: string,
    className?: string,
    placeholder?: string
}

   export function SearchBar({
    width = "20%",
    height = "4vh",
    className = "",
    placeholder = "search"
}: SearchBarProps) {

    const [text, setText] = useState("");
    const styles = { width: width, height: height };
    const [cards, _visibleCards, setVisibleCards] = useContext(cardContext);
    const debouncedValue = useDebounce(text);

    function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Enter") {
            const filtered = cards.filter(i =>
                i.tags.some((tag) => tag.title.toLowerCase().includes(debouncedValue.trim().toLowerCase()))
            )
            setVisibleCards(filtered);
        }
    }
    function handleClick() {
        const filtered = cards.filter(i =>
            i.tags.some((tag) => tag.title.toLowerCase().includes(debouncedValue.trim().toLowerCase()))
        )
        setVisibleCards(filtered);
    }

    return (
        <div
            className={combine(
                className,
                "flex items-center bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-sm px-4 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-400",
                "hover:shadow-lg hover:border-slate-300"
            )}
            style={styles}
        >
            <button
                type="button"
                onClick={handleClick}
                className="p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
                tabIndex={-1}
            >
                <img src={search} alt="" className="h-5 w-5 opacity-60" />
            </button>
            <input
                style={{
                    width: "100%",
                    height: "100%",
                    marginLeft: "12px",
                    backgroundColor: "transparent"
                }}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleEnter}
                placeholder={placeholder}
                className="border-none bg-transparent focus:outline-none text-slate-700 placeholder-slate-400 font-medium text-sm"
            />
        </div>
    );
}