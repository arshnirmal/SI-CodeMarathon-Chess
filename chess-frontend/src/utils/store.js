import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./countrySlice";
import playerReducer from "./playerSlice";

const store = configureStore({
  reducer: {
    country: countryReducer,
    players: playerReducer,
  },
});

export default store;
