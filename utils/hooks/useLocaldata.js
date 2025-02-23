import { useEffect, useState } from "react";
import { foodItems } from "../menu";
export const useLocalData = ()=>{
    
    const [menuItems, setMenuItems] = useState(null);
    useEffect(()=>{
           const fetchData = ()=>{
              setMenuItems(foodItems)
           }
           fetchData();
    },[])

    return {menuItems,setMenuItems};

}