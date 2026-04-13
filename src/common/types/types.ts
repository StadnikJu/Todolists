export type FieldsErrors = {
  error: string;
  field: string;
};

export type BaseResponse<T = {}> = {
  data: T;
  messages: string[];
  fieldsErrors: FieldsErrors[];
  resultCode: number;
};

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
