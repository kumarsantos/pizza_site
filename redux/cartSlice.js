import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  total: 0,
  quantity: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state, action) => {
      //   state.products = state.filter(
      //     (product) => product._id !== action.payload._id
      //   );
      //   state.total -= action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, deleteProduct, reset } = cartSlice.actions;

export default cartSlice.reducer;
