import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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

export default demoSlice.reducer;
