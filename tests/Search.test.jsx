import { it,expect, vi } from "vitest";
import Search from "../src/Components/NavElements/Search";
import { MemoryRouter,Routes,Route } from "react-router-dom";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import foodItems from "../utils/ResItems";
import { act } from "react";
import {Checkout} from '../src/Checkout'

globalThis.fetch = vi.fn(()=>{
    return Promise.resolve({
        val:()=>{
            return Promise.resolve(foodItems)
        }
    })
})


// it('should render the Search page',()=>{
//     render(
//         <MemoryRouter initialEntries={['/search']}>
//             <Routes>
//                 <Route path="/search" element={<Search/>}/>
//             </Routes> 
//         </MemoryRouter>
//     )
// })

// it('should have searchBar',()=>{
//     render(
//         <MemoryRouter initialEntries={['/search']}>
//             <Routes>
//                 <Route path="/search" element={<Search/>}/>
//             </Routes>
//         </MemoryRouter>
//     )
//     const searchBar = screen.getByTestId(/SearchBar/i);
//     expect(searchBar).toBeInTheDocument()
// })


// it('should have filtered items',async()=>{
    
//     await act(async()=>{
//         render(
//             <MemoryRouter initialEntries={['/search']}>
//                 <Routes>
//                     <Route path="/search" element={<Search/>}/>
//                 </Routes>
//             </MemoryRouter>
//         )
//     })

//     //screen.debug()
    
//     const searchBar = screen.getByTestId(/SearchBar/i);
//     fireEvent.change(searchBar,{target:{value:'butter'}});
    
//     const searchBtn = screen.getByAltText('search-img');
//     fireEvent.click(searchBtn)

    
//    waitFor(()=>{
//         const cards = screen.getAllByTestId('cards');
//         expect(cards.length).toBe(1)
//     })

 
    
// })

// it('should filter the top rated restaurents',async()=>{
//     await act(async()=>{
//         render(
//             <MemoryRouter initialEntries={['/search']}>
//                 <Routes>
//                     <Route path="/search" element={<Search/>}/>
//                 </Routes>
//             </MemoryRouter>
//         )

//     })

    
//     const topRated = screen.getByTestId('topRated')
//     fireEvent.click(topRated)

//      waitFor(()=>{
//         const cards = screen.getAllByTestId('cards');
//         expect(cards.length).toBe(7)
    
//     })
       
  
// })


it("should navigate to checkout page when clicking order button", async () => {
    await act(async () => {
        render(
            <MemoryRouter initialEntries={["/search"]}>
                <Routes>
                    <Route path="/search" element={<Search />} />
                    <Route path="/checkout/:id" element={<Checkout />} />
                </Routes>
            </MemoryRouter>
        );
    });

    // Wait until menu items load
    await waitFor(() => {
        expect(screen.getAllByTestId("cards").length).toBeGreaterThan(0);
    });

    // Now try to find the Order button
    const btn = await screen.findByTestId("order");
    expect(btn).toBeInTheDocument();

    // Click the Order button
    fireEvent.click(btn);

    // Wait for navigation by checking Checkout page content
    await waitFor(() => {
        expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    });
});
