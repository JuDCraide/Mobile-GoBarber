import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {},
}

interface InputValueRef {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, containerStyle={}, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null);
  const { fieldName, defaultValue = '', error, registerField } = useField(name);
  const inputValueRef = useRef<InputValueRef>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(!!defaultValue);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputElementRef.current?.value);

  }, []);


  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    }
  }))

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      }
    });
  }, [fieldName, registerField]);


  return (
    <Container style={containerStyle} isErrored={!!error} isFocused={isFocused}>
      <Icon name={icon} size={20} color={isFilled || isFocused ? "#ff9000" : "#666360"} />
      <TextInput
        ref={inputElementRef}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={value => inputValueRef.current.value = value}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
