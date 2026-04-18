import { changeStatusAC, setErrorAC } from "@/app/app-slice";
import { Dispatch } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

export const catchErrorHAndler = (error: unknown, dispatch: Dispatch) => {

    if(isAxiosError(error)) {
        dispatch(setErrorAC({ error: error.response?.data?.message || error.message })); // network - fetch error
    } else if(error instanceof Error) {
        dispatch(setErrorAC({ error: error.message }));
    } else {
        dispatch(setErrorAC({ error: "Somethink went wrong" }));
    }

    dispatch(changeStatusAC({ status: "failed" })); 
}