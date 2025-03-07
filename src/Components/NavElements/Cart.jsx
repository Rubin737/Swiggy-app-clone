import { useDispatch, useSelector } from "react-redux";
import add from'../../assets/checkout/add.png';
import minus from '../../assets/checkout/minus.png'
import { moneyConvert } from "../../../utils/moneyConvert";
import close from '../../assets/foodCard/close.png';
import { clearItems, removeItems } from "../../../utils/Slices/cartSlice";
import { EmptyCart } from "./EmptyCart";

export const Cart = ()=>{

    const menuDetails = useSelector((store)=>store.cart.items);
    console.log(menuDetails.length)
    const dispatch = useDispatch();
    
    const handleRemoveBtn = (eachItems)=>{
      dispatch(removeItems(eachItems))
    }
    const handleClearBtn = ()=>{
        dispatch(clearItems())
    }
    
    if(menuDetails.length===0) return <EmptyCart/>

    
    
    return (
        <section>
            <div className="flex justify-end mt-5">
            <button className="bg-red-400 px-5 py-2 rounded-md text-white items-center font-bold"
                onClick={()=>handleClearBtn()}
            >Clear cart</button>
            </div>
            {menuDetails.map((eachItems,index) => {
                const imgUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${eachItems.imageId}`;
                return (

                    <div 
                        key={index}
                        className="flex border w-[70%] px-3 shadow-lg shadow-slate-500 gap-x-10 mt-10 py-3 "
                    >
                        
                        <div className="flex rounded-md flex-col items-center justify-between bg-slate-100 p-5">
                            <img src={add} alt="addSymbol" className="w-[30px]" />
                            <p>1</p>
                            <img className="w-[30px]" src={minus} alt="subSymbol" />
                        </div>
    
                        
                        <div className="p-5 bg-slate-100 rounded-md">
                            <img
                                className="w-[100px] h-[100px]  object-cover rounded-md"
                                src={imgUrl}
                                alt="symbol"
                            />
                        </div>
    
                        
                        <div className="flex flex-col w-[500px] bg-orange-100 rounded-md py-2  px-5 gap-y-3">
                            <h1 className="text-2xl font-bold">{eachItems.name}</h1>
                            <p className="text-xl font-bold text-red-400">₹{moneyConvert(eachItems.price)}</p>
                            <p>{eachItems.category}</p>
                        </div>
                        <div >
                            <img src={close} alt="close" className="cursor-pointer"
                            onClick={()=>{handleRemoveBtn(eachItems)}}
                            />
                        </div>
                    </div>
                );
            })}

        </section>
    );
}    
