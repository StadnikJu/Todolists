export type FieldsErrors = {
  error: string;
  field: string;
}

export type BaseResponse<T = {}> = {
  data: T;
  messages: string[];
  fieldsErrors: FieldsErrors[];
  resultCode: number;
}