import { useParams } from "react-router-dom";
import { useFetchData } from "../utils/hooks/useFetchData";
import { ShimmerUi } from "./Components/NavElements/ShimmerUi";
import { useState } from "react";
import { ShowRelated } from "./ShowRelated";


export const SeeAllRecomendations = () =>{
    const{parameter} = useParams();
    const{related,setRelated} = useFetchData(parameter);
    const[dropdown,setDropdown] = useState({0:true})
    if(related===undefined) return <ShimmerUi/>

    const filtered = related.filter((items)=>items.card.card['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory')
    
    const changeVisibility = (index)=>{
        setDropdown(dropdown=>{
            return{
                
                [index]:!dropdown[index]
            }
        })
    } 

    return (
        <section>
            {
                filtered.map((items,index)=>{
                  return(
                    <section key={items.card.card.title}>
                    <div className="flex justify-between items-center px-2 py-2 border-b border-b-red-500  my-6  cursor-pointer">
                        <h1 className="text-lg font-bold text-black">{items.card.card.title}</h1>
                        <img className={`w-[25px]`} style={{ transform: dropdown[index] ? "rotate(180deg)" : "rotate(0deg)" }} src="https://cdn-icons-png.flaticon.com/128/2382/2382019.png" alt=""  
                            onClick={()=>{
                                changeVisibility(index);
                            }}
                        />
                    </div>
                    {
                        items.card.card.itemCards.map((eachItems) => {
           
                         return dropdown[index] && <ShowRelated key={eachItems.card.info.name} items={eachItems}/>
                   })
    }
</section>

                  )
                })
            }
        </section>
    )
} 