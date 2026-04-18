import { changeStatusAC, setErrorAC } from "@/app/app-slice";
import { Dispatch } from "@reduxjs/toolkit";
import { BaseResponse } from "../types";

export const resultCodeHandler = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {

    const error = data.messages.length ? data.messages[0] : "Something went wrong";
    dispatch(setErrorAC({ error }));
    dispatch(changeStatusAC({ status: "failed" }));
}
