import { RequestStatus } from "@/common/types";
import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error
  },
  reducers: (create) => {
    return {
      changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode;
      }),
      changeStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
        state.status = action.payload.status;
      }),
      setErrorAC: create.reducer<{ error: string | null  }>((state, action) => {
        state.error = action.payload.error; 
      })
    };
  }, 
});

export const { changeThemeModeAC, changeStatusAC, setErrorAC} = appSlice.actions;
export const { selectThemeMode, selectStatus, selectError } = appSlice.selectors;
export const appReducer = appSlice.reducer;

export type ThemeMode = "dark" | "light";
