import { setAuthToken } from "../../services/api/tokenManager";
import { authAdapter } from "./authAdapter";
import { authApi } from "./authApi";
import { AuthCredentials } from "./authCredentialsTypes";

async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentials> {
  try {
    const authCredentialsApi = await authApi.signIn(email, password);

    return authAdapter.toAuthCredentials(authCredentialsApi);
  } catch (error) {
    throw new Error('email ou senha inválido');
  }
}

function updateToken(token: string) {
  setAuthToken(token);
}

function removeToken() {
  setAuthToken(null);
}

async function authenticateByRefreshToken(
  refreshToken: string,
): Promise<AuthCredentials> {
  const authCredentialsAPI = await authApi.refreshToken(refreshToken);

  return authAdapter.toAuthCredentials(authCredentialsAPI);
}

export const authService = {
  signIn,
  authenticateByRefreshToken,
  isRefreshTokenRequest: authApi.isRefreshTokenRequest,
  updateToken,
  removeToken,
}