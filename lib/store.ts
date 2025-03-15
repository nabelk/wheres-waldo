import gameReducer from "./features/game/gameSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage, // Saves to localStorage
};

const persistedGameReducer = persistReducer(persistConfig, gameReducer);

const store = configureStore({
  reducer: {
    game: persistedGameReducer,
  },
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
