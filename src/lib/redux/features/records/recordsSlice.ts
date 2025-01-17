import type { RootState } from "@/lib/redux/store";
import { Record } from "@/types";
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

interface RecordsState {
  records: Record[];
}

const initialState: RecordsState = {
  records: [],
};

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<Record[]>) => {
      state.records = action.payload;
    },
    addRecord: (state, action: PayloadAction<Omit<Record, "id">>) => {
      const id = nanoid();
      state.records.push({ ...action.payload, id });
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
});

export const { setRecords, addRecord, updateRecord, deleteRecord } =
  recordsSlice.actions;

export const selectRecords = (state: RootState) => state.records;

export default recordsSlice.reducer;
