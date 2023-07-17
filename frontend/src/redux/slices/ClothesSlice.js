import {clothesService} from "../../services/clothes.service";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState={
    clothes:[]
}

const getAll = createAsyncThunk(
    'clothesSlice/getAll',
    async (_,{rejectWithValue})=>  {
        try {
            const {data} = await clothesService.getAll()
            return data
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const clothesSlice= createSlice({
    name:"clothesSlice",
    initialState,
    extraReducers:{
        [getAll.fulfilled]:(state,action)=> {
            state.clothes = action.payload
        }
    }
})

const {reducer:clothesReducer}=clothesSlice;

const clothesActions={
    getAll
}

export {clothesActions,clothesReducer}

