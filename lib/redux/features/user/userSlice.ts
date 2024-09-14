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

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    const res = await fetch("/api/user", {
      method: "GET",
    });
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 401) {
      // Handle unauthorized response
      return rejectWithValue("Unauthorized: Token missing");
    } else {
      return rejectWithValue("Failed to fetch user data");
    }
  },
);

export const fetchUserLogOut = createAsyncThunk(
  "user/fetchUserLogOut",
  async () => {
    await fetch("/api/logout", {
      method: "GET",
    });
  },
);

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

export const selectUser = (state: RootState) => state.user;

export const selectUserFetchStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
