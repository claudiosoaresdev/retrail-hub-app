export interface User {
  id: string;
  displayName: string;
  email: string;
}

export interface UserAPI {
  id: string;
  displayName: string;
  email: string;
}

export interface AuthCredentials {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthCredentialsAPI {
  user: UserAPI;
  accessToken: string;
  refreshToken: string;
}