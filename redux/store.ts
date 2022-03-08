import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./watchlistReducer";

export const store = configureStore({
  reducer: watchlistReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
