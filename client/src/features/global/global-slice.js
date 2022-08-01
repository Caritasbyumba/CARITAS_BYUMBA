import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedLanguage: localStorage.getItem('i18nextLng'),
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    languageChanged(state, action) {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { languageChanged } = globalSlice.actions;
export default globalSlice.reducer;
