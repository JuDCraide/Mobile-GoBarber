import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, BackButton, Title, UserAvatarButton, UserAvatar, } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {

  const { user } = useAuth();
  const { goBack } = useNavigation();

  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleProfile = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado!',
          'Você já pode fazer seu logon no GoBarber'
        );

        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente.'
        );
      }
    },
    [],
  );

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container >
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <Title>Meu Perfil</Title>


            <Form ref={formRef} onSubmit={handleProfile} style={{ width: '100%' }}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType='next'
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='email-address'
                returnKeyType='next'
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus()
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType='next'
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
                containerStyle={{ marginTop: 16 }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType='next'
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus()
                }}
              />
              <Input
                ref={confirmPasswordInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar Senha"
                secureTextEntry
                returnKeyType='send'
                textContentType="newPassword"
                onSubmitEditing={() => { formRef.current?.submitForm() }}
              />

              <Button onPress={() => {
                formRef.current?.submitForm()
              }}>Confirmar mudanças</Button>
            </Form>


          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

    </>
  );
};

export default Profile;
