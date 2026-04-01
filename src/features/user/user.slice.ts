import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, fetchUserLogOut } from "./user.thunk";
import { DataUser } from "./user.types";

interface UserState {
  user: DataUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  user: null,
  status: "idle",
};

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
      })
      .addCase(fetchUserLogOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default userSlice.reducer;
