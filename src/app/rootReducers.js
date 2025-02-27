import authReducer from "./auth/authSlice";
import userSlice from "./users/userSlice";

const rootReducers = {
  auth: authReducer,
  user: userSlice,
};

export default rootReducers;
