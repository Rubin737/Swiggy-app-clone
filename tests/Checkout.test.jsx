import { fireEvent, render, waitFor } from "@testing-library/react"
import { act } from "react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { expect, it, vi } from "vitest"
import foodItems from "../utils/ResItems"
import Search from "../src/Components/NavElements/Search"
import { screen } from "@testing-library/react"

globalThis.fetch = vi.fn(()=>{
    return Promise.resolve({
        val:()=>{
            return Promise.resolve(foodItems)
        }
    })
})



it('should have Search component',async()=>{
    
    await act(async()=>{
        render(
            <MemoryRouter initialEntries={['/search']}>
                <Routes>
                    <Route path="/search" element={<Search/>}/>
                </Routes>
            </MemoryRouter>
        )
    })

   await waitFor(()=>{
     const btn = screen.getAllByTestId('order');
     fireEvent.click(btn[0]);

     expect(screen.getByTestId('name')).toBeInTheDocument()
   })
    
    
})

