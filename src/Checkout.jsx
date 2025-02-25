import add from '../src/assets/checkout/add.png'
import minus from "../src/assets/checkout/minus.png"
import { useFetchData } from '../utils/hooks/useFetchData'
import { ShimmerUi } from './Components/NavElements/ShimmerUi'
import { moneyConvert } from '../utils/moneyConvert'
import tag from '../src/assets/checkout/tag.png'
import star from '../src/assets/checkout/star.png'
import down from '../src/assets/checkout/down.png'
import up from '../src/assets/checkout/up.png'
import { useState } from 'react'
import emptyPlate from '../src/assets/foodCard/empty_plate.png'


export const Checkout = ()=>{
    
   const {menuDetails,Recom,setRecom,original} = useFetchData();
   const [vegBtn,setVegBtn] = useState('bg-red-500')
   const [nonVegBtn,setNonVegBtn] = useState('bg-red-500');
   const [bestBtn,setBestBtn] = useState('bg-red-500');
   const [empty,setEmpty] = useState('notEmpty');

   if (!menuDetails) return <ShimmerUi/>;
    const {
        name,totalRatingsString,costForTwoMessage,cuisines,areaName
       ,sla:{slaString},city,cloudinaryImageId

   } = menuDetails.data.cards[2].card.card.info;

   const filterItems = (param) =>{
    const items = original.filter(recItems=>recItems.card.info.itemAttribute.vegClassifier === param);
    
    if(items.length === 0){
        setEmpty('empty')
        setRecom(items)        
    }else{
         setRecom(items)    
    }
    
   }

   const bestSeller = ()=>{
     const best = original.filter(recItems=>{
        return recItems.card.info.ratings.aggregatedRating.rating > 4.2
     })
     setRecom(best)
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
              <div className='flex gap-5 items-center'><h1 className="text-4xl font-bold">{name}</h1><p className='text-lg text-blue-800'>{costForTwoMessage}</p></div>
              <div className='flex gap-5 items-center'><p className='text-lg'>{totalRatingsString}</p><p className='underline text-red-600 text-lg'>{cuisines.join(',')}</p></div>
              
               <div className='flex items-center gap-5'>
                    
                    <div className='flex items-center  gap-5 border-2 px-5 py-1 '>
                        <img width={20} src={add} alt="" />
                        <p className='text-xl'>1</p>
                        <img width={20} src={minus} alt="" />
                    </div>
                    <button className='text-lg bg-orange-500 px-10 rounded-md  py-1'>ADD</button>
                     <img width={100} height={100} className='object-cover' src={imgId} alt="" />
                    
                </div>
                
              <p>Outlet : <strong>{areaName},{city}</strong></p>
              <p>Delivery time : <strong>{slaString}</strong></p>
              
        </div>
              <h1 className='my-10 text-3xl font-bold text-blue-800'>Recomentations</h1>
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
                        
                        const{
                            imageId,description="Delicious, fresh, and crafted with the finest ingredients! Whether you're craving a hearty meal, a quick snack, or a sweet treat, our menu offers a variety of flavors to satisfy every craving.",
                            price,
                            itemAttribute:{vegClassifier},
                            name,
                            ratings:{aggregatedRating:{rating = "1",ratingCount = "0"}
                        }  
                              
                        }=recItems.card.info;


                        const imgUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`


                        return(
                            <div key={recItems.card.info.id} className='flex mt-5 gap-10 shadow-lg shadow-slate-300 pl-10 pt-2 rounded-md pb-5'>
                            <div className='flex flex-1  flex-col gap-y-2'>
                                <div className='flex gap-5 items-center'>
                                <img  src={vegClassifier === 'VEG' ? up : down} alt="" width={30}/>
                                 <p className='text-md font-bold text-red-800'>₹ {moneyConvert(price)}</p>
                                </div>
                                <div className='flex gap-5  items-center '>
                                    <p className='text-xl font-bold'>{name}</p>
                                    <div className='flex gap-2 object-cover items-center'>
                                        <img width={20} height={20} src={tag} alt="" />
                                        <p>60% OFF (use STEALDEAL)</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'><img src={star} alt="" /><p>{rating}({ratingCount})</p></div>
                                <p>{description}</p>
                            </div>
                            <div className=' w-[300px] flex items-center flex-col'>
                                <img className='w-[175px] h-[175px] object-cover rounded-lg' src={imgUrl} alt="" />
                                <button className='bg-white border shadow-md shadow-slate-300 text-green-300 px-10 py-2 text-xl font-bold rounded-md -mt-10'>Add</button>
                            </div>
                        </div>
                        
                        )
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
