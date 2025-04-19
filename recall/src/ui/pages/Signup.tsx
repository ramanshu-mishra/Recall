import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button"
import logo from "../../assets/logo.png"; // adjust if needed
import { server } from "../../exports";
import { useDebounce } from "../components/hooks";
import {z} from "zod" 
const emailSchema = z.string().email();
const usernameSchema = z.string().min(3).max(20).refine(s=>!s.includes(' '));
const nameSchema = z.string().max(30).min(1);
const passwordSchema = z.string().min(8).refine(s=>!s.includes(' '));


function useCheckExistingEmail(email:string){
  const [exists, setExists] = useState(false);
  async function check (email:string){
    const r = await fetch(server + "/api/email", {
      method: "GET",
      headers : {
        email: email
      }
    });
    const d = await r.json();
    if(!r.ok){
      console.log(d.msg);
    }
    else{
      if(d.msg == "exists"){
        setExists(true);
      }
      else{
        setExists(false);
      }
    }
  }
  useEffect(()=>{
    check(email);
  }, [email])
  return exists;
}

function useCheckExistingUsername(username:string){
  const [exists, setExists] = useState(false);
  async function check (username:string){
    const r = await fetch(server + "/api/username", {
      method: "GET",
      headers : {
        username:username
      }
    });
    const d = await r.json();
    if(!r.ok){
      console.log(d.msg);
    }
    else{
      if(d.msg == "exists"){
        setExists(true);
      }
      else{
        setExists(false);
      }
    }
  }
  useEffect(()=>{
    check(username);
  }, [username]);
  console.log(exists);
  return exists;
}

export default function Signup() {
  const navigate = useNavigate();
  const [validEmail, setValidEmail] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const debouncedEmail = useDebounce(form.email);
  const debouncedUsername = useDebounce(form.username);
  const [enable, setEnable] = useState(false);

  const emailExists = useCheckExistingEmail(debouncedEmail);
  const usernameExists = useCheckExistingUsername(debouncedUsername);

  useEffect(()=>{
    const s1 = emailSchema.safeParse(debouncedEmail);
    const s2 = usernameSchema.safeParse(debouncedUsername);
    const s3 = nameSchema.safeParse(form.name);
    const s4 = passwordSchema.safeParse(form.password);
    if(!s1.success)setValidEmail(false);
    else setValidEmail(true);
    if(!s2.success)setValidUsername(false);
    else setValidUsername(true);
    if(!s3.success)setValidName(false);
    else setValidName(true);
    if(!s4.success)setValidPass(false);
    else setValidPass(true);
  }, [debouncedEmail, debouncedUsername, form.name, form.password])

  useEffect(()=>{
    if(usernameExists || emailExists || !validName || !validEmail || !validUsername || !validPass ){
      setEnable(false);
    }
    else{
      setEnable(true);
    }
  }, [usernameExists, emailExists,  validEmail, validName, validPass, validUsername])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };  

  const [passwordType, setPasswordType] = useState("password");
  const handleSubmit = () => {
    async function submitData(){
      try{
      const r = await fetch(server+"/api/signin", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email : debouncedEmail,
          password : form.password,
          username : debouncedUsername
        })
      })
      if(r.ok){
        navigate("/login");
      }
      else{
        alert("form not submitted");
      }
    }
    catch(e){
      alert("something went wrong");
    }
    }
    if(enable){
      submitData();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="bg-background shadow-lg border p-8 rounded-2xl w-[90vw] sm:w-[400px]">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="scale-75" />
        </div>

        <h2 className="text-xl font-semibold text-center mb-6">Create your account</h2>

        <form onSubmit={()=>{
          handleSubmit();
        }} className="space-y-4">
          <div>
            <label className=" text-sm text-muted-foreground flex gap-1 justify-between">Name
            {  !validName && !(form.name == "") && <div className="flex justify-center text-red-400">Name should be 1 to 30 characters long</div>}
              </label> 
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-transparent border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className=" text-sm text-muted-foreground flex justify-between gap-1  ">Username
            {usernameExists && validUsername && <div className="flex justify-center text-red-400"> Username taken</div>}
            {!usernameExists && validUsername && <div className="flex justify-center text-green-400"> Username available</div>}
            {!usernameExists && !validUsername && debouncedUsername != "" && <div className="flex justify-center text-red-400"> Username should be 3-20 characters long without spaces</div>}

            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-transparent border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <div className=" text-sm text-muted-foreground flex justify-between gap-1 ">Email 
            {emailExists && <div className="flex justify-center text-red-400">Email already exists</div>}
            {!validEmail && debouncedEmail != "" && <div className="flex justify-center text-red-400">invalid Email</div>}
            </div>
            
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-transparent border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className=" text-sm text-muted-foreground flex justify-between gap-1">Password
            {  !validPass && !(form.password == "") && <div className="flex justify-center text-red-400">password should be minimum 8 characters long</div>}
            </label>
            <div className="flex "><input
              type={passwordType}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-transparent border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              required
            /> <div className="bg-transparent border rounded-lg outline-none px-4 py-2 hover:cursor-pointer" onClick={()=>{
                setPasswordType(e=>{
                  if(e=="text")return "password";
                  return "text";
                })
            }}>click</div></div>
            
          </div>
          
          <Button onClick={()=>{
            handleSubmit();
          }} className={`w-full mt-2 ${!enable?"hover:bg-red-400":"hover:bg-green-400"}`}>Sign Up</Button>
        </form>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
