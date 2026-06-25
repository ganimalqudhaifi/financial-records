import { Record } from "@/features/records/records.types";
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

interface RecordsState {
  records: Record[];
}

const initialState: RecordsState = {
  records: [],
};

const recordsSlice = createSlice({
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
      const index = state.records.findIndex(
        (record) => (record.id === action.payload.id),
      );
      if (index !== -1) {
        state.records[index] = action.payload;
      }
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

export default recordsSlice.reducer;
