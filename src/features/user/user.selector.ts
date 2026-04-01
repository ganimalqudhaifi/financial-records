import { RootState } from "@/store/store";

export const selectUser = (state: RootState) => state.user;
export const selectUserFetchStatus = (state: RootState) => state.user.status;