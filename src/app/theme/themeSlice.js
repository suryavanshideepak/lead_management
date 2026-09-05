import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  fontFamily: 'Inter', // 'Inter' | 'Public Sans'
  fontSize: 'medium',  // 'small' | 'medium' | 'large'
  primaryColor: 'emerald', // 'emerald' | 'blue' | 'purple' | 'orange' | 'rose'
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
    setFontFamily: (state, action) => {
      if (['Inter', 'Public Sans'].includes(action.payload)) {
        state.fontFamily = action.payload;
      }
    },
    setFontSize: (state, action) => {
      if (['small', 'medium', 'large'].includes(action.payload)) {
        state.fontSize = action.payload;
      }
    },
    setPrimaryColor: (state, action) => {
      if (['emerald', 'blue', 'purple', 'orange', 'rose'].includes(action.payload)) {
        state.primaryColor = action.payload;
      }
    },
    resetUiPreferences: (state) => {
      state.fontFamily = 'Inter';
      state.fontSize = 'medium';
      state.primaryColor = 'emerald';
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  setFontFamily,
  setFontSize,
  setPrimaryColor,
  resetUiPreferences,
} = themeSlice.actions;

export const selectDarkMode = (state) => Boolean(state.darkmode?.isDarkMode);
export const selectFontFamily = (state) => state.darkmode?.fontFamily || 'Inter';
export const selectFontSize = (state) => state.darkmode?.fontSize || 'medium';
export const selectPrimaryColor = (state) => state.darkmode?.primaryColor || 'emerald';
export const selectUiPreferences = (state) => ({
  isDarkMode: Boolean(state.darkmode?.isDarkMode),
  fontFamily: state.darkmode?.fontFamily || 'Inter',
  fontSize: state.darkmode?.fontSize || 'medium',
  primaryColor: state.darkmode?.primaryColor || 'emerald',
});

export default themeSlice.reducer;
