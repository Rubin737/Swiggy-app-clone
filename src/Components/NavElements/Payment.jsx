import { useSelector } from "react-redux"
import { moneyConvert } from "../../../utils/moneyConvert";

export const Payment = ()=>{

    const menuDetails = useSelector((store)=>store.cart.items);
    const totalPrice = useSelector((store)=>store.cart.total);
    

    const deliveryFee = 20;
    const gst = 50;
    const convert = moneyConvert(totalPrice+deliveryFee+gst);
    console.log(convert)
       

    return(
        <section className="flex flex-col gap-y-5 w-[500px] justify-center border-2 px-5 py-4">
            <h1 className="text-2xl font-bold text-red-400">Bill Details</h1>
            <div className="flex-container">
                <p>items total</p>
                <p className="font-bold text-lg">{menuDetails.length}</p>
            </div>
            <div className="flex-container">
                <p>Delivery Fee</p>
                <p className="font-bold text-lg">₹{deliveryFee}</p>
            </div>
            <hr />
            <div className="flex-container">
                <p>GST and Restaurant Charge</p>
                <p className="font-bold text-lg">₹{gst}</p>
            </div>
            <hr className="" />
            <div className="flex-container">
                <p>To Pay</p>
                <p className="font- bold text-lg">₹{convert}</p>
            </div>
        </section>
    )
}