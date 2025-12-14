declare type ErrroResponse = {
  message: string;
  code: number;
};
declare type SuccessResponse<T> = {
  message: string;
} & T;

declare type ApiResponse<T> = ErrroResponse | SuccessResponse<T>;
