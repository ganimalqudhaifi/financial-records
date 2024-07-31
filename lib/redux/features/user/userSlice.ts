import { observeUser } from "@/lib/firebase/auth";
import { DataUser } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface UserState {
  user: DataUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  user: null,
  status: "idle",
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const user = await observeUser();
  return user;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectUser = (state: RootState) => state.user;

export const selectUserFetchStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
