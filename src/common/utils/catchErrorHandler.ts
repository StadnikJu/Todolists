import { changeStatusAC, setErrorAC } from "@/app/app-slice";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import * as z from "zod"; 

export const catchErrorHandler = (error: unknown, dispatch: Dispatch) => {

    let errorMesage;

    switch(true) {
        case axios.isAxiosError(error):
            errorMesage = error.response?.data?.message || error.message;
            break;
        case error instanceof z.ZodError:
            errorMesage = "ZodError look in console";
            console.table (error.issues); 
            break;
        case error instanceof Error:
            errorMesage = `NAtive error: ${error.message}`
            break;
        default:
            errorMesage = JSON.stringify(error);
    }

    dispatch(setErrorAC({ error: errorMesage})); // network - fetch error
    dispatch(changeStatusAC({ status: "failed" })); 
}
