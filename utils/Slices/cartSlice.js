import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItems: (state, action) => {
      const id = action.payload.id;

      const existingItem = state.items.find((items) => items.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItems: (state, action) => {
      const id = action.payload.id;
      state.items = state.items.filter((items) => items.id !== id);
    },
    clearItems: (state) => {
      state.items.length = 0;
      state.total = 0;
    },
    increasePrice: (state, action) => {
      const item = state.items.find((items) => items.id === action.payload);

      if (item) item.quantity += 1;
    },
    decreasePrice: (state, action) => {
      const item = state.items.find((items) => items.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
        calculateTotal: (state) => {
        state.total = state.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        },
    },
});

export const {addItems,removeItems,clearItems,increasePrice,decreasePrice,calculateTotal} = cartSlice.actions
export default cartSlice.reducer