import { useState,useEffect } from "react"

export const useOnlineStatus = ()=>{

    const[online,setOnline] = useState(navigator.onLine);
    const getOnline = ()=>setOnline(true)
    const getOffline = ()=>setOnline(false)

    useEffect(()=>{
         window.addEventListener("online", getOnline);
         window.addEventListener("offline", getOffline);
          return () => {
            window.removeEventListener("online", getOnline);
            window.removeEventListener("offline", getOffline);
          };
    },[])
 
   
    return online;
}