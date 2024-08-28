import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "players",
  initialState: {
    players: [],
  },
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
  },
});

export const { setPlayers } = playerSlice.actions;
export const playersData = (state) => state.players.players;
export default playerSlice.reducer;
