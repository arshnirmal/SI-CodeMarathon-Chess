import { createSlice } from "@reduxjs/toolkit";

const countrySlice = createSlice({
  name: "country",
  initialState: {
    countries: [],
  },
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
  },
});

export const {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountriesFailure,
} = countrySlice.actions;

export const countriesData = (state) => state.country.countries;
export default countrySlice.reducer;
export const { setCountries } = countrySlice.actions;