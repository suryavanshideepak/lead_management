import { createSlice } from "@reduxjs/toolkit";

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
})

export const { handleForgot } = userSlice.actions;
export const selectAuthState = (state) => state.user
export default userSlice.reducer;