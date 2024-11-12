import { AxiosRequestConfig } from "axios";
import { api } from "../../services/api/apiConfig";
import { AuthCredentialsAPI } from "./authCredentialsTypes";

const AUTH_PATH = 'auth';
const AUTH_SIGNIN_PATH = `${AUTH_PATH}/signin`;
const REFRESH_TOKEN_PATH = `${AUTH_PATH}/refresh-token`;

async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentialsAPI> {
  const response = await api.post<AuthCredentialsAPI>(AUTH_SIGNIN_PATH, {
    email,
    password,
  });

  return response.data;
}

async function refreshToken(token: string): Promise<AuthCredentialsAPI> {
  const response = await api.post<AuthCredentialsAPI>(REFRESH_TOKEN_PATH, {
    refreshToken: token,
  });

  return response.data;
}

function isRefreshTokenRequest(request: AxiosRequestConfig): boolean {
  const url = request.url;

  return url === REFRESH_TOKEN_PATH;
}

export const authApi = {
  signIn,
  refreshToken,
  isRefreshTokenRequest,
}