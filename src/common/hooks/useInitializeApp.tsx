import { useAuthmeQuery } from "@/features/auth/api/authApi";
import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { ResultCode } from "../enum/enums";
import { setIsLoggedInAC } from "@/app/app-slice";

export const useInitializeApp = () => {
  const { data, isLoading } = useAuthmeQuery();
  const dispatch = useAppDispatch();

  const isInitialized = !isLoading;

  useEffect(() => {
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }));
    }
  }, [data, dispatch]);

  return isInitialized;
};
