import { observeRecords } from "@/lib/firebase/database";
import type { RootState } from "@/lib/redux/store";
import { Record } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RecordsState {
  records: Record[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: RecordsState = {
  records: [],
  status: "idle",
};

export const fetchRecords = createAsyncThunk(
  "records/fetchRecords",
  async () => {
    const records = await observeRecords();
    return records;
  },
);

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<Record[]>) => {
      state.records = action.payload;
    },
    addRecord: (state, action: PayloadAction<Record>) => {
      state.records.push(action.payload);
    },
    updateRecord: (state, action: PayloadAction<Record>) => {
      const recordsIndex = state.records.findIndex(
        (record) => (record.id = action.payload.id),
      );
      const updatedRecords = state.records.fill(
        action.payload,
        recordsIndex,
        recordsIndex + 1,
      );
      state.records = updatedRecords;
    },
    deleteRecord: (state, action: PayloadAction<Record["id"]>) => {
      const filteredRecords = state.records.filter(
        (record) => record.id !== action.payload,
      );
      state.records = filteredRecords;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records = action.payload;
      });
  },
});

export const { setRecords, addRecord, updateRecord, deleteRecord } =
  recordsSlice.actions;

export const selectRecords = (state: RootState) => state.records;

export default recordsSlice.reducer;