import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [] ,shippingAddress:{},paymentMethod:"Paypal"};
  


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((item) => item._id === existingItem._id ? newItem : item);
        
     
      } else {
        state.cartItems = [...state.cartItems,newItem];
    
      }

      return updateCart(state)
    
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);

      return updateCart(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state)
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state)
    },
   clearCartitems: (state,action)=>{
    state.cartItems=[];
    return updateCart(state);
   },
  },
});
export const { addToCart,removeFromCart,saveShippingAddress,savePaymentMethod ,clearCartitems} = cartSlice.actions;

export default cartSlice.reducer;
