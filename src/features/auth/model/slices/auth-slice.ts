import { catchErrorHandler, createAppSlice } from "@/common/utils";
import { LoginInputs } from "../loginTypes";
import { authApi } from "../../api/authApi";
import { changeStatusAC } from "@/app/app-slice";
import { ResultCode } from "@/common/enum/enums";
import { clearTasksAndTodolists } from "@/common/actions/common.actions";

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userEmail: null as string | null,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectUserEmail: (state) => state.userEmail,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }));
          const res = await authApi.login(data);

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAC({ status: "succeeded" }));

            const token = res.data.data.token;
            localStorage.setItem("token", token);

            dispatch(authmeTC());

            return { isLoggedIn: true };
          } else {
            catchErrorHandler(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error) {
          catchErrorHandler(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_arg, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }));
          const res = await authApi.logout();

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAC({ status: "succeeded" }));

            localStorage.removeItem("token");

            dispatch(clearTasksAndTodolists({tasks: {}, todolists: []}));

            return { isLoggedIn: false, userEmail: "" };
          } else {
            catchErrorHandler(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error) {
          catchErrorHandler(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
          state.userEmail = null;
        },
      },
    ),
    authmeTC: create.asyncThunk(
      async (_arg, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }));
          const res = await authApi.authme();

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAC({ status: "succeeded" }));

            return { isLoggedIn: true, userEmail: res.data.data.email };
          } else {
            catchErrorHandler(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error) {
          catchErrorHandler(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
          state.userEmail = action.payload.userEmail;
        },
      },
    ),
  }),
});

export const { selectIsLoggedIn, selectUserEmail } = authSlice.selectors;
export const { loginTC, logoutTC, authmeTC } = authSlice.actions;
export const authReducer = authSlice.reducer;
