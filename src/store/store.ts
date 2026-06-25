import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../features/account/account.slice";
import demoReducer from "../features/demo/demo.slice";
import recordsReducer from "../features/records/records.slice";
import userReducer from "../features/user/user.slice";

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

function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
