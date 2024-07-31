import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface DemoState {
  isDemo: boolean;
  hasDemoLoadRecords: boolean;
}

const initialState: DemoState = {
  isDemo: false,
  hasDemoLoadRecords: false,
};

export const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    setHasDemoLoadRecords: (state, action: PayloadAction<boolean>) => {
      state.hasDemoLoadRecords = action.payload;
    },
    setIsDemo: (state, action: PayloadAction<boolean>) => {
      state.isDemo = action.payload;
    },
  },
});

export const { setHasDemoLoadRecords, setIsDemo } = demoSlice.actions;

export const selectDemo = (state: RootState) => state.demo;

export default demoSlice.reducer;
