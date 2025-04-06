import React from "react";
import { combine } from "../utilities/functions";
// nav bar for user dashboard;


interface navProps{
    children?: React.ReactNode,
    variant?: "home"|"dash",
    size?: "md"|"lg",
    className?: string
}

const variants = {
    "home": "bg-blue-200 w-full",
    "dash": "w-full"
}
const sizes= {
    md: 'text-base px-4 py-2 h-[7vh]',
    lg: 'text-lg px-5 py-3 h-[10vh]',
}

export function NavBar({
    children,
    variant = "dash",
    size = "md",
    className = ""
}:navProps){
    return (
        <div className={combine(variants[variant], sizes[size], className)}>
            {children}
        </div>
    )
}