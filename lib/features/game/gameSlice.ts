import { createSlice } from "@reduxjs/toolkit";

export interface GameState {
  timer: number;
  clickPosition: { x: number; y: number };
  isCharacterFound: { name: string; found: boolean }[];
}

const initialState: GameState = {
  timer: 0,
  clickPosition: { x: 0, y: 0 },
  isCharacterFound: [
    { name: "Waldo", found: false },
    { name: "Wizard", found: false },
    { name: "Odlaw", found: false },
  ],
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
    setClickPosition: (state, action) => {
      state.clickPosition = action.payload;
    },
    setIsCharacterFound: (state, action) => {
      state.isCharacterFound = action.payload;
    },
  },
});

export const { increment, reset, setClickPosition, setIsCharacterFound } =
  gameSlice.actions;

export default gameSlice.reducer;
