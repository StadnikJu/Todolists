import { baseApi } from "@/app/baseApi";
import { LoginInputs } from "../model/loginTypes";
import { BaseResponse } from "@/common/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
      query: (payload) => ({ method: "post", url: "/auth/login", body: payload})
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({ method: "delete", url: "/auth/login" })
    }),
    authme: builder.query<BaseResponse<{ id: number; email: string; login: string}>, void>({
      query: () => "/auth/me"
    }),
    security: builder.query<{ url: string }, void>({
      query: () => "/security/get-captcha-url"
    })
  })
})

export const { useLoginMutation, useLogoutMutation, useAuthmeQuery, useLazySecurityQuery } = authApi;
