import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {clothesReducer} from "./slices/ClothesSlice";
import {userReducer} from "./slices/UsersSlice";

const rootReducer = combineReducers({
    clothes:clothesReducer,
    user:userReducer
})

const setupStore=() => configureStore({
    reducer:rootReducer
})

export {setupStore}