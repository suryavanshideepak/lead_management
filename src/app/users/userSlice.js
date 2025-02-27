import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:4500/user/forgotPassword', payload);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const initialState = {
    isForgotPass:false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        handleForgot: (state, action) => {
            return{
                ...state,
                isForgotPass:action.payload
            }
        },

    },
    extraReducers: (builder) => {
        builder.addCase(forgotPassword.fulfilled,(state, action) => {
            state.isForgotPass = false
        })
    }
})

export const { handleForgot } = userSlice.actions;
export const selectUserState = (state) => state.user
export default userSlice.reducer;