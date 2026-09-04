import authReducer from "./auth/authSlice";
import userSlice from "./users/userSlice";
import leadSlice from "./leads/leadSlice";
import darkmodeReducer from "./theme/themeSlice";

const rootReducers = {
  auth: authReducer,
  user: userSlice,
  lead: leadSlice,
  darkmode: darkmodeReducer,
};

export default rootReducers;
