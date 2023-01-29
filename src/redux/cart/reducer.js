import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        itemsInCart:[],
        itemsUsers: {
            isAuthenticated: null,
            username:'',
            pk:'',
        },
        toys: {
            pk: null,
            name: '',
            price: '',
        },
    },
    reducers: {
        refresh: (state, action) => {
            state.items = action.payload;
        },

        put: (state, action) => {
            state.items.push(action.payload);
        },

        remove: (state, action) => {
            state.items = state.items.filter(item => item.pk !== action.payload);
        },

        increaseAmount: (state, action) => {
            state.items.find(item => item.pk === action.payload).amount++;
        },

        decreaseAmount: (state, action) => {
            state.items.find(item => item.pk === action.payload).amount--;
        },
        Setusername:(state, action) =>{
            state.itemsUsers.username= action.payload
        },
        Setauther:(state, action) =>{
            state.itemsUsers.isAuthenticated= action.payload
        },
        Setpk:(state, action)=>{
            state.itemsUsers.pk=action.payload
        },
        SetTitle: (state, action) => {
            state.toys.name=action.payload
        },
        SetPrice: (state, action) => {
            state.toys.price=action.payload
        },
        SetDicription: (state, action) => {
            state.toys.dicription=action.payload
        },
        SetId: (state, action) => {
            state.toys.pk=action.payload
        }
    }
});

export const { SetDicription, SetId, SetTitle, SetPrice, refresh, increaseAmount, decreaseAmount, put, remove, Setauther, Setusername, Setpk } = cartSlice.actions;
export default cartSlice.reducer;