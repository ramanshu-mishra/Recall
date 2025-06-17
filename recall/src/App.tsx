
import { Dash } from "./dashboard"
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom"
import Signup from "./ui/pages/Signup"
import Login from "./ui/pages/Login"
import { useState } from "react"
import { Landing_One } from "./ui/pages/landing"
import { tokenContext, detailContext } from "./ui/components/context"
import { Landing } from "./ui/template"
export default function   App(){
  const t = localStorage.getItem("token");
  const [token, setToken] = useState((t)? t: ""); 
  const [detail, setDetail] = useState({name: "", username: ""});
  return(
    <BrowserRouter>
    <detailContext.Provider value={[detail,setDetail]}>
    <tokenContext.Provider value={[token, setToken]}>

    <Routes>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/home" element={<Landing_One></Landing_One>}></Route>
      <Route path="/dash" element={<Dash></Dash>}></Route>
      <Route path="/" element = {<Landing_One></Landing_One>}></Route>
      <Route path="*" element= {<Navigate to="/home" />}></Route>
    </Routes>
   
    </tokenContext.Provider>
    </detailContext.Provider>
    </BrowserRouter>
  )
}