import { AuthCredentials, AuthCredentialsAPI } from "./authCredentialsTypes";

function toAuthCredentials(
  authCredentialsAPI: AuthCredentialsAPI,
): AuthCredentials {
  return {
    user: authCredentialsAPI.user,
    accessToken: authCredentialsAPI.accessToken,
    refreshToken: authCredentialsAPI.refreshToken,
  };
}

export const authAdapter = {
  toAuthCredentials,
};