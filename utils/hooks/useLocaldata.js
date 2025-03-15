import { useState } from "react";
import foodItems from "../ResItems";

export const useLocalData = ()=>{
    
    const [menuItems, setMenuItems] = useState(foodItems);
   

    return {menuItems,setMenuItems};

}