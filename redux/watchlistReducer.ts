import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coins } from '../interfaces'

const initialState = [] as Coins[];

const watchlistSlice = createSlice({
  name: "watchlists",
  initialState,
  reducers: {
    addWatchlist: {
      reducer: (state, action: PayloadAction<Coins>) => {
        state.push(action.payload);
      },
      prepare: (data: Coins) => ({
        payload: {
          icon_url: data.icon_url,
          max_supply: data.max_supply,
          name: data.name,
          name_full: data.name_full,
          symbol: data.symbol
        } as Coins,
      }),
    },
    removeWatchlist(state, action: PayloadAction<string>) {
      const index = state.findIndex((item) => item.name === action.payload);
      state.splice(index, 1);
    }
  },
});

export const {
  addWatchlist,
  removeWatchlist
} = watchlistSlice.actions;
export default watchlistSlice.reducer;
