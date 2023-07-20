import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersService} from "../../services/users.service";

const initialState={
    user:[]
}

const getUser = createAsyncThunk(
    'userSlice/getUser',
    async (_,{rejectWithValue})=> {
        try {
            const {data} = await usersService.getAll()
            return data
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const userSlice = createSlice({
    name:'userSlice',
    initialState,
    extraReducers:{
        [getUser.fulfilled]:(state,action)=> {
            state.user = action.payload;
        }
    }
})

const {reducer:userReducer} = userSlice;

const userActions ={
    getUser
}

export {userReducer,userActions}