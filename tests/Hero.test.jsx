import { describe, it,expect } from "vitest";
import { Hero } from "../src/Components/Hero";
import { fireEvent, render,screen } from "@testing-library/react";
import { MemoryRouter,Routes,Route } from "react-router-dom";
import { foodItems as menu } from "../utils/menu";
import Checkout from '../src/Checkout';

describe('Test Cases for Hero component',()=>{
  
    it('should render the Hero component',()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Hero/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                </Routes>
            </MemoryRouter>
        )
    })

    it('should going to next item when click the right arrow',async()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Hero/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                </Routes>
            </MemoryRouter>        
        )
    
        const rightArrowBtn = screen.getByAltText('Right-Ar');

        for(const item of menu.slice(1)){
            fireEvent.click(rightArrowBtn);
            expect(await screen.findByText(item.description)).toBeInTheDocument()
        }
        
        
        
    })

    it('should going to previous item when click the left arrow',async()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Hero/>}/>
                    <Route path="/checkout/:id" element={<Checkout/>}/>
                </Routes>
            </MemoryRouter>        
        )
    
        const leftArrowBtn = screen.getByAltText('left-Ar');
        fireEvent.click(leftArrowBtn);
        
        
    })

    
})