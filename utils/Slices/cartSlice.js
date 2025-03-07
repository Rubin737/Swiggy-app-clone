import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[]
    },
    reducers:{
        addItems:(state,action)=>{
          
            const id = action.payload.id;
            
            const existingItem = state.items.find(items=>items.id === id);

            !existingItem && state.items.push(action.payload)
                       
        },
        removeItems:(state,action)=>{
            
            state.items.pop(action.payload)
        },
        clearItems:(state)=>{
            state.items.length = 0
        }
    }
})

export const {addItems,removeItems,clearItems} = cartSlice.actions
export default cartSlice.reducer