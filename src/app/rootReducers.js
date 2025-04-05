import authReducer from "./auth/authSlice";
import userSlice from "./users/userSlice";
import leadSlice from "./leads/leadSlice";

const rootReducers = {
  auth: authReducer,
  user: userSlice,
  lead: leadSlice
};

export default rootReducers;
