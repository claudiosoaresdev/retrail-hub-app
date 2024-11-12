import React, { useState } from 'react';

import { Icon } from '../../atoms/Icon/Icon';
import { TextInput, TextInputProps } from '../../atoms/TextInput/TextInput';

export type PasswordInputProps = Omit<TextInputProps, 'RightComponent'>;

export function PasswordInput(props: PasswordInputProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  function toggleSecureTextEntry() {
    setIsSecureTextEntry(prev => !prev);
  }
  return (
    <TextInput
      secureTextEntry={isSecureTextEntry}
      {...props}
      RightComponent={
        <Icon
          name={isSecureTextEntry ? 'eye' : 'eye-off'}
          onPress={toggleSecureTextEntry}
          p="s2"
        />
      }
    />
  );
}
