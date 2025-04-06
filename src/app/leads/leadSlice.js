import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../axios_interceptor/axiosInstance";


export const getAllLeads = createAsyncThunk(
    'user/getAllLeads',
    async ({ page = 1, limit = 10, search = '', desposition = '' }, { rejectWithValue }) => {
      try {
        const response = await API.get('http://localhost:4500/leads/getAllLeads', {
            params: { page, limit, search, desposition },
        }); 
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  export const createOrder = createAsyncThunk(
    'user/createOrder',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await API.post('http://localhost:4500/leads/createLead', payload); 
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  export const importLeadsFromCsv = createAsyncThunk(
    'user/importLeadsFromCsv',
    async (payload, { rejectWithValue }) => {
      console.log(payload)
      try {
        const response = await API.post('http://localhost:4500/leads/importLeadsFromCsv', payload); 
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );
  

const initialState = {
    allLeads:[]
}

export const leadSlice = createSlice({
    name:'lead',
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(getAllLeads.fulfilled,(state, action) => {
            state.allLeads = action?.payload
        })
    }
})

export const selectLeadsState = (state) => state?.lead
export default leadSlice.reducer;