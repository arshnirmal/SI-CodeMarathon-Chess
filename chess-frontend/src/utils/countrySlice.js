import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  loading: false,
  error: null,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    fetchCountriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCountriesSuccess(state, action) {
      state.loading = false;
      state.countries = action.payload;
    },
    fetchCountriesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountriesFailure,
} = countrySlice.actions;

export default countrySlice.reducer;
