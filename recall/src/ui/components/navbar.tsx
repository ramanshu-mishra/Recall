import React from "react";
import { combine } from "../utilities/functions";

// nav bar for user dashboard;

interface NavProps {
    children?: React.ReactNode;
    variant?: "home" | "dash";
    size?: "md" | "lg";
    className?: string;
    logo?: string; 
}

const variants = {
    home: "custom-home-gradient w-full shadow-[0_4px_12px_rgba(161,106,232,0.25)] border-b-2 border-[#F9C46B] text-white",
    dash: "w-full"
};

const sizes = {
    md: "text-base px-4 py-2 h-[7vh]",
    lg: "text-lg px-5 py-3 h-[max(10vh,70px)]"
};

export function NavBar({
    children,
    variant = "dash",
    size = "md",
    className = "",
    logo
}: NavProps) {
    return (
        <nav
           
            className={combine("flex items-center", variants[variant], sizes[size], className)}
        >
            {/* Logo section */}
            <div className="flex-shrink-0 w-[15vw]">
                {<img src={logo} alt="" />}
            </div>

            {/* Nav items */}
            {children}
        </nav>
    );
}
