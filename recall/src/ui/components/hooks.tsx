import { useEffect, useRef, useState } from "react"
import { server } from "../../exports"
const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoYWt0aTExIiwiaWF0IjoxNzQ0NjY1ODM0fQ.lZdJp8FsYTcFKQAhhp4xuifbPMpCnkyr2WVrlQ9NLwA"

import { contents } from "../../exports"

interface previewInterface{
    title:string,
    description:string,
    image:string,
    site:string,
}


function usePreview(url: string){
    const [data, setData] = useState<previewInterface|null>(null);
    const [loading ,setLoading] = useState(true);
    const [error, setError] = useState<Error|null>(null);
    
    useEffect(()=>{
        setLoading(true);
        console.log(url);
        const controller = new AbortController();
        async function fetchData(){
            try{
            const d = await fetch(`${server}/api/getPreview`, {
                method: "GET",
                headers: {
                    url: url
                },
                signal : controller.signal
            })
            console.log(d);
            if(!d.ok){
                setError(new Error("something went wrong"));
                setLoading(false);
            }
            else{
            const res = await d.json();
            setData(res.data);
            setLoading(false);
            setError(null);
            }
        }
        catch(e){
            setError(e as Error);
            setLoading(false);
        }
        }
        const t = setTimeout(()=>{
            fetchData();
        }, 500);
        return ()=>{
            clearTimeout(t);
            controller.abort();
        }
    }, [url])
    
    return {data, loading, error};
    
}



function useFetchData(jwt: string, rerender: boolean){
    const [data, setData] = useState<(contents)[]>([]);
    const [loading ,setLoading] = useState(true);
    const [error, setError] = useState<Error|null>(null);
    
    useEffect(()=>{
        setLoading(true);
        const controller = new AbortController();
        async function fetchData(){
            try{
            const d = await fetch(`${server}/api/fetchContent`, {
                method: "GET",
                headers: {
                    authorization : jwt
                },
                signal : controller.signal
            })
            console.log(d);
            if(!d.ok){
                setError(new Error("something went wrong"));
                setLoading(false);
            }
            else{
            const res = await d.json();
            setData(res.content);
            setLoading(false);
            setError(null);
            }
        }
        catch(e){
            setError(e as Error);
            setLoading(false);
        }
        }
        const t = setTimeout(()=>{
            fetchData();
        }, 100);
        return ()=>{
            clearTimeout(t);
            controller.abort();
        }
    }, [jwt , rerender])
    
    return {data, loading, error};

    }


  export  function useDebounce(text:string){
        const [value,setValue] = useState("");
        useEffect(()=>{
           const t =  setTimeout(()=>{
                setValue(text);
            }, 50);
            return ()=>{
                clearInterval(t);
            }
        })
        return value;
    }

export function usePrev(text:string){
    const ref = useRef("");
    useEffect(()=>{
        ref.current = text;
    }, [text]);
    return text;
}



export {usePreview, useFetchData}