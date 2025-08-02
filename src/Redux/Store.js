import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const Store = configureStore({
    reducer:{
        todos: todoReducer
    }
})

export default Store;