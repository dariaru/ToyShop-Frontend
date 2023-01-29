import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart/reducer';
import userReducer from './user/reducer';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
    },
});
