import resImg from '../assets/restaurant.png';
import day from '../assets/sun.png';
import night from '../assets/night.png';
import search from '../assets/search.png';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { userDetails } from '../../utils/hooks/UseContext';
import { useSelector } from 'react-redux';
import cart from '../assets/cart_header.png'


export const Header = ()=>{
    const {name,setUserName} = useContext(userDetails);
    const[input,setInput] = useState()
    const changeUser = ()=>{
      setInput(input?false:true)
    }
    const closeContainer = ()=>{
        setInput(false)
    }

    const cartItems = useSelector((store)=>store.cart.items);
    console.log(cartItems)
    
    
    return (
   <section>
        <header className=' bg-orange-300  fixed top-0 left-20  right-20 py-5 px-2 rounded-md z-50'>
            <nav className="flex justify-between items-center gap-5 ">
                <div className='flex flex-row items-center'>
                    <img src={resImg} alt="" className='header-img' />
                    <h1 className='text-lg font-bold font-mono cursor-pointer hover:underline'
                        onClick={()=>changeUser()}
                    >Hi,{name}</h1>
                    
                </div>
                <ul className='flex justify-between items-center gap-10 '>
                    <li><Link className='text-lg font-pop' to={'/'}>Home</Link></li> 
                    <li><Link className='text-lg font-pop' to={'/aboutus'}>About Us</Link></li>
                    <li><Link className='text-lg font-pop' to={'/'} >Reviews</Link></li>
                    {/* <li><Link className='text-lg font-pop' to={'/cart'}>Cart-({cartItems.length} items)</Link></li> */}
                    
                </ul>
                <div className='flex items-center gap-3'>
                    <Link to={'/cart'}>
                      <div className='relative'>
                        <img src={cart} alt="cart" className='w-[50px]' />
                        <p className='absolute text-lg font-bold text-slate-800 -top-4 left-[50%]'>{cartItems.length}</p>
                       </div>
                     </Link> 
                    <Link to={'/search'}><img src={search} alt="" className='header-img'/></Link>
                    <img src={day} alt="" className='header-img'/>

                </div>
            </nav>
        </header>
        {
               input &&
               
               <div className='border w-[300px] px-5 py-10 flex justify-between mt-[100px] rounded-lg'>
                <input type="text" value={name} className='border w-[50%] px-2 ' 
                onChange={(event)=>setUserName(event.target.value)
                }
                onKeyDown={(event)=>event.key === 'Enter' && closeContainer()}
                />
                <button className={`text-white ${name?'bg-red-500' : 'bg-slate-400'} rounded-md  px-5 py-2`}
                onClick={()=>closeContainer()}
                >submit</button>
               </div>
            }
        
    </section>
    ) 
}
