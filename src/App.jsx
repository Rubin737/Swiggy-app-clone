import { Header } from "./Components/Header";
import { Hero } from "./Components/Hero";
import { About } from "./Components/NavElements/About";
import { Cart } from "./Components/NavElements/Cart";
import { ErrorComponent } from "./Components/NavElements/ErrorComponent";
import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Checkout } from "./Checkout";
import './index.css';
import { lazy, Suspense, useEffect, useState } from "react";
import { ShimmerUi } from "./Components/NavElements/ShimmerUi";
import { useOnlineStatus } from "../utils/hooks/useOnlineStatus";
import { OfflineView } from "./Components/NavElements/OfflineView";
import { SeeAllRecomendations } from "./SeeAllRecomendations";
import { userDetails } from "../utils/hooks/UseContext";
import { ReduxStore } from "../utils/Slices/appStore";
import { Provider } from "react-redux";

const Search = lazy(()=>import('./Components/NavElements/Search'));

export const App = ()=>{

  const online = useOnlineStatus();

  const [userName,setUserName] = useState();

  useEffect(()=>{
    const fetchUserDetails = async()=>{
      const promise = await fetch('https://api.github.com/users/Rubin737');
      const jsonData = await promise.json();
      setUserName(jsonData.name);
    }
    fetchUserDetails()
  },[])

      
      
  return !(online) ? <OfflineView/> : (
    <Provider store={ReduxStore}>
    <userDetails.Provider value={{name:userName,setUserName}}>
    <section className="pt-5 pl-20 pr-20 relative">
        <Header/>
        <Outlet/>
    </section>
    </userDetails.Provider>
    </Provider>
    
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
      },
      {
        path:'/seeAllRecomendations/:parameter',
        element:<SeeAllRecomendations/>
      },
    ],
    errorElement : <ErrorComponent/>

  }
])