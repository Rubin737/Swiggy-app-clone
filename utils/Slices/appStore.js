import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../Slices/cartSlice'
export const ReduxStore = configureStore({
    reducer:{
        cart:cartReducer
    }
})