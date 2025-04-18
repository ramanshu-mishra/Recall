import React from "react";
import {createContext, SetStateAction} from "react";
import { contents } from "../../exports";

const cardState = createContext<[boolean[], React.Dispatch<SetStateAction<boolean[]>>]>([[], ()=>{}]);
const cardContext = createContext<[contents[], contents[], React.Dispatch<SetStateAction<contents[]>>]>([[], [], ()=>{}]);
const addContext =  createContext<[boolean, React.Dispatch<SetStateAction<boolean>>]>([false, ()=>{}]);
const render = createContext<[boolean, React.Dispatch<SetStateAction<boolean>>]>([false, ()=>{}]);

export {cardState,addContext,render,cardContext};

