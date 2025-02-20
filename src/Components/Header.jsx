import resImg from '../assets/restaurant.png';
import day from '../assets/sun.png';
import night from '../assets/night.png';
import search from '../assets/search.png';
import { Link } from 'react-router-dom';

export const Header = ()=>{
   
    return (
        <section className='mt-2'>
            <nav className="flex justify-between items-center gap-5">
                <div className=''>
                    <img src={resImg} alt="" className='header-img' />
                </div>
                <ul className='flex justify-between gap-10 '>
                    <li><Link className='text-lg font-pop' to={'/'}>Home</Link></li> 
                    <li><Link className='text-lg font-pop' to={'/aboutus'}>About Us</Link></li>
                    <li><Link className='text-lg font-pop' to={'/cart'} >Reviews</Link></li>
                    <li><Link className='text-lg font-pop' to={'/cart'}>Cart</Link></li>
                </ul>
                <div className='flex gap-3'>
                    <Link to={'/search'}><img src={search} alt="" className='header-img'/></Link>
                    <img src={day} alt="" className='header-img'/>
                </div>
            </nav>
        </section>
    ) 
}
