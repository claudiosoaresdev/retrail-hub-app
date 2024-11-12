import { useContext } from "react";

import { AuthCredentialsProps } from "./authCredentialsTypes";
import { AuthCredentialsContext } from "./providers/AuthCredentialsProvider";

export function useAuthCredentials(): AuthCredentialsProps {
  const context = useContext(AuthCredentialsContext);
  if (!context) {
    throw new Error(
      'AuthCredentials should be used within a AuthCredentialsProvider',
    );
  }

  return context;
}