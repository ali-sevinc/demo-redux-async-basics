import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: null,
  isLoading: false,
  isCartShown: false,
  isOrderHistoryShown: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.notifications = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    toggleCart(state) {
      state.isCartShown = !state.isCartShown;
    },
    toggleOrder(state) {
      state.isOrderHistoryShown = !state.isOrderHistoryShown;
    },
    setLoading(state, action) {
      //true-false
      state.isLoading = action.payload;
    },
  },
});

export const { setNotification, toggleCart, toggleOrder, setLoading } =
  uiSlice.actions;
export default uiSlice.reducer;
