import { AxiosError } from 'axios';

export type ValidationError<T> = {
  [P in keyof T]?: string;
};

export type NormalError = string[];
export type ServerErrorResponse<T> = {
  validationError: ValidationError<T>;
  messages: NormalError;
  errorCodes: NormalError;
};
export type ResponseError<T = unknown> = AxiosError<ServerErrorResponse<T>>;
