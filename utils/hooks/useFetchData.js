import { MENU_API } from "../menu";
import { useEffect, useState } from "react";

export const useFetchData = (parameter) => {

    const[menuDetails,setMenuDetails] = useState(null);
    const [Recom,setRecom] = useState();
    const [original,setOriginal] = useState()
    const[related,setRelated] = useState()    

    useEffect(()=>{
        
       const fetchData = async () => {
       const promise = await fetch(MENU_API + parameter);
       try {
         if (!promise.ok) {
           throw new Error("Fetching is failed");
         }
         const JsonData = await promise.json();
         setMenuDetails(JsonData);
         const totalRecom = JsonData.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards
         const relatedItems = JsonData.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards;
         setRelated(relatedItems)
         setRecom(totalRecom);
         setOriginal(totalRecom)


       } catch (error) {
         console.log(error.message);
       }
    }
    fetchData()
},[parameter])

return {menuDetails,Recom,setRecom,original,related,setRelated};
     
}



    