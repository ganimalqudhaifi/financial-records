import { createAsyncThunk } from "@reduxjs/toolkit";

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