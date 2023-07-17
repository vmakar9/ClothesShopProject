import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {clothesReducer} from "./slices/ClothesSlice";

const rootReducer = combineReducers({
    clothes:clothesReducer
})

const setupStore=() => configureStore({
    reducer:rootReducer
})

export {setupStore}