import { instance } from "@/common/instance";
import { LoginInputs } from "../model/loginTypes";
import { BaseResponse } from "@/common/types";

export const authApi = {
  login: (payload: LoginInputs) => {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("auth/login", payload);
  },
  logout: () => {
    return instance.delete<BaseResponse>("auth/login");
  },
  authme: () => {
    return instance.get<BaseResponse<{ id: number; email: string; login: string}>>("/auth/me");
  },
};
