import { useFetchData } from '../utils/hooks/useFetchData'
import { ShimmerUi } from './Components/NavElements/ShimmerUi'
import {  useState } from 'react'
import emptyPlate from '../src/assets/foodCard/empty_plate.png'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { ShowRelated } from './ShowRelated'


export const Checkout = ()=>{
   const { parameter } = useParams();
   const [nonVegBtn,setNonVegBtn] = useState('bg-red-500');
   const {menuDetails,Recom,setRecom,original} = useFetchData(parameter);
   const [vegBtn,setVegBtn] = useState('bg-red-500')
   const [bestBtn,setBestBtn] = useState('bg-red-500');
   const [empty,setEmpty] = useState('notEmpty');
   
   
   
   if (!menuDetails) return <ShimmerUi/>;
    const {
        id,name,totalRatingsString,costForTwoMessage,cuisines,areaName
       ,sla:{slaString},city,cloudinaryImageId

   } = menuDetails.data.cards[2].card.card.info;
   
   
   const filterItems = (param) =>{
    const items = original.filter(recItems=>recItems.card.info.itemAttribute.vegClassifier === param);
    
    if(items.length === 0){
        setEmpty('empty')
        setRecom(items)        
    }else{
         setRecom(items);
         setEmpty('notEmpty')    
    }
    
   }

   const bestSeller = ()=>{
     const best = original.filter(recItems=>{
        return recItems.card.info.ratings.aggregatedRating.rating > 4.2
     })
     if(best.length === 0){
        setEmpty('empty')
        setRecom(best)        
    }else{
         setRecom(best);
         setEmpty('notEmpty')    
    }
   }

   const changeColorVeg = (clr,type)=>{
        if(clr==='bg-red-500'){
            setVegBtn('bg-slate-400');
            filterItems(type);
            setNonVegBtn('bg-red-500');
            setBestBtn('bg-red-500');
        }
        else{
            setVegBtn('bg-red-500')
            setRecom(original)
        }
   }
   
   const changeColorNonVeg = (clr,type)=>{
    if(clr==='bg-red-500'){
        setNonVegBtn('bg-slate-400');
        filterItems(type);
        setVegBtn('bg-red-500');
        setBestBtn('bg-red-500');
    }
    else{
        setNonVegBtn('bg-red-500')
        setRecom(original)
    }
  }

  const changeColorBest = (clr)=>{
    if(clr==='bg-red-500'){
        setBestBtn('bg-slate-400');
        setNonVegBtn('bg-red-500');
        setVegBtn('bg-red-500');
        bestSeller()
    }
    else{
        setBestBtn('bg-red-500')
        setRecom(original)
    }
  }

    const imgId = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${cloudinaryImageId}`;
    
    return(
        <section className=''>
            
        <div className=' flex flex-col  mt-20  pl-10 py-10 rounded-xl shadow-xl shadow-gray-900 w-[50%]'>
              <div className='flex gap-5 items-center'><h1 data-testid='name' className="text-4xl font-bold">{name}</h1><p className='text-lg text-blue-800'>{costForTwoMessage}</p></div>
              <div className='flex gap-5 items-center'><p className='text-lg'>{totalRatingsString}</p><p className='underline text-red-600 text-lg'>{cuisines.join(',')}</p></div>
                
              <p>Outlet : <strong>{areaName},{city}</strong></p>
              <p>Delivery time : <strong>{slaString}</strong></p>
              
        </div>
             <div className='my-10 flex gap-5 items-center'>
                    <h1 data-testId='recom' className=' text-3xl font-bold text-slate-500'>Recomentations</h1>
                    <Link to={'/seeAllRecomendations/'+ id}><h1 className=' font-bold text-red-800 cursor-pointer underline'>See all related items</h1></Link>
              </div>
              <div className=''>
                
                <div className='flex gap-5 mb-2'>
                    <button className={`font-bold text-xl ${vegBtn}  px-5 py-2 rounded-md text-white`}
                     onClick={()=>{

                        changeColorVeg(vegBtn,'VEG')

                    }}>Pure-Veg</button>
              
                    <button className={`font-bold text-xl  ${nonVegBtn}  px-5 py-2 rounded-md text-white`} 
                    onClick={()=>{
                        changeColorNonVeg(nonVegBtn,"NONVEG")
                    }}>Non-Veg</button>
               
                    <button onClick={()=>{
                        changeColorBest(bestBtn)
                    }} className={`font-bold text-xl ${bestBtn} px-5 py-2 rounded-md text-white`}>Best seller</button>
                </div>
                {
                    Recom.map(recItems=>{
                    
                        return <ShowRelated key={recItems.card.info.name} items={recItems}/>
                        
                    })
                }
               
              </div>

              <div className={` ${empty === 'notEmpty' ? 'hidden ' : ' flex flex-col gap-5 justify-center items-center mt-10 mb-10'} `}>
                 <img src={emptyPlate} className="w-[200px]" alt="" />
                 <p className="text-2xl font-bold text-red-500">Currently Not Available</p>
              </div>
               
        </section>
        

    )
}
