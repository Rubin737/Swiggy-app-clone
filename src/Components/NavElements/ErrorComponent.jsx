import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import dino from '../../assets/dino.gif';
export const ErrorComponent = ()=>{
    const {data} = useRouteError()
    return(
        <div className="Page-container mt-24 flex flex-col items-center">
            <h1 className="text-3xl font-bold -mt-10 text-slate-400 test-heading">{data}</h1>
            <img width={500} src={dino}  alt="dino-img" />
            <Link to={'/'}><h1 className="text-lg font-bold -mt-10 text-blue-800 underline">Go to Home</h1></Link>
        </div>
    )
}
