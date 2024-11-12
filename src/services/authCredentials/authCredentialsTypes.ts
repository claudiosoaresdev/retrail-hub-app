import { AuthCredentials } from "../../domain/auth/authCredentialsTypes";

export interface AuthCredentialsProps {
  authCredentials: AuthCredentials | null;
  isLoading: boolean;
  saveCredentials: (authCredentials: AuthCredentials) => Promise<void>;
  removeCredentials: () => Promise<void>;
}