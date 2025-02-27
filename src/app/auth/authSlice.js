import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const loginAction = createAsyncThunk(
    'user/login',
    async(payload, { rejectWithValue }) => {
        try{
            const response = await axios.post('http://localhost:4500/user/login',payload)
            return response.data
        }catch(err){
            return rejectWithValue(err.response?.data || err.message);
        }
        
    }
)

const initialState = {
    user: null,
    token: ''
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser: (state,action) => {
            return{
                ...state,
                user: action.payload
            }
        },
        setToken: (state, action) => {
            return{
                ...state,
                token: action.payload
            }
        },
        logoutAction: (state,action) => {
            return {
                ...state, 
                token : '',
                user: null
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled,(state, action) => {
            state.token = action.payload?.accessToken
            state.user = action.payload?.userInfo
        })
    }
})

export const { setToken, setUser, logoutAction } = authSlice.actions;
export const selectAuthState = (state) => state.auth
export default authSlice.reducer;