import { useParams } from "react-router-dom";
import { MENU_API } from "../menu";
import { useEffect, useState } from "react";


export const useFetchData = () => {

    const[menuDetails,setMenuDetails] = useState(null);
    const {parameter} = useParams();
    const [Recom,setRecom] = useState();
    const [original,setOriginal] = useState()
    

    useEffect(()=>{
        
       const fetchData = async () => {
       const promise = await fetch(MENU_API + parameter);
       try {
         if (!promise.ok) {
           throw new Error("Fetching is failed");
         }
         const JsonData = await promise.json();
         setMenuDetails(JsonData);
         const totalRecom = JsonData.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards
         setRecom(totalRecom);
         setOriginal(totalRecom)

       } catch (error) {
         console.log(error.message);
       }
    }
    fetchData()
},[])

return {menuDetails,Recom,setRecom,original};
     
}



    