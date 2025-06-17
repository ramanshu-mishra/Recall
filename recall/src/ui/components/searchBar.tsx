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
                "flex items-center bg-white/80 border border-gray-300 rounded-full shadow-sm px-3 transition focus-within:ring-2 focus-within:ring-[#A16AE8]",
                "hover:shadow-md"
            )}
            style={styles}
        >
            <button
                type="button"
                onClick={handleClick}
                className="p-1 rounded-full hover:bg-[#F9C46B]/30 transition"
                tabIndex={-1}
            >
                <img src={search} alt="" style={{ height: "1.5em", width: "1.5em" }} />
            </button>
            <input
                style={{
                    width: "100%",
                    height: "100%",
                    marginLeft: "8px",
                    backgroundColor: "transparent"
                }}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleEnter}
                placeholder={placeholder}
                className="border-none bg-transparent focus:outline-none text-black placeholder-gray-400"
            />
        </div>
    );
}