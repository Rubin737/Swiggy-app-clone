import { Header } from "./Components/Header";
import { Hero } from "./Components/Hero";
import { About } from "./Components/NavElements/About";
import { Cart } from "./Components/NavElements/Cart";
import { ErrorComponent } from "./Components/NavElements/ErrorComponent";
import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Checkout } from "./Checkout";
import './index.css';
import { lazy, Suspense } from "react";
import { ShimmerUi } from "./Components/NavElements/ShimmerUi";
import { useOnlineStatus } from "../utils/hooks/useOnlineStatus";
import { OfflineView } from "./Components/NavElements/OfflineView";

const Search = lazy(()=>import('./Components/NavElements/Search'));


export const App = ()=>{

  const online = useOnlineStatus();
  console.log(online)

      
      
  return !(online) ? <OfflineView/> : (
    
    <section className="pt-5 pl-20 pr-20">
      <Header/>
      <Outlet/>
    </section>
    
  )
}

export const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Hero/>
      },
      {
        path:'/aboutus',
        element:<About name='Rubin'/>
      },
      {
        path:'/cart',
        element:<Cart/>
      },
      {
        path:'/search',
        element:<Suspense fallback={<ShimmerUi/>}><Search/></Suspense>
      },
      {
        path:'/checkout/:parameter',
        element:<Checkout/>
      }
    ],
    errorElement : <ErrorComponent/>

  }
])