import { Header } from "./Components/Header";
import { Hero } from "./Components/Hero";
import { About } from "./Components/NavElements/About";
import { Cart } from "./Components/NavElements/Cart";
import { Search } from "./Components/NavElements/Search";
import { ErrorComponent } from "./Components/NavElements/ErrorComponent";
import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Checkout } from "./Checkout";
import './index.css'; 

export const App = ()=>{
  return (

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
        element:<About/>
      },
      {
        path:'/cart',
        element:<Cart/>
      },
      {
        path:'/search',
        element:<Search/>
      },
      {
        path:'/checkout/:parameter',
        element:<Checkout/>
      }
    ],
    errorElement : <ErrorComponent/>

  }
])