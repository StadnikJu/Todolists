import { RequestStatus } from "@/common/types";
import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idel" as  RequestStatus,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
  },
  reducers: (create) => {
    return {
      changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode;
      }),
      changeStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
        state.status = action.payload.status;
      })
    };
  }, 
});

export const { changeThemeModeAC, changeStatusAC } = appSlice.actions;
export const { selectThemeMode } = appSlice.selectors;
export const appReducer = appSlice.reducer;

export type ThemeMode = "dark" | "light";
