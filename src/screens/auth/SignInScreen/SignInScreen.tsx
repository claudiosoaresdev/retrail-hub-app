import React from "react";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Text } from "../../../atomic/atoms/Text/Text";
import { Box } from "../../../atomic/atoms/Box/Box";
import { Button } from "../../../atomic/atoms/Button/Button";
import { FormTextInput } from "../../../atomic/molecules/FormTextInput/FormTextInput";
import { FormPasswordInput } from "../../../atomic/molecules/FormPasswordInput/FormPasswordInput";
import { Screen } from "../../../atomic/organisms/Screen/Screen";
import { useAuthSignIn } from "../../../domain/auth/useCases/useAuthSignIn";

export const signInSchema = z.object({
  email: z.string().email('email inválido'),
  password: z.string().min(1, 'senha obrigatória'),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export function SignInScreen() {
  const { signIn, isLoading } = useAuthSignIn({
    onError: message => console.log(message),
  });

  const { control, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const handleSignInPress = ({ email, password }: SignInSchema) => {
    signIn({ email, password });
  };

  return (
    <Screen hasKeyboardDismiss>
      <Box flex={1} paddingVertical="s8" g="s24">
        <Box flex={1} justifyContent="center" >
          <Box g="s24">
            <Box g="s8">
              <Text variant="headlineMedium" bold>
                Bem-vindo de volta
              </Text>
              <Text>Insira e-mail e senha da sua conta</Text>
            </Box>
            <Box gap="s20">
              <FormTextInput
                control={control}
                name="email"
                label="E-mail"
                placeholder="Digite seu e-mail"
              />
              <FormPasswordInput
                control={control}
                name="password"
                label="Senha"
                placeholder="Digite sua senha"
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <Button
            title="Entrar"
            loading={isLoading}
            onPress={handleSubmit(handleSignInPress)}
          />
        </Box>
      </Box>
    </Screen>
  )
}