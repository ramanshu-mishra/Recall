import { Dash } from "./dashboard"
import { BrowserRouter, Routes, Route, Link, useNavigate, redirect } from "react-router-dom"
import Signup from "./ui/pages/Signup"
import Login from "./ui/pages/Login"
import { useState } from "react"
import { tokenContext, detailContext } from "./ui/components/context"
export default function   App(){
  const [token, setToken] = useState("");
  const [detail, setDetail] = useState({name: "", username: ""});
  return(
    <BrowserRouter>
    <detailContext.Provider value={[detail,setDetail]}>
    <tokenContext.Provider value={[token, setToken]}>
    <Routes>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/home" element={<Dash></Dash>}></Route>
      <Route path="/" element = {<Dash></Dash>}></Route>
      <Route path="*" element= {<Dash></Dash>}></Route>
    </Routes>
    </tokenContext.Provider>
    </detailContext.Provider>
    </BrowserRouter>
  )
}