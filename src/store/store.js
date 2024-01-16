import { configureStore } from "@reduxjs/toolkit";
import character from '../slices/characterSlice';

const store = configureStore({
    reducer: {character},
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;