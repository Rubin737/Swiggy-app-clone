import add from '../src/assets/checkout/add.png';
import minus from "../src/assets/checkout/minus.png";
import { useFetchData } from '../utils/hooks/useFetchData';
import { ShimmerUi } from './Components/NavElements/ShimmerUi';
import { moneyConvert } from '../utils/moneyConvert';
import tag from '../src/assets/checkout/tag.png'
import star from '../src/assets/checkout/star.png'
import down from '../src/assets/checkout/down.png';
import up from '../src/assets/checkout/up.png';
import { useState } from 'react';

export const Checkout = ()=>{
    
   const {menuDetails,Recom,setRecom,original} = useFetchData();
   const [btnClr,setBtnClr] = useState('');

   if (!menuDetails) return <ShimmerUi/>;
   
    const {
        name,totalRatingsString,costForTwoMessage,cuisines,areaName
       ,sla:{slaString},city,cloudinaryImageId

   } = menuDetails.data.cards[2].card.card.info;

   const filterItems = (param) =>{
    const items = original.filter(recItems=>recItems.card.info.itemAttribute.vegClassifier === param);
    setRecom(items)
   }

   const bestSeller = ()=>{
     const best = original.filter(recItems=>{
        return recItems.card.info.ratings.aggregatedRating.rating > 4.2
     })
     setRecom(best)
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
                    <button className='text-lg bg-orange-500 px-10 rounded-sm py-1'>ADD</button>
                     <img width={100} height={100} className='object-cover' src={imgId} alt="" />
                    
                </div>
                
              <p>Outlet : <strong>{areaName},{city}</strong></p>
              <p>Delivery time : <strong>{slaString}</strong></p>
              
        </div>
              <h1 className='my-10 text-3xl font-bold text-blue-800'>Recomentations</h1>
              <div className=''>
                
                <div className='flex gap-5 mb-2'>
                    <button onClick={()=>{
                        filterItems('VEG');
                        setBtnClr('bg-slate-400')

                    }} className={`font-bold text-xl ${btnClr === 'bg-red-500' ? 'bg-slate-400' : 'bg-red-500'} px-5 py-2 rounded-md text-white`}>Pure-Veg</button>
                    <button onClick={()=>{
                        filterItems('NONVEG');
                        
                    }} className='font-bold text-xl  bg-red-500 px-5 py-2 rounded-md text-white'>Non-Veg</button>
                    <button onClick={()=>{
                        bestSeller()
                    }} className='font-bold text-xl  bg-red-500 px-5 py-2 rounded-md text-white'>Best seller</button>
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
                                <div className='flex gap-5'>
                                    <p className='text-xl font-bold'>{name}</p>
                                    <div className='flex ite ms-center gap-1'><img width={20} src={tag} alt="" />
                                    <p>{recItems.card.info.offerTags[1].title}({recItems.card.info.offerTags[1].subTitle})</p>
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
               
        </section>
        

    )
}
