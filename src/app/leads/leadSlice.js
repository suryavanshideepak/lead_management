import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../axios_interceptor/axiosInstance";


export const getAllLeads = createAsyncThunk(
    'user/getAllLeads',
    async ({ page = 1, limit = 10, search = '', desposition = '',fromDate, toDate, userId }, { rejectWithValue }) => {
      try {
        const response = await API.get('http://localhost:4500/leads/getAllLeads', {
            params: { 
              page, 
              limit, 
              search, 
              desposition, 
              fromDate, 
              toDate, 
              userId 
            },
        }); 
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );


export const getLeadById = createAsyncThunk(
  'user/getLeadById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`http://localhost:4500/leads/getLeadById/${id}`); 
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateLead = createAsyncThunk(
  'user/updateLead',
  async ({ id ,payload }, { rejectWithValue }) => {
    console.log(id,payload)
    try {
      const response = await API.put(`http://localhost:4500/leads/updateLead/${id}`,payload); 
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const assignLead = createAsyncThunk(
  'user/assignLead',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await API.post(`http://localhost:4500/leads/assignLead`,payload); 
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getAllAssignee = createAsyncThunk(
  'user/getAllAssignee',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`http://localhost:4500/leads/getAllAssignee`); 
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
    allLeads:[],
    allAssignee:[]
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
        builder.addCase(getAllAssignee.fulfilled,(state, action) => {
          state.allAssignee = action?.payload
      })
    }
})

export const selectLeadsState = (state) => state?.lead
export default leadSlice.reducer;