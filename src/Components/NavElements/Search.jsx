import foodItems from "../../../utils/ResItems";
import star from '../../assets/foodCard/rating_star.png'
import search from '../../assets/search.png';
import { catagory } from "../../../utils/catagory";
import { useState } from "react";
import emptyPlate from '../../assets/foodCard/empty_plate.png'

export const Search = ()=>{

     const [menuItems,setMenuItems] = useState(foodItems);
     const [inputText,setInputText] = useState('');
     const [notFound,setNotFound] = useState('hidden')

     const searchItems = ()=>{
         const searchResult = foodItems.filter(items=>(items.name.toLowerCase()).includes(inputText.toLowerCase()))
          setMenuItems(searchResult);
          if(searchResult.length === 0){
            setNotFound('flex')
          }
          else{
            setNotFound('hidden')
          }
            
         
     }

    return(
        <section>
            <div className='flex gap-1 items-center mt-20 justify-center'>
                <input className="bg-red-200 text-black placeholder:text-black placeholder:text-lg w-[50%] pl-5 py-5 rounded-full" type="text" placeholder="Search items" 
                    onKeyDown={event=>{
                        if(event.key === 'Enter'){
                            searchItems();
                        }
                    }}
                      onChange={event=>setInputText(event.target.value)}
                />
                <img className="cursor-pointer" src={search} alt="search-img" 
                    onClick={searchItems}
                />
            </div>
            <div className="grid grid-flow-col gap-y-5 mt-10 ">
            {
                catagory.map(cat=>
                                    
                 <div key={cat.name} className="flex py-5 flex-col gap-y-2 hover:bg-yellow-50 rounded-xl cursor-pointer  items-center">
                    <div className=""><img width={50} height={50}  src={cat.img} alt="" /></div>
                    <p className="text-lg text-green-950">{cat.name}</p>
                </div>
                )
            }
           </div>

            <div className="flex gap-3 ">

                <p className="cursor-pointer"
                    onClick={()=>{setMenuItems(foodItems)}}

                >All</p>  
                <p className="text-red-400 cursor-pointer"
                    onClick={()=>{
                       const topRatedRes = foodItems.filter(items=>items.ratings>4.4);
                       setMenuItems(topRatedRes)
                       
                    }}          
                >Top Rated</p>
            </div>

            <div className="grid grid-cols-4 gap-x-3 gap-y-5 mt-10">
            
            {
                

                menuItems.map(items=>
                    
                    <div key={items.id} className='bg-orange-100 w-[275px] px-4 py-5  rounded-xl'>
                <div className="">
                    <div className="mb-3">
                        <img className=" w-full  h-[150px] rounded-3xl object-cover" src="https://i.pinimg.com/736x/71/f8/dd/71f8dd52a02a233c46f1ab4d88d22f7a.jpg" alt="" />
                        
                    </div>
                     <div className="flex flex-col">
                        <p className="font-bold text-xl">{items.name}</p>
                      <div >
                        <div className="flex gap-2  items-center justify-between">
                            <p className="font-bold">&#8377;{items.price} <small className="text-slate-600">{items.discountPrice}</small></p>
                          <div className="flex gap-1">
                            <img className="object-contain" src={star} alt="" />
                            <p className="text-lg">{items.ratings} <small className="text-slate-600">{items.ratingsCount}+</small></p>
                          </div>
                            
                        </div>
                        <button className="bg-orange-500 text-white text-xl py-2 px-5 mt-3 font-bold rounded-lg">Order Now</button>
                      </div>
                    </div>
                </div>
            </div>
                )
            }
            </div>
            
            <div className={`${notFound} flex-col gap-5 items-center mb-10`}>
                <img src={emptyPlate} className="w-[200px]" alt="" />
                <p className="text-4xl font-bold text-red-500">Currently Not Available</p>
            </div>
        </section>
    )
}
