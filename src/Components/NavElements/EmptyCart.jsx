import cart from '../../assets/foodCard/cart.png'
import { Link } from "react-router-dom";
export const EmptyCart = ()=>{
    return(
        <div className={`flex justify-center flex-col gap-y-5 h-screen items-center`}>
        <Link to={'/search'}><img className={` w-[200px] `} src={cart} alt="" /></Link>
        <h1 className="text-3xl font-bold ">Cart is Empty, Please add Items to the Cart</h1>
        </div>
    )
}