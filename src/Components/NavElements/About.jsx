import { contactDetails } from "../../../utils/hooks/contactDetails"
export const About = ()=>{
    return(
        <section>
            
            <div className="flex justify-center items-center flex-col  mt-10">
            <h1 className="text-4xl font-bold mb-5 text-orange-500">About us</h1>
            <p className="text-center mt-3 text-lg">At Foody, we believe that great food should be just a tap away. Our mission is to connect you with your favorite restaurants and local eateries, delivering fresh and delicious meals right to your doorsteps.</p>
            </div> 
            <h1 className="text-4xl text-orange-500 font-bold text-center my-10">Why Choose Us</h1>
            <div className="grid grid-cols-3  gap-x-10">
              
                {
                    contactDetails.map(items=>
                        <div key={items.h1} className="bg-slate-300 rounded-2xl flex flex-col items-center gap-y-5 py-5 ">
                        <img width={80} src={items.img} alt="" />
                         <h1 className="text-xl font-bold">{items.h1}</h1>
                         <p className="text-center">{items.p}</p>
                        </div>
                    )
                }
                
            </div>

        </section>
    )
}