import { ForgotPasswordInput, LoginInput, LoginOutPut, LogoutInput } from "@custom-types/login";
import { ResponseFormat, SignUpInput } from "@custom-types/manager";
import request from "api";
import { CancelToken } from "axios";

export const signUp = (cancelToken: CancelToken, body: SignUpInput) => {
  return request.post<ResponseFormat<any>>("/user/signup", body, { cancelToken });
};

export const onLogin = (cancelToken: CancelToken, body: LoginInput) => {
  return request.post<LoginOutPut>("/user/login", body, { cancelToken });
};

export const getCurrentUser = () => {
  return request.get("/api/user/me");
};

export const refreshToken = (body: ForgotPasswordInput) => {
  return request.post("/user/refresh-token", body);
};

export const logout = (cancelToken: CancelToken, body: LogoutInput) => {
  return request.post("/user/logout", body, { cancelToken });
};
