import axios, { HttpStatusCode } from "axios";
import { AUTH_REFRESH } from "../constants/endpoints.constants";
import { RefreshedTokenProps } from "../types";
import { ERROR_CODES } from "../constants/error.code.contants";

export const isRefreshTokenExpired = async (refreshToken: string) => {
  return await refreshAccessToken(refreshToken);
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const refreshedToken: any = await axios({
      method: "post",
      url: AUTH_REFRESH,
      data: {
        token: refreshToken,
      },
    });
    const refreshedAccessToken: RefreshedTokenProps = {
      accessToken: refreshedToken?.data?.accessToken,
      isExpired: false,
      sessionExpiredMsg: "",
    };
    return refreshedAccessToken;
  } catch (error: any) {
    const { errorCode, message } = error.response.data;
    if (
      error?.status === HttpStatusCode.Unauthorized &&
      errorCode === ERROR_CODES.REFRESH_EXPIRED
    ) {
      const unRefreshedAccessToken: RefreshedTokenProps = {
        accessToken: "",
        isExpired: true,
        sessionExpiredMsg: message,
      };
      return unRefreshedAccessToken;
    }
  }
};
