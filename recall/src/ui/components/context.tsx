import React from "react";
import {createContext, SetStateAction} from "react";

const cardState = createContext<[boolean[], React.Dispatch<SetStateAction<boolean[]>>]>([[], ()=>{}]);
const addContext =  createContext<[boolean, React.Dispatch<SetStateAction<boolean>>]>([false, ()=>{}]);
const render = createContext<[boolean, React.Dispatch<SetStateAction<boolean>>]>([false, ()=>{}]);

export {cardState,addContext,render};

