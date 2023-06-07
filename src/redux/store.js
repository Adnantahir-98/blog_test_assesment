import { configureStore } from "@reduxjs/toolkit";
import NewsReducer from "./newsSlice";


const store = configureStore({
    reducer: {
        news: NewsReducer
    },
})

export default store;
