// Redux Toolkit Imports
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const sliceTheme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    isDark(state, { payload }: PayloadAction<boolean>) {
      state.isDark = payload;
    },
    isDarkToggle(state, { payload }: PayloadAction<boolean | void>) {
      if (typeof payload === "boolean") {
        state.isDark = payload;
      }

      state.isDark = !state.isDark;
    },
  },
});

function initialState() {
  return {
    isDark: false,
  };
}
