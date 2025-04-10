import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../axios_interceptor/axiosInstance";

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

export const getAllUser = createAsyncThunk(
    'user/getAllUser',async(_,{rejectWithValue}) => {
        try {
            const response = await API.get('http://localhost:4500/user/getAllUser');
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const addUser = createAsyncThunk(
    'user/addUser',async(payload,{rejectWithValue}) => {
        try {
            const response = await API.post('http://localhost:4500/user/createUser',payload);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const removeUser = createAsyncThunk(
    'user/removeUser',async(id,{rejectWithValue}) => {
        console.log(id)
        try {
            const response = await API.delete(`http://localhost:4500/user/removeUser?userId=${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

const initialState = {
    isForgotPass:false,
    allUsers:[],
    isOpen:false
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
        sidebarCollapse: (state, action) => {
            return{
                ...state,
                isOpen:action.payload
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(forgotPassword.fulfilled,(state, action) => {
            state.isForgotPass = false
        })
        builder.addCase(getAllUser.fulfilled,(state, action) => {
            state.allUsers = action?.payload
        })
    }
})

export const { handleForgot, sidebarCollapse } = userSlice.actions;
export const selectUserState = (state) => state?.user
export default userSlice.reducer;