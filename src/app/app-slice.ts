import { RequestStatus } from "@/common/types";
import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => {
    return {
      changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode;
      }),
      changeStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
        state.status = action.payload.status;
      }),
      setErrorAC: create.reducer<{ error: string | null }>((state, action) => {
        state.error = action.payload.error;
      }),
      setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      }),
    };
  },
});

export const { changeThemeModeAC, changeStatusAC, setErrorAC, setIsLoggedInAC } = appSlice.actions;
export const { selectThemeMode, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors;
export const appReducer = appSlice.reducer;

export type ThemeMode = "dark" | "light";
