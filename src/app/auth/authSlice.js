import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const loginAction = createAsyncThunk(
    'user/login',
    async(payload, { rejectWithValue }) => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/login`,payload)
            return response.data
        }catch(err){
            return rejectWithValue(err.response?.data || err.message);
        }
        
    }
)

const initialState = {
    user: null,
    token: '',
    isLoading: false,
    error: null
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
                user: null,
                isLoading: false,
                error: null
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAction.fulfilled,(state, action) => {
                state.isLoading = false;
                state.token = action.payload?.accessToken;
                state.user = action.payload?.userInfo;
                state.error = null;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error?.message;
            });
    }
})

export const { setToken, setUser, logoutAction } = authSlice.actions;
export const selectAuthState = (state) => state.auth
export default authSlice.reducer;