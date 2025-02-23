import rightArrow from '../assets/rightA.png';
import leftArrow from '../assets/leftA.png';
import { foodItems } from "../../utils/menu";
import { useState } from "react";
import { Link } from 'react-router-dom';

export const Hero = () => {
    const [currIntex, setCurIntex] = useState(0);
    const selectedItem = foodItems[currIntex];
    const [bgClr, setBgclr] = useState(0); 
    const [bodyClr, setBodyClr] = useState('bg-pink-100');

    console.log(currIntex);

    const prevItem = () => {
        if (currIntex > 0) {
            setCurIntex(currIntex - 1);
            updateBodyClr(currIntex - 1);
        }
    };

    const nextItem = () => {
        if (currIntex < foodItems.length - 1) {
            setCurIntex(currIntex + 1);
            updateBodyClr(currIntex + 1);
        }
    };

    const updateBodyClr = (index) => {
        const colors = ["bg-orange-100", "bg-yellow-100", "bg-orange-200", "bg-lime-100"];
        setBodyClr(colors[index]);
        setBgclr(index); 
    };

    return (
        <section className="pb-10">
            <section className={`flex my-5 py-10 px-5 justify-between items-center rounded-2xl ${bodyClr}`}>
                <div className="w-[50%] flex flex-col ml-10 gap-2">
                    <h1 className="font-pop text-6xl font-extrabold">Fastest <span className="hero-h">Delivery</span> and Easy<span className="hero-h"> Pickup</span></h1>
                    <h1 className="font-lora text-3xl">{selectedItem.name}</h1>
                    <h1 className="text-xl">{selectedItem.slogan}</h1>
                    <p className="text-sm">{selectedItem.description}</p>
                    <div className="flex gap-4 mt-2">
                        <Link to={'/checkout/'+selectedItem.id} ><button className="text-lg font-bold text-black bg-orange-400 px-5 py-2">Order now</button></Link>
                        <div>
                            <p className="font-bold text-xl">Price</p>
                            <p>₹{selectedItem.price}</p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-5">
                        <img src={leftArrow} onClick={() => prevItem()} alt="left-Ar" className="w-[40px] h-[40px] cursor-pointer" />
                        <img src={rightArrow} onClick={() => nextItem()} alt="Right-Ar" className="w-[40px] h-[40px] cursor-pointer" />
                    </div>
                </div>
                <div>
                    <img src={selectedItem.link} alt="" className="rounded-full w-[400px] h-[400px] object-cover" />
                </div>
            </section>

            <div>
                <h1 className="mb-4">Popular Menus</h1>
                <div className="flex justify-between gap-5">
                    {foodItems.map((items, index) => (
                        <div key={items.id}
                            className={`flex gap-5   p-3 rounded-lg cursor-pointer 
                                ${bgClr === index ? 'shadow-lg shadow-red-200' : 'bg-blue-200'}`}
                            onClick={() => {
                                setCurIntex(index);
                                setBgclr(index);  
                                updateBodyClr(index);
                            }}>
                            <div>
                                <h1 className='text-lg font-bold'>{items.name}</h1>
                                <p className={items.category === 'Veg' ? 'text-red-800' : 'text-green-800'}>{items.category}</p>
                                <p className='font-semibold'>₹{items.price}</p>
                            </div>
                            <img src={items.link} className="object-cover rounded-full w-[90px] h-[90px]" alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
