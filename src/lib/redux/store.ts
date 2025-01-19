import { combineReducers, configureStore } from "@reduxjs/toolkit";
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

const rootReducer = combineReducers({
  user: userReducer,
  accounts: accountsReducer,
  records: recordsReducer,
  demo: demoReducer,
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
