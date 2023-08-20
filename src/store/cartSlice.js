import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalAmount: 0,
  isChanged: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.cart = action.payload.cart;
      state.totalAmount = action.payload.totalAmount;
    },
    addItem(state, action) {
      const existedItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      let updatedCart = [];
      if (existedItem) {
        updatedCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                amount: item.amount + 1,
                totalPrice: item.totalPrice + item.price,
              }
            : item,
        );
      } else {
        updatedCart = [...state.cart, action.payload];
      }

      state.cart = updatedCart;
      state.totalAmount = state.totalAmount + action.payload.price;
      state.isChanged = true;
    },
    removeItem(state, action) {
      const existedItem = state.cart.find((item) => item.id === action.payload);
      let updatedCart = [];
      if (existedItem.amount === 1) {
        updatedCart = state.cart.filter((item) => item.id !== action.payload);
      } else {
        updatedCart = state.cart.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                amount: item.amount - 1,
                totalPrice: item.totalPrice - item.price,
              }
            : item,
        );
      }

      state.cart = updatedCart;
      state.isChanged = true;
      state.totalAmount = state.totalAmount - existedItem.price;
    },
    clearCart(state) {
      state.cart = [];
      state.totalAmount = 0;
      state.isChanged = false;
    },
  },
});

export const { removeItem, addItem, clearCart, replaceCart } =
  cartSlice.actions;
export default cartSlice.reducer;
