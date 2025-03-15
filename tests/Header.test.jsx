import { describe,expect,it } from "vitest";
import { Header } from "../src/Components/Header";
import { fireEvent, render,screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Routes,Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ReduxStore } from "../utils/Slices/appStore";
import {Cart} from '../src/Components/NavElements/Cart'

describe('Test Header Component',()=>{
    it('should render the Header component',()=>{
        render(
          <Provider store={ReduxStore}>
            <BrowserRouter>
              <Header />
            </BrowserRouter>
          </Provider>
        );
    })
    
    it('should have search img ',()=>{
      render(
        <Provider store={ReduxStore}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      );
      const home = screen.getByRole('img',{name:'search'});
      expect(home).toBeInTheDocument();
  })
  
  it('should cart quantity should be 0 when the first time ',()=>{
    render(
      <Provider store={ReduxStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const home = screen.getByText('0')
    expect(home).toBeInTheDocument();
})


it('Should going to cart page when i click cart image',()=>{
   render(
   <Provider store={ReduxStore}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Header/>}/>
          <Route path="/cart"element={<Cart/>}/>
        </Routes>
      </MemoryRouter>
    </Provider>)

    const cartImg = screen.getByAltText('cartImg')
    fireEvent.click(cartImg);
    
      const cartIsEmtyMessage = screen.getByText('Cart is Empty, Please add Items to the Cart');
      
      expect(cartIsEmtyMessage).toBeInTheDocument()
    

  })

  it('Should show the edit boox when i click the user',()=>{
    render(
    <Provider store={ReduxStore}>
       <MemoryRouter initialEntries={['/']}>
         <Routes>
           <Route path="/" element={<Header/>}/>
           <Route path="/cart"element={<Cart/>}/>
         </Routes>
       </MemoryRouter>
     </Provider>)
 
     const cartImg = screen.getByText(/Hi/)
     fireEvent.click(cartImg);
     

     const button = screen.getByText('submit');
     expect(button).toBeInTheDocument()
       
   
 
   })
 
    
})