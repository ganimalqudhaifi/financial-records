import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "./features/accounts/accountsSlice";
import demoReducer from "./features/demo/demoSlice";
import recordsReducer from "./features/records/recordsSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    accounts: accountsReducer,
    records: recordsReducer,
    demo: demoReducer,
  },
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
