import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button"; // your custom Button component
import logo from "../../assets/logo.png"; // adjust path if needed
import { tokenContext , detailContext} from "../components/context";
import { server } from "../../exports";

export default function Login() {
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);
  const [jwt, setJwt] = useContext(tokenContext);
  const [detail, setDetail] = useContext(detailContext);
  const [form, setForm] = useState({
    emailOrUsername: "",
    password: "",
  });

  useEffect(()=>{
    if(form.emailOrUsername != "" || form.password != ""){
      setInvalid(false);
    }
  }, [form.emailOrUsername , form.password])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    async function login(){
      const r = await fetch(server + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: form.emailOrUsername,
          password : form.password
        })
      })
      if(!r.ok){
        setInvalid(true);
        setForm({
          emailOrUsername: "",
          password: "",
        });
        return;
      }
      else{
        const data = await r.json();
        const token = data.token;
        setJwt(token);
        localStorage.setItem("token", token);
        setDetail({
          name: data.name,
          username : data.username
        })
        navigate("/home");
      }
    }
    login();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="bg-background shadow-lg border p-8 rounded-2xl w-[90vw] sm:w-[400px]">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="scale-75" />
        </div>

        <h2 className="text-xl font-semibold text-center mb-6">Welcome Back</h2>
        {invalid && <div className="flex justify-center bg-red-400">Wrong Username/Email or Password</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground">Email or Username</label>
            <input
              type="text"
              name="emailOrUsername"
              value={form.emailOrUsername}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-transparent border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-transparent border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <Button type="submit" className="w-full mt-2">Log In</Button>
        </form>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
