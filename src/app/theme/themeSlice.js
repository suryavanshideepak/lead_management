import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
};

export const themeSlice = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = Boolean(action.payload);
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;
export const selectDarkMode = (state) => Boolean(state.darkmode?.isDarkMode);
export default themeSlice.reducer;
