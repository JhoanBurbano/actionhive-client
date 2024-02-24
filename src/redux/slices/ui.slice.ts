import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  fullTemplate: boolean;
  loader: boolean;
  overflow: boolean;
  isWhiteBackground: boolean;
  isMobile: boolean;
}

const initialState: UIState = {
  fullTemplate: false,
  loader: false,
  overflow: false,
  isWhiteBackground: false,
  isMobile: false,
};

export const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setFullTemplate: (state, action: PayloadAction<boolean>) => {
      state.fullTemplate = action.payload;
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    setOverflow: (state, action: PayloadAction<boolean>) => {
      state.overflow = action.payload;
    },
    setWhiteBackground: (state, action: PayloadAction<boolean>) => {
      state.isWhiteBackground = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFullTemplate, setLoader, setOverflow, setWhiteBackground, setIsMobile } =
  UiSlice.actions;

export default UiSlice.reducer;
