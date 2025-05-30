import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../axios_interceptor/axiosInstance";


export const getAllLeads = createAsyncThunk(
    'user/getAllLeads',
    async ({ page = 1, limit = 10, search = '', desposition = '',fromDate, toDate, userId }, { rejectWithValue }) => {
      try {
        const response = await API.get(`${process.env.REACT_APP_API_BASE_URL}/leads/getAllLeads`, {
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

  export const getLeadsForEmployee = createAsyncThunk(
    'user/getLeadsForEmployee',
    async ({ page = 1, limit = 10, search = '', desposition = '',fromDate, toDate, userId }, { rejectWithValue }) => {
      try {
        const response = await API.get(`${process.env.REACT_APP_API_BASE_URL}/leads/getLeadsByEmployeeId/${userId}`, {
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
      const response = await API.get(`${process.env.REACT_APP_API_BASE_URL}/leads/getLeadById/${id}`); 
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateLead = createAsyncThunk(
  'user/updateLead',
  async ({ id ,payload }, { rejectWithValue }) => {
    try {
      const response = await API.put(`${process.env.REACT_APP_API_BASE_URL}/leads/updateLead/${id}`,payload); 
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
      const response = await API.post(`${process.env.REACT_APP_API_BASE_URL}/leads/assignLead`,payload); 
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
      const response = await API.get(`${process.env.REACT_APP_API_BASE_URL}/leads/getAllAssignee`); 
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
        const response = await API.post(`${process.env.REACT_APP_API_BASE_URL}/leads/createLead`, payload); 
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  export const importLeadsFromCsv = createAsyncThunk(
    'user/importLeadsFromCsv',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await API.post(`${process.env.REACT_APP_API_BASE_URL}/leads/importLeadsFromCsv`, payload); 
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  export const getAllTotalOrders = createAsyncThunk(
    'leads/getAllTotalOrders',
    async (_, { rejectWithValue }) => {
      try {
        const response = await API.get(`${process.env.REACT_APP_API_BASE_URL}/leads/getAllTotalOrders`); 
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  )
  

const initialState = {
    allLeads:[],
    allAssignee:[],
    allEmployeeLeads:[],
    totalVarifiedOrder:{}
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
      builder.addCase(getLeadsForEmployee.fulfilled,(state, action) => {
        state.allEmployeeLeads = action?.payload
    })
    builder.addCase(getAllTotalOrders.fulfilled,(state, action) => {
      state.totalVarifiedOrder = action?.payload
  })
    }
})

export const selectLeadsState = (state) => state?.lead
export default leadSlice.reducer;