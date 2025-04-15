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
    home: "bg-blue-200 w-full",
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
