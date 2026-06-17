import { RequestStatus } from "@/common/types";
import { tasksApi } from "@/features/todolists/api/tasksApi";
import { todolistsApi } from "@/features/todolists/api/todolistsApi";
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";

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
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(), (state, action: any) => {
        if (
          todolistsApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) return;
        state.status = "loading";
      })
      .addMatcher(isFulfilled(), (state, _action) => {
        state.status = "succeeded";
      })
      .addMatcher(isRejected(), (state, _action) => {
        state.status = "failed";
      });
  },
});

export const { changeThemeModeAC, changeStatusAC, setErrorAC, setIsLoggedInAC } = appSlice.actions;
export const { selectThemeMode, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors;
export const appReducer = appSlice.reducer;

export type ThemeMode = "dark" | "light";
