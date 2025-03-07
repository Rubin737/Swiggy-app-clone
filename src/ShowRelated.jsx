import { moneyConvert } from "../utils/moneyConvert";
import star from '../src/assets/checkout/star.png'
import down from '../src/assets/checkout/down.png'
import up from '../src/assets/checkout/up.png';
import tag from '../src/assets/checkout/tag.png'
import { useDispatch } from "react-redux";
import { addItems } from "../utils/Slices/cartSlice";

export const ShowRelated = (eachItems) => {
    
    const {
        imageId,
        description = "Delicious, fresh, and crafted with the finest ingredients! Whether you're craving a hearty meal, a quick snack, or a sweet treat, our menu offers a variety of flavors to satisfy every craving.",
        price,
        itemAttribute: { vegClassifier },
        name,
        ratings: {
            aggregatedRating: { rating = "1", ratingCount = "0" }
        }
    } = eachItems.items.card.info;

    const imgUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`;
    
    const dispatch = useDispatch();

    const handleAddBtn = (items)=>{
        dispatch(addItems(items));
    }
        

    return (
        
            <div
                key={eachItems.items.card.info.id}
                className="flex mt-5 gap-10 shadow-lg shadow-slate-300 pl-10 pt-2 rounded-md pb-5"
            >
                <div className="flex flex-1 flex-col gap-y-2">
                    <div className="flex gap-5 items-center">
                        <img
                            src={vegClassifier === 'VEG' ? up : down}
                            alt=""
                            width={30}
                        />
                        <p className="text-md font-bold text-red-800">
                            ₹ {moneyConvert(price)}
                        </p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <p className="text-xl font-bold">{name}</p>
                        <div className="flex gap-2 object-cover items-center">
                            <img width={20} height={20} src={tag} alt="" />
                            <p>60% OFF (use STEALDEAL)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={star} alt="" />
                        <p>{rating} ({ratingCount})</p>
                    </div>
                    <p>{description}</p>
                </div>
                <div className="w-[300px] flex items-center flex-col">
                    <img
                        className="w-[175px] h-[175px] object-cover rounded-lg"
                        src={imgUrl}
                        alt=""
                    />
                    <button
                        className="bg-white border shadow-md shadow-slate-300 text-green-300 px-10 py-2 text-xl font-bold rounded-md -mt-10"
                        onClick={()=>handleAddBtn(eachItems.items.card.info)}         
                    >
                        Add
                    </button>
                </div>
            </div>
        )
    
};
