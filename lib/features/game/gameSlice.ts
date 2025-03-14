import { createSlice } from "@reduxjs/toolkit";

export interface GameState {
  timer: number;
}

const initialState: GameState = {
  timer: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    increment: (state) => {
      state.timer += 1;
    },
    reset: (state) => {
      state.timer = 0;
    },
  },
});

export const { increment, reset } = gameSlice.actions;

export default gameSlice.reducer;
