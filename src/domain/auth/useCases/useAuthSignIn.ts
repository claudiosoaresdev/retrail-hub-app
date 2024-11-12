
import { useMutation } from '@tanstack/react-query';

import { useAuthCredentials } from '../../../services/authCredentials/useAuthCredentials';
import { MutationOptions } from '../../../infra/infraTypes';
import { authService } from '../authService';
import { AuthCredentials } from '../authCredentialsTypes';

interface Variables {
  email: string;
  password: string;
}

export function useAuthSignIn(options?: MutationOptions<AuthCredentials>) {
  const { saveCredentials } = useAuthCredentials();
  const mutation = useMutation<AuthCredentials, Error, Variables>({
    mutationFn: ({ email, password }) => authService.signIn(email, password),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: authCredentials => {
      if (options?.onSuccess) {
        options.onSuccess(authCredentials);
      }

      saveCredentials(authCredentials);
    },
  });

  return {
    signIn: (variables: Variables) => mutation.mutate(variables),
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}
